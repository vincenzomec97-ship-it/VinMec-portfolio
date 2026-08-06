import { motion } from 'framer-motion';
import { usePointerParallax } from '../hooks/usePointerParallax';
import { AureaBottle } from './product/AureaBottle';

const premiumEase = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { point, onPointerMove, onPointerLeave } = usePointerParallax();

  return (
    <section
      className="hero"
      id="fragrance"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.div
        className="hero-rule hero-rule--top"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.25, ease: premiumEase }}
      />

      <div className="hero-meta">
        <span>Extrait de Parfum</span>
        <span>75 ml · No. 001</span>
        <span>Paris — Milano</span>
      </div>

      <div className="hero-word-wrap" aria-label="AUREA">
        <motion.h1
          className="hero-word hero-word--back"
          initial={{ y: '108%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1.05, delay: 0.12, ease: premiumEase }}
        >
          AUREA
        </motion.h1>
      </div>

      <motion.div
        className="hero-aura"
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.72 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.3, ease: premiumEase }}
      />

      <motion.div
        className="hero-bottle"
        initial={{ y: 210, opacity: 0, rotate: 9, scale: 0.86 }}
        animate={{ y: point.y, opacity: 1, rotate: -2, scale: 1, x: point.x }}
        transition={{ duration: 1.45, delay: 0.18, ease: premiumEase }}
      >
        <AureaBottle ariaLabel="Flacone AUREA Extrait de Parfum da 75 ml" />
      </motion.div>

      <motion.div
        className="hero-side-type"
        aria-hidden="true"
        initial={{ opacity: 0, x: 35 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 1.05, ease: premiumEase }}
      >
        <span>WEAR</span>
        <span>THE LIGHT.</span>
      </motion.div>

      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95, duration: 0.9, ease: premiumEase }}
      >
        <span className="hero-copy-index">A / 01</span>
        <p>
          Una luce calda sulla pelle.
          <br />
          Ambra, vaniglia e legni scuri.
        </p>
        <div className="hero-actions">
          <a className="button dark" href="#story">Discover the fragrance</a>
          <a className="button line" href="#notes">Explore the notes</a>
        </div>
      </motion.div>

      <span className="edition-tag">Limited first edition / 0001—0750</span>
      <a className="scroll-cue" href="#sequence-title">
        Scroll to feel <span aria-hidden="true">↓</span>
      </a>
      <motion.div
        className="hero-rule hero-rule--bottom"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.25, delay: 0.25, ease: premiumEase }}
      />
    </section>
  );
}
