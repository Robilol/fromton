'use client'

import React, {type FC, type HTMLInputTypeAttribute} from 'react'
import {useFormContext} from 'react-hook-form'
import cx from 'classnames'
import _ from 'lodash'
import ErrorMessage from './ErrorMessage'

interface InputProps {
  name: string
  label?: string
  type?: HTMLInputTypeAttribute 
  className?: string
}
const Input: FC<InputProps> = ({ type = 'text', label, name, className }) => {
  const methods = useFormContext()
  const { formState, register } = methods
  const error = _.get(formState.errors, name)


  return (
    <div className="flex flex-col gap-1 w-full items-start">
      <label htmlFor={name} className="w-full flex flex-col items-start gap-1">
        <span
          className={cx('', {
            'text-red-500': error,
          })}
        >
          {label}
        </span>
        <input
          className={cx('input', className, {
            '!border-red-500': error,
          })}
          {...register(name)}
          id={name}
          type={type}
        />
      </label>
      <ErrorMessage errors={formState.errors} fieldName={name} />
    </div>
  )
}

export default Input
