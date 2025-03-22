import '../styles/form.css';
interface FieldProps {
  label: string;
  unit?: string;
  error?: string;
  children: React.ReactNode;
}

export function Field({ label, unit, error, children }: FieldProps) {
  return (
    <div className="form_group">
      <div className="form_field">
        <label className="field_label">{label}</label>
        <div className={`input_wrapper ${unit ? 'has-unit' : ''}`}>
          {unit && <span className="field_unit">{unit}</span>}
          {children}
        </div>
      </div>
      <p className="field_error">{error || ''}</p>
    </div>
  );
}
