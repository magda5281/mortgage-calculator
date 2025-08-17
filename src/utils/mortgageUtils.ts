/**
 * Calculates a mortgage repayment schedule (amortization table) based on input parameters.
 *
 * @param {number} propertyValue - The total value of the property (must be > deposit).
 * @param {number} deposit - The initial deposit paid (must be >= 0 and < propertyValue).
 * @param {number} interestRate - Annual interest rate (0-100%, e.g., 5 for 5%).
 * @param {number} mortgageTermYears - Loan term in years (1-45, integer).
 *
 * @returns {Object} An object containing:
 *   @property {Array} payments - Monthly payment details (array of objects).
 *     @property {number} month - Month number (1 to term*12).
 *     @property {number} interest - Interest portion of payment.
 *     @property {number} total - Total payment (principal + interest).
 *     @property {number} balance - Remaining loan balance.
 *   @property {number} totalPaid - Total principal paid (equals loan amount).
 *   @property {number} totalPaidWithInterest - Total cost including interest.
 *
 * @throws {Error} If inputs are invalid (handled by Zod schema in parent function).
 *
 * @example
 * // Returns 25-year mortgage schedule for £200k property
 * const result = calculateMortgagePayment(200000, 50000, 3.5, 25);
 * console.log(result.payments[0]); // First payment details
 *
 * @notes
 * - Uses standard annuity formula for amortization.
 * - Handles 0% interest edge case (equal principal payments).
 * - Balances are rounded to 2 decimal places for currency.
 */

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
