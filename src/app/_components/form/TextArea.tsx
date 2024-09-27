import {type FC} from "react";
import ErrorMessage from "@/app/_components/form/ErrorMessage";
import {useFormContext} from "react-hook-form";
import cx from "classnames";

interface TextAreaProps {
  name: string;
  label?: string;
  rows?: number;
  className?: string;
}
const TextArea: FC<TextAreaProps> = ({ label, name, rows, className }) => {
  const methods = useFormContext();
  const { formState, register } = methods;

  return (
    <div className="flex w-full flex-col items-start">
      {label && <label className="">{label}</label>}
      <textarea
        className={cx(
          "flex flex-row gap-4 rounded-lg border border-black/25 bg-white px-4 py-2 shadow-fromton-input",
          className,
        )}
        {...register(name)}
        rows={rows}
      />
      <ErrorMessage errors={formState.errors} fieldName={name} />
    </div>
  );
};

export default TextArea;
