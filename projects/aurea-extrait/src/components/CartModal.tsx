import { useEffect, useRef } from 'react';
import { AureaBottle } from './product/AureaBottle';

type CartModalProps = {
  open: boolean;
  quantity: number;
  close: () => void;
  setQuantity: (quantity: number) => void;
};

const focusableSelector = 'button, select, input, a[href], [tabindex]:not([tabindex="-1"])';

export function CartModal({ open, quantity, close, setQuantity }: CartModalProps) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.classList.add('locked');
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        return;
      }

      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      const first = focusable.at(0);
      const last = focusable.at(-1);

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('locked');
      previouslyFocused?.focus();
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="cart-overlay"
      onMouseDown={(event) => event.target === event.currentTarget && close()}
    >
      <aside
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        aria-describedby="cart-disclaimer"
        className="cart"
      >
        <button ref={closeRef} className="cart-close" onClick={close} aria-label="Chiudi carrello">
          ×
        </button>
        <span className="eyebrow">Your selection / demo</span>
        <h2 id="cart-title">IN THE BAG.</h2>

        <div className="cart-item">
          <AureaBottle />
          <div>
            <h3>AUREA</h3>
            <p>Extrait de Parfum · 75 ml</p>
            <strong>€145</strong>
          </div>
        </div>

        <div className="cart-row">
          <span>Quantità</span>
          <div className="stepper">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Diminuisci quantità">−</button>
            <output aria-live="polite">{quantity}</output>
            <button onClick={() => setQuantity(quantity + 1)} aria-label="Aumenta quantità">+</button>
          </div>
        </div>

        <div className="cart-row total">
          <span>Subtotal</span>
          <strong>€{145 * quantity}</strong>
        </div>
        <p className="demo-note" id="cart-disclaimer">
          Portfolio demo — no real purchase will be completed.
        </p>
        <button className="button wine" onClick={close}>Continue exploring</button>
      </aside>
    </div>
  );
}
