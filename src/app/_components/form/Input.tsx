import React, {type FC, type HTMLInputTypeAttribute} from 'react'
import {useFormContext} from 'react-hook-form'
import cx from 'classnames'
import _ from 'lodash'

interface InputProps {
  name: string
  label?: string
  type?: HTMLInputTypeAttribute
}
const Input: FC<InputProps> = ({ type = 'text', label, name }) => {
  const methods = useFormContext()
  const { formState, register } = methods
  const error = _.get(formState.errors, name)

  return (
    <div className="flex flex-col gap-1 w-full items-start">
      <label htmlFor={name} className="w-full">
        <span
          className={cx('', {
            'text-red-500': error,
          })}
        >
          {label}
        </span>
        <input
          className={cx('input w-full', {
            '!border-red-500': error,
          })}
          {...register(name)}
          id={name}
          type={type}
        />
      </label>
      {error && (
        <span className="font-ApfelGrotezk py-2 text-sm text-red-500">
          {error?.message as string}
        </span>
      )}
    </div>
  )
}

export default Input
