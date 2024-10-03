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

const cheeseSchema = z.object({
    name: z.string().min(1, { message: "Le nom du fromage est requis" }),
    milkType: z.string().min(1, { message: "Le type de lait est requis" }),
    doughType: z.string().min(1, { message: "Le type de pâte est requis" }),
    crustType: z.string().min(1, { message: "Le type de croûte est requis" }),
    description: z.string().optional(),
});

type CheeseFormData = z.infer<typeof cheeseSchema>;

const CheeseProposalForm: React.FC = () => {
    const supabase = createClient();
    const [milkTypes, setMilkTypes] = React.useState<Tables<'milk_types'>[]>([]);
    const [doughTypes, setDoughTypes] = React.useState<Tables<'dough_types'>[]>([]);
    const [crustTypes, setCrustTypes] = React.useState<Tables<'crust_types'>[]>([]);

    const methods = useForm<CheeseFormData>({
        resolver: zodResolver(cheeseSchema),
    });

    React.useEffect(() => {
        const fetchOptions = async () => {
            const fetchType = async <T extends Tables<'milk_types' | 'dough_types' | 'crust_types'>>(
                table: 'milk_types' | 'dough_types' | 'crust_types',
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

            setMilkTypes(milkTypesData);
            setDoughTypes(doughTypesData);
            setCrustTypes(crustTypesData);
        };

        fetchOptions();
    }, []);

    console.log(milkTypes)
    console.log(doughTypes)
    console.log(crustTypes)

    const onSubmit: SubmitHandler<CheeseFormData> = (data) => {
        console.log(data);
        // Here you would typically send the data to your backend
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="gap-2 flex flex-col">
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

                <hr className="w-full border-2 border-black" />

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
