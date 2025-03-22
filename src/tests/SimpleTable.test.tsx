import { render, screen } from '@testing-library/react';
import { SimpleTable } from '../components/Table';
import '@testing-library/jest-dom';
import { MortgageData } from '../../types';

describe('SimpleTable', () => {
  const mockData: MortgageData = {
    payments: [
      { month: 1, interest: 100.123, total: 500.456, balance: 95000.789 },
      { month: 2, interest: 99.999, total: 500.123, balance: 94500.123 },
    ],
    totalPaid: 100000,
    totalPaidWithInterest: 105000.99,
  };

  it('does not render table when data is undefined', () => {
    render(<SimpleTable data={undefined} />);
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders table headers', () => {
    render(<SimpleTable data={mockData} />);
    expect(screen.getByText('month')).toBeInTheDocument();
    expect(screen.getByText('interest')).toBeInTheDocument();
    expect(screen.getByText('total')).toBeInTheDocument();
    expect(screen.getByText('balance')).toBeInTheDocument();
  });

  it('renders correct number of payment rows', () => {
    render(<SimpleTable data={mockData} />);
    const rows = screen.getAllByRole('row');
    // 1 header + 2 body + 1 footer
    expect(rows.length).toBe(4);
  });

  it('renders formatted payment data', () => {
    render(<SimpleTable data={mockData} />);
    expect(screen.getByText('# 1')).toBeInTheDocument();
    expect(screen.getByText('100.12')).toBeInTheDocument();
    expect(screen.getByText('500.46')).toBeInTheDocument();
    expect(screen.getByText('95000.79')).toBeInTheDocument();
  });

  it('renders totals in tfoot', () => {
    render(<SimpleTable data={mockData} />);
    expect(screen.getByText('105000.99')).toBeInTheDocument();
    expect(screen.getByText('100000.00')).toBeInTheDocument();
  });
});
