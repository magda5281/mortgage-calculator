import '../styles/form.css';
interface FieldProps {
  label: string;
  unit?: string;
  error?: string;
  children: React.ReactNode;
}

export function Field({ label, unit, error, children }: FieldProps) {
  return (
    <div>
      <div className="form_field">
        <label className="field_label">
          {label}
          {unit && <span className="field_unit"> {unit}</span>}
        </label>
        {children}
      </div>
      <p className="field_error">{error || ''}</p>
    </div>
  );
}
