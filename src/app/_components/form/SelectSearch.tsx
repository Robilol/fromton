import { type FC, Fragment, useState } from "react";
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, ComboboxButton } from '@headlessui/react'
import { Controller, useFormContext } from "react-hook-form";
import ErrorMessage from "@/app/_components/form/ErrorMessage";
import { CheckIcon, ChevronDownIcon, ChevronsUpDownIcon } from "lucide-react";
import React from "react";
import _ from "lodash";
import cx from "classnames";


type Option = { id: string | number; label: string };

interface SelectSearchProps {
  name: string;
  label?: string;
  data?: Option[];
}

const SelectSearch: FC<SelectSearchProps> = ({ name, label, data }) => {
  const methods = useFormContext();
  const { formState, register, control } = methods;
  const error = _.get(formState.errors, name)
  const [query, setQuery] = useState('')

  const filteredData =
  query === ''
    ? data
      : data?.filter((option) => {
        return option.label.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <div className="flex w-full flex-col items-start">
      {label && <label className="">{label}</label>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          console.log(value)
          return (
            <Combobox immediate value={data?.find((option) => option.id === value)} onChange={(value: Option) => onChange(value.id)}>
              <div className={cx("relative cursor-default overflow-hidden rounded-lg border-2 border-black shadow-fromton-input bg-white text-left sm:text-sm focus-within:border-primary", {
                '!border-red-500': error,
              })}>
                <ComboboxInput
                  autoComplete="off"
                  className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                  onChange={(event) => setQuery(event.target.value)}
                  displayValue={(option: Option) => option?.label} />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                  <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white" />
                </ComboboxButton>
              </div>

              <ComboboxOptions
                anchor="bottom start"
                transition
                className="rounded-lg border-2 border-black bg-white"
              >
                {filteredData?.map((option) => (
                  <ComboboxOption
                    key={option.id}
                    value={option}
                    className={({ active }) => `relative select-none py-2 pl-10 pr-4 cursor-pointer flex flex-row ${active ? "bg-primary text-white" : "text-gray-900"}`}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                        >
                          {option.label}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"}`}
                          >
                            <CheckIcon
                              className="h-5 w-5"
                              aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Combobox>
          );
        }}
      />
      <ErrorMessage errors={formState.errors} fieldName={name} />
    </div>
  )

};

export default SelectSearch;
