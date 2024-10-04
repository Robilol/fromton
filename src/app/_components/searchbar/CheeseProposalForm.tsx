'use client'
import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../form/Input';
import Button from '../Button';
import SelectSearch from '../form/SelectSearch';
import { createClient } from '../../../../utils/client';
import { Tables } from '../../../../schema.gen';
import RatingInput from '../form/RatingInput';
import TextArea from '../form/TextArea';
import { toast } from 'react-hot-toast';

const cheeseSchema = z.object({
    name: z.string({ required_error: "Le nom du fromage est requis" }).min(1, { message: "Le nom du fromage est requis" }),
    milkType: z.number({ required_error: "Le type de lait est requis" }),
    doughType: z.number({ required_error: "Le type de pâte est requis" }),
    crustType: z.number({ required_error: "Le type de croûte est requis" }),
    country_id: z.number({ required_error: "Le pays est requis" }),
    rating: z.number({ required_error: "La note est requise" }),
    review: z.string({ required_error: "Le commentaire est requis" }),
    shopId: z.number({ required_error: "La fromagerie est requise" }),
});

type CheeseFormData = z.infer<typeof cheeseSchema>;

interface CheeseProposalFormProps {
    onSuccess: () => void;
}

const CheeseProposalForm: React.FC<CheeseProposalFormProps> = ({ onSuccess }) => {
    const supabase = createClient();
    const [milkTypes, setMilkTypes] = React.useState<Tables<'milk_types'>[]>([]);
    const [doughTypes, setDoughTypes] = React.useState<Tables<'dough_types'>[]>([]);
    const [crustTypes, setCrustTypes] = React.useState<Tables<'crust_types'>[]>([]);
    const [countries, setCountries] = React.useState<Tables<'countries'>[]>([]);
    const [cheeseShops, setCheeseShops] = React.useState<Tables<'cheese_shops'>[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const methods = useForm<CheeseFormData>({
        resolver: zodResolver(cheeseSchema),
    });

    React.useEffect(() => {
        const fetchOptions = async () => {
            const fetchType = async <T extends Tables<'milk_types' | 'dough_types' | 'crust_types' | 'countries' | 'cheese_shops'>>(
                table: 'milk_types' | 'dough_types' | 'crust_types' | 'countries' | 'cheese_shops',
                columns: string
            ): Promise<T[]> => {
                const { data, error } = await supabase
                    .from(table)
                    .select(columns)
                    .order('name')
                    .returns<T[]>();

                if (error) {
                    console.error(`Error fetching ${table}:`, error);
                    return [];
                }
                return data as T[];
            };

            const milkTypesData = await fetchType<Tables<'milk_types'>>('milk_types', 'name, id');
            const doughTypesData = await fetchType<Tables<'dough_types'>>('dough_types', 'name, id');
            const crustTypesData = await fetchType<Tables<'crust_types'>>('crust_types', 'name, id');
            const countriesData = await fetchType<Tables<'countries'>>('countries', 'name, id');
            const cheeseShopsData = await fetchType<Tables<'cheese_shops'>>('cheese_shops', 'name, id');
            setMilkTypes(milkTypesData);
            setDoughTypes(doughTypesData);
            setCrustTypes(crustTypesData);
            setCountries(countriesData);
            setCheeseShops(cheeseShopsData);
        };

        fetchOptions();
    }, []);

    const onSubmit: SubmitHandler<CheeseFormData> = async (data) => {
        console.log(data);

        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
            toast.error('Vous devez être connecté pour proposer un fromage')
            return
        }

        setIsLoading(true)
        const { error, data: cheeseProposal } = await supabase
            .from('cheese_proposals')
            .insert({
                proposed_by_id: user?.id,
                name: data.name,
                milk_type_id: data.milkType,
                dough_type_id: data.doughType,
                crust_type_id: data.crustType,
                country_id: data.country_id,
            }).select().single()

        if (!cheeseProposal || error) {
            toast.error('Une erreur est survenue')
            return
        }

        const { error: errorReview } = await supabase
            .from('temporary_reviews')
            .insert({
                cheese_proposal_id: cheeseProposal.id,
                profile_id: user?.id,
                rating: data.rating,
                review: data.review,
                cheese_shop_id: data.shopId,
            })

        if (errorReview) {
            toast.error('Une erreur est survenue')
            return
        }

        setIsLoading(false)

        if (!errorReview && !error) {
            toast.success('Fromage proposé !')
            onSuccess()
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="gap-2 flex flex-col">
                <div className="flex flex-row gap-2">
                    <div className="flex flex-col gap-2 w-1/2">
                        <span className="text-xl font-bold">Le fromage</span>
                        <Input
                            name="name"
                            label="Nom du fromage"
                            type="text"
                        />
                        <SelectSearch
                            name="milkType"
                            label="Type de lait"
                            data={milkTypes.map((milkType) => ({ id: milkType.id, label: milkType.name }))}
                        />
                        <SelectSearch
                            name="doughType"
                            label="Type de pâte"
                            data={doughTypes.map((doughType) => ({ id: doughType.id, label: doughType.name }))}
                        />
                        <SelectSearch
                            name="crustType"
                            label="Type de croûte"
                            data={crustTypes.map((crustType) => ({ id: crustType.id, label: crustType.name }))}
                        />
                        <SelectSearch
                            name="country_id"
                            label="Pays"
                            data={countries.map((country) => ({ id: country.id, label: country.name }))}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">

                        <span className="text-xl font-bold">Votre note</span>
                        <RatingInput name="rating" />
                        <TextArea
                            rows={5}
                            name="review"
                            label="Commentaire"
                            className="w-full"
                        />
                        <SelectSearch
                            label="Fromagerie"
                            name="shopId"
                            data={cheeseShops.map((cheeseShop) => ({
                                id: cheeseShop.id,
                                label: cheeseShop.name,
                            }))}
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    label="Proposer le fromage"
                    className="mt-4 w-fit ml-auto"
                />
            </form>
        </FormProvider>
    );
};

export default CheeseProposalForm;
