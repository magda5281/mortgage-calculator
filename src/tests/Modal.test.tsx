import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../components/Modal';
beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation((msg) => {
    if (typeof msg === 'string' && msg.includes('stacking context')) return;
    console.warn(msg);
  });
});

describe('Modal component', () => {
  it('renders the modal content when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} title="Test Modal">
        <div>Modal content</div>
      </Modal>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeVisible();
    expect(screen.getByText('Test Modal')).toBeVisible();
  });

  it('does not render the modal when isOpen is false', () => {
    const { queryByRole } = render(
      <Modal isOpen={false} onClose={jest.fn()} title="Hidden Modal">
        <div>Should not be visible</div>
      </Modal>,
    );

    expect(queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Closable Modal">
        <div>Content</div>
      </Modal>,
    );

    const button = screen.getByRole('button', { name: /close/i });
    fireEvent.click(button);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking outside content if closeOnOutsideClick is true', () => {
    const onClose = jest.fn();
    render(
      <Modal
        isOpen={true}
        onClose={onClose}
        closeOnOutsideClick={true}
        title="Outside Click Test">
        <div>Content</div>
      </Modal>,
    );

    fireEvent.mouseDown(document.body);
    expect(onClose).toHaveBeenCalled();
  });

  it('does not call onClose when clicking outside if closeOnOutsideClick is false', () => {
    const onClose = jest.fn();
    render(
      <Modal
        isOpen={true}
        onClose={onClose}
        closeOnOutsideClick={false}
        title="Protected Modal">
        <div>Content</div>
      </Modal>,
    );

    fireEvent.mouseDown(document.body);
    expect(onClose).not.toHaveBeenCalled();
  });
});
