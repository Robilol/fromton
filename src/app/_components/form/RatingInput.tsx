import React, {type FC} from "react";
import Rating from "react-rating";
import {Controller, useFormContext} from "react-hook-form";
import ErrorMessage from "@/app/_components/form/ErrorMessage";
import {StarIcon} from "lucide-react";

interface RatingInputProps {
  name: string;
  label?: string;
}

const RatingInput: FC<RatingInputProps> = ({ name, label }) => {
  const methods = useFormContext();
  const { formState, register, control } = methods;

  return (
    <div className="flex w-full flex-col items-start">
      {label && <label className="">{label}</label>}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, name, value } }) => (
          <div className="flex items-center gap-2">
            {/*@ts-expect-error types*/}
            <Rating
              initialRating={value as number}
              onClick={onChange}
              emptySymbol={<StarIcon className="h-8 w-8 text-yellow" />}
              fullSymbol={<StarIcon className="h-8 w-8 text-yellow" />}
              fractions={2}
            />
            <span>({value}/5)</span>
          </div>
        )}
      />
      <ErrorMessage errors={formState.errors} fieldName={name} />
    </div>
  );
};

export default RatingInput;
