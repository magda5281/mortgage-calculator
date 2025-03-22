export interface FormProps {
  onCalculate: (
    propertyValue: number,
    deposit: number,
    interestRate: number,
    years: number,
  ) => void;
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
