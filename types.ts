export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  className?: string;
  closeOnOutsideClick?: boolean;
}

export interface FormFieldProps {
  label: string;
  unit?: string;
  error?: string;
  hint?: string;
  children: React.ReactElement;
  id: string;
}

export type MortgagePayment = {
  month: number;
  interest: number;
  total: number;
  balance: number;
};
export type MortgageData = {
  payments: MortgagePayment[];
  totalPaid: number;
  totalPaidWithInterest: number;
};
