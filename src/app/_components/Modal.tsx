'use client'

import { Dialog, Transition } from '@headlessui/react'
import cx from 'classnames'
import { XIcon } from 'lucide-react'
import type { FC, PropsWithChildren } from 'react'
import React, { Fragment } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  className?: string
  title?: string
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  children,
  className = 'w-full max-w-md',
  title,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cx(
                  'relative transform overflow-hidden rounded-2xl bg-white text-left align-middle border-2 border-black shadow-fromton-input transition-all',
                  className,
                )}
              >
                <Dialog.Title className="text-2xl font-polySansBulkyWide border-b-2 border-black px-6 py-4">{title}</Dialog.Title>
                <button
                  className="absolute right-2 top-2"
                  type="button"
                  onClick={() => onClose()}
                >
                  <XIcon className="h-8 w-8" />
                </button>
                <div className="px-6 py-4 overflow-y-auto max-h-[65vh]">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
