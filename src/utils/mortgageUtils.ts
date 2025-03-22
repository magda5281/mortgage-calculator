export const calculateMortgagePayment = (
  propertyValue: number,
  deposit: number,
  interestRate: number,
  mortgageTermYears: number,
) => {
  // Loan Calculation
  const loan = propertyValue - deposit;

  // Convert interest rate from percentage to decimal and calculate monthly rate
  const monthlyInterestRate = interestRate / 100 / 12;

  const totalMonths = mortgageTermYears * 12;

  // Monthly Repayment Formula
  const monthlyPayment =
    monthlyInterestRate === 0
      ? loan / totalMonths
      : (monthlyInterestRate /
          (1 - Math.pow(1 + monthlyInterestRate, -totalMonths))) *
        loan;

  let balance = loan;
  const monthlyPayments = [];

  for (let month = 1; month <= totalMonths; month++) {
    const interest = balance * monthlyInterestRate;
    const principalPaid = monthlyPayment - interest;
    const newBalance = balance - principalPaid;

    monthlyPayments.push({
      month,
      interest,
      total: monthlyPayment,
      balance: newBalance > 0 ? newBalance : 0, // Ensure no negative balance
    });

    balance = newBalance;
  }

  return {
    payments: monthlyPayments,
    totalPaid: loan, // Amount borrowed
    totalPaidWithInterest: totalMonths * monthlyPayment, // Total paid over loan period
  };
};
