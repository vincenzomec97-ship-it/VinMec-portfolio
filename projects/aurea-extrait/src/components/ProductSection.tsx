import { useCallback, useState } from 'react';
import { CartModal } from './CartModal';
import { AureaBottle } from './product/AureaBottle';

export function ProductSection() {
  const [quantity, setQuantity] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const closeCart = useCallback(() => setCartOpen(false), []);

  return (
    <>
      <section className="product" id="edition">
        <div className="product-visual">
          <span>FIRST EDITION / 0001—0750</span>
          <div className="product-halo" aria-hidden="true" />
          <AureaBottle ariaLabel="AUREA Extrait de Parfum, bottiglia da 75 ml" />
          <strong className="product-vertical">OBJECT<br />OF LIGHT</strong>
        </div>

        <div className="product-copy">
          <span className="eyebrow">Limited first edition</span>
          <h2>
            AUREA
            <em>EXTRAIT DE PARFUM</em>
          </h2>
          <p>
            Una fragranza calda e luminosa, costruita attorno ad ambra,
            vaniglia, pepe rosa e legni scuri.
          </p>
          <ul>
            <li>75 ml</li>
            <li>Extrait de Parfum</li>
            <li>Unisex</li>
            <li>Made in Italy</li>
            <li>Edizione numerata</li>
            <li>Prodotto fittizio</li>
          </ul>
          <div className="buy">
            <strong>€145</strong>
            <label>
              Quantity
              <select value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}>
                {[1, 2, 3, 4].map((value) => <option key={value}>{value}</option>)}
              </select>
            </label>
            <button className="button wine" onClick={() => setCartOpen(true)}>
              Add to bag <span aria-hidden="true">↗</span>
            </button>
          </div>
          <small>No payment will be processed. Portfolio demonstration only.</small>
        </div>
      </section>

      <CartModal
        open={cartOpen}
        quantity={quantity}
        setQuantity={setQuantity}
        close={closeCart}
      />
    </>
  );
}
