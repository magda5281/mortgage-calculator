import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { calculatorSchema } from '../schemas';
import '../styles/form.css';
import { Field } from './FormField';
import { useEffect } from 'react';
import { calculateMortgagePayment } from '../utils/mortgageUtils';
import { MortgageData } from '../../types';

type FormData = z.infer<typeof calculatorSchema>;

export const MortgageCalculatorForm = ({
  onCalculate,
}: {
  onCalculate: (result: MortgageData) => void;
}) => {
  const form = useForm<z.infer<typeof calculatorSchema>>({
    mode: 'onBlur',
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
  }, [setFocus]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mortgage_form">
      <Field
        id={'deposit'}
        label={'Deposit'}
        unit={'£'}
        hint={'Less than Property value'}
        error={errors?.deposit?.message}>
        <input
          id={'deposit'}
          type={'number'}
          min={0}
          {...register('deposit', { valueAsNumber: true })}
        />
      </Field>

      <Field
        id={'propertyValue'}
        label={'Property value'}
        unit={'£'}
        error={errors?.propertyValue?.message}>
        <input
          id={'propertyValue'}
          type={'number'}
          min={0}
          {...register('propertyValue', { valueAsNumber: true })}
        />
      </Field>

      <Field
        id={'interestRate'}
        label={'Interest rate'}
        unit={'%'}
        error={errors?.interestRate?.message}>
        <input
          id={'interestRate'}
          type={'number'}
          min={0}
          max={100}
          step={'0.01'}
          {...register('interestRate', { valueAsNumber: true })}
        />
      </Field>

      <Field
        id={'mortgageTerm'}
        label={'Mortgage term'}
        unit={'years'}
        hint={'Enter full years 1 to 45'}
        error={errors?.mortgageTerm?.message}>
        <input
          id={'mortgageTerm'}
          step={1}
          inputMode={'numeric'}
          min={0}
          max={45}
          type="number"
          pattern="^\d+$"
          {...register('mortgageTerm', { valueAsNumber: true })}
        />
      </Field>

      <button className={'primary_btn'} type={'submit'}>
        Calculate
      </button>
    </form>
  );
};
