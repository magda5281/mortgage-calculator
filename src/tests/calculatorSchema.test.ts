import { calculatorSchema } from '../schemas';

describe('calculatorSchema', () => {
  it('accepts valid input', () => {
    const validInput = {
      propertyValue: 200000,
      deposit: 50000,
      interestRate: 3.5,
      mortgageTerm: 25,
    };
    expect(calculatorSchema.parse(validInput)).toEqual(validInput);
  });

  it('rejects deposit > property value', () => {
    const invalidInput = {
      propertyValue: 100000,
      deposit: 150000, // Invalid: deposit > propertyValue
      interestRate: 5,
      mortgageTerm: 25,
    };
    expect(() => calculatorSchema.parse(invalidInput)).toThrow();
  });

  // Add more test cases...
});
