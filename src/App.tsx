import { useState } from 'react';
import { Modal } from './components/Modal';
import { MortgageCalculatorForm } from './components/MortgageCalculatorForm';
import { SimpleTable } from './components/Table';

import { type MortgageData } from '../types';
const data: MortgageData[] = [
  { month: 1, interest: 400, total: 1000, balance: 240000 },
  { month: 2, interest: 398, total: 1000, balance: 239000 },
  /* ... */
];
function App() {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [mortgageData, setMortgageData] = useState(null);

  return (
    <section className="mortgage_section">
      <h1>Mortgage calculator </h1>
      {!isOpenModal ? (
        <button
          className="primary_btn"
          disabled={isOpenModal}
          onClick={() => {
            setOpenModal(true);
          }}>
          Mortgage calculator
        </button>
      ) : null}
      <Modal
        isOpen={isOpenModal}
        onClose={() => setOpenModal(false)}
        title="Mortgage calculator"
        closeOnOutsideClick={false}>
        <MortgageCalculatorForm
          onCalculate={(result) => {
            console.log('Mortgage result:', result);
            setMortgageData(result);
            // You can show result inside modal or below button depending on flow
          }}
        />
      </Modal>
    </section>
  );
}

export default App;
