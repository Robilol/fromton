import cx from 'classnames'
import { LoaderCircleIcon } from 'lucide-react'
import React, { type FC, type ReactElement } from 'react'

interface ButtonProps {
  label: string
  loading?: boolean
  type?: 'button' | 'submit'
  className?: string
  onClick?: () => void
  icon?: ReactElement
  disabled?: boolean
}

const Button: FC<ButtonProps> = ({
  label,
  loading,
  className,
  type = 'button',
  onClick,
  icon,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={cx(
        'button !bg-yellow flex flex-row gap-2 items-center disabled:pointer-events-none disabled:opacity-60',
        className,
      )}
    >
      {loading && <LoaderCircleIcon className="h-6 w-6 animate-spin" />}
      {icon}
      <span>{label}</span>
    </button>
  )
}

export default Button
