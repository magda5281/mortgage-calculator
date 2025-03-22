import { z } from 'zod';

export const calculatorSchema = z
  .object({
    propertyValue: z
      .number({ invalid_type_error: 'Property Value must be a number' })
      .min(0, 'Property Value cannot be negative'),
    deposit: z
      .number({ invalid_type_error: 'Deposit must be a number' })
      .min(0, 'Deposit cannot be negative'),

    interestRate: z
      .number({ invalid_type_error: 'Interest rate must be a number' })
      .min(0, 'Interest rate must be at least 0%')
      .max(100, 'Interest rate cannot exceed 100%'),

    mortgageTerm: z
      .number({ invalid_type_error: 'Mortgage term must be a number' })
      .int('Please enter full years only')
      .min(0, 'Minimum loan term is 0 years')
      .max(45, 'Maximum loan term is 45 years'),
  })
  .superRefine((data, ctx) => {
    if (data.deposit >= data.propertyValue) {
      // 1) Attach error to the `deposit` field:
      ctx.addIssue({
        path: ['deposit'],
        message: 'Deposit must be less than the Property value',
        code: 'custom',
      });
    }
  });
