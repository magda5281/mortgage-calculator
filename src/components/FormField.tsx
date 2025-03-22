import React from 'react';
import { FormFieldProps } from '../../types';
import '../styles/form.css';

export function Field({
  label,
  unit,
  error,
  hint,
  children,
  id,
}: FormFieldProps) {
  return (
    <div className="form_group">
      <div className="form_field">
        <label htmlFor={id} className="field_label">
          {label} {hint && <span>({hint})</span>}
        </label>
        <div className={`input_wrapper ${unit ? 'has-unit' : ''}`}>
          {unit && <span className="field_unit">{unit}</span>}
          {children}
        </div>
      </div>
      <p className="field_error">{error || ''}</p>
    </div>
  );
}
