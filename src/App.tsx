import { useState } from 'react';
import { Modal } from './components/Modal';

function App() {
  const [isOpenModal, setOpenModal] = useState(false);

  return (
    <section className="mortgage_section">
      <h1>Mortgage calculator </h1>
      <button
        className="primary_btn"
        onClick={() => {
          setOpenModal(true);
        }}>
        Calculate mortgage
      </button>
      <Modal
        isOpen={isOpenModal}
        onClose={() => setOpenModal(false)}
        title="Mortgage calculator"
        closeOnOutsideClick={true}>
        <div>Mortgage calculator form </div>
      </Modal>
    </section>
  );
}

export default App;
