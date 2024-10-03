import {type FC, Fragment} from "react";
import {Combobox, Transition} from "@headlessui/react";
import {Controller, useFormContext} from "react-hook-form";
import ErrorMessage from "@/app/_components/form/ErrorMessage";
import {CheckIcon, ChevronsUpDownIcon} from "lucide-react";

type Option = { id: string | number; label: string };

interface SelectSearchProps {
  name: string;
  label?: string;
  data?: Option[];
}

const SelectSearch: FC<SelectSearchProps> = ({ name, label, data }) => {
  const methods = useFormContext();
  const { formState, register, control } = methods;

  return (
    <div className="flex w-full flex-col items-start">
      {label && <label className="">{label}</label>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, name, value } }) => (
          <Combobox
            value={data?.find((option) => option.id === value)}
            onChange={(value: Option) => onChange(value.id)}
          >
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden rounded-lg border-2 border-black shadow-fromton-input bg-white text-left sm:text-sm focus-within:border-primary">
                <Combobox.Input
                  className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  displayValue={(person: Option) => person.label}
                  // onChange={(event) => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronsUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                // afterLeave={() => setQuery("")}
              >
                <Combobox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-lg border-2 border-black bg-white py-1 text-base shadow-fromton-inputsm:text-sm">
                  {data?.length === 0 ? (
                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                      Nothing found.
                    </div>
                  ) : (
                    data?.map((person) => (
                      <Combobox.Option
                        key={person.id}
                        className={({ active }) =>
                          `relative select-none py-2 pl-10 pr-4 cursor-pointer ${
                            active ? "bg-primary text-white" : "text-gray-900"
                          }`
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {person.label}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? "text-white" : "text-teal-600"
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        )}
      />
      <ErrorMessage errors={formState.errors} fieldName={name} />
    </div>
  );
};

export default SelectSearch;
