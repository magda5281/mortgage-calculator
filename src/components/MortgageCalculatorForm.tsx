import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { calculatorSchema } from '../schemas';
import '../styles/form.css';
import { Field } from './FormField';
import { useEffect, useRef } from 'react';
import { calculateMortgagePayment } from '../utils/mortgageUtils';
import { MortgageData } from '../../types';

type FormData = z.infer<typeof calculatorSchema>;

export const MortgageCalculatorForm = ({
  onCalculate,
}: {
  onCalculate: (result: any) => void;
}) => {
  const form = useForm<z.infer<typeof calculatorSchema>>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      deposit: 25000,
      propertyValue: 250000,
      interestRate: 5,
      mortgageTerm: 25,
    },
  });

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = form;

  const onSubmit = (data: FormData) => {
    const mortgage: MortgageData = calculateMortgagePayment(
      data.propertyValue,
      data.deposit ?? 0,
      data.interestRate,
      data.mortgageTerm,
    );

    onCalculate(mortgage);
  };

  useEffect(() => {
    setFocus('deposit');
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mortgage_form">
      <Field label={'Deposit'} unit={'£'} error={errors?.deposit?.message}>
        <input
          type="number"
          {...register('deposit', { valueAsNumber: true })}
        />
      </Field>

      <Field
        label={'Property value'}
        unit={'£'}
        error={errors?.propertyValue?.message}>
        <input
          type="number"
          {...register('propertyValue', { valueAsNumber: true })}
        />
      </Field>

      <Field
        label={'Interest rate'}
        unit={'%'}
        error={errors?.interestRate?.message}>
        <input
          type="number"
          step="0.01"
          {...register('interestRate', { valueAsNumber: true })}
        />
      </Field>

      <Field
        label={'Mortgage term'}
        unit={'years'}
        error={errors?.mortgageTerm?.message}>
        <input
          type="number"
          {...register('mortgageTerm', { valueAsNumber: true })}
        />
      </Field>

      <button className={'primary_btn'} type="submit">
        Calculate
      </button>
    </form>
  );
};
