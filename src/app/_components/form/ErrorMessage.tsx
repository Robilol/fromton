import {type FC} from "react";
import {type FieldErrors, type FieldValues} from "react-hook-form";
import _ from "lodash";

interface ErrorMessageProps {
  errors: FieldErrors<FieldValues>;
  fieldName: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ errors, fieldName }) => {
  const error = _.get(errors, fieldName);

  if (!error) {
    return null;
  }

  return (
    <span className="font-ApfelGrotezk text-sm text-red-500 mt-1">
      {error?.message as string}
    </span>
  );
};

export default ErrorMessage;
