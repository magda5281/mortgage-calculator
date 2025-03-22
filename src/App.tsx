import { useState } from 'react';
import { Modal } from './components/Modal';
import { MortgageCalculatorForm } from './components/MortgageCalculatorForm';
import { SimpleTable } from './components/Table';

import { type MortgageData } from '../types';

function App() {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [mortgageData, setMortgageData] = useState<MortgageData>();

  return (
    <section className="mortgage_section">
      <h1>Mortgage page </h1>
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
            setMortgageData(result);
          }}
        />
        <SimpleTable data={mortgageData} />
      </Modal>
    </section>
  );
}

export default App;
