import { FC, PropsWithChildren } from "react"
import Modal from "../Modal"
import CheeseProposalForm from "./CheeseProposalForm"

interface ProposalModalProps {
  isOpen: boolean
  onClose: () => void
  category: 'cheese' | 'shop' | 'producer'
}

export const ProposalModal: FC<ProposalModalProps> = ({
  isOpen,
  onClose,
  category,
}) => {
  return (
    <Modal className="w-full max-w-2xl" isOpen={isOpen} onClose={onClose} title={`Proposer un ${category === 'cheese' ? 'fromage' : category === 'shop' ? 'fromagerie' : 'producteur'}`}>
      <CheeseProposalForm onSuccess={onClose} />
    </Modal>
  )
}
