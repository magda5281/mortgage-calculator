import { MortgagePayment, type MortgageData } from '../../types';
import '../styles/table.css';

export function SimpleTable({ data }: { data?: MortgageData }) {
  if (!data) return null;
  const { payments, totalPaid, totalPaidWithInterest } = data;
  const headers = Object.keys(payments[0]);
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>{headers?.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>

        <tbody>
          {payments?.map((row: MortgagePayment, i) => (
            <tr key={i}>
              <td># {row.month}</td>
              <td>{row.interest.toFixed(2)}</td>
              <td>{row.total.toFixed(2)}</td>
              <td>{row.balance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>Total with interest</td>
            <td colSpan={2}>Total without interest</td>
          </tr>

          <tr>
            <td colSpan={2}>{totalPaidWithInterest.toFixed(2)}</td>
            <td colSpan={2}>{totalPaid.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
