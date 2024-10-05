'use client'
import { Dialog, Transition } from '@headlessui/react'
import React, {
  type FC,
  Fragment,
  type PropsWithChildren,
  useEffect,
  useState,
} from 'react'
import { Searchbar } from '@/app/_components/searchbar/Searchbar'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SearchModal: FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
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
          <div className="fixed inset-0 bg-opacity-10 bg-clip-padding backdrop-blur-lg backdrop-filter" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full w-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl">
                <Searchbar onResultClick={onClose} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
