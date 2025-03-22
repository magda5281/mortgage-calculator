import { calculateMortgagePayment } from '../utils/mortgageUtils';

describe('calculateMortgagePayment', () => {
  it('calculates the correct loan and payments', () => {
    const result = calculateMortgagePayment(250000, 50000, 5, 25);

    expect(result.totalPaid).toBe(200000); // 250k - 50k
    expect(result.payments.length).toBe(25 * 12); // 300 months

    // Check monthly payment is roughly correct
    const firstMonth = result.payments[0];
    expect(firstMonth).toHaveProperty('month', 1);
    expect(firstMonth).toHaveProperty('interest');
    expect(firstMonth).toHaveProperty('total');
    expect(firstMonth).toHaveProperty('balance');

    // Final balance should be close to 0
    const lastMonth = result.payments[result.payments.length - 1];
    expect(lastMonth.balance).toBeLessThan(1); // floating-point safety
  });

  it('works with 0% interest', () => {
    const result = calculateMortgagePayment(120000, 20000, 0, 10);

    expect(result.totalPaid).toBe(100000); // 120k - 20k
    expect(result.totalPaidWithInterest).toBeCloseTo(100000); // no extra cost
    expect(result.payments.every((p) => p.interest === 0)).toBe(true);
  });
});
