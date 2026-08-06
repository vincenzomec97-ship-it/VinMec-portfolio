import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { AureaBottle } from './product/AureaBottle';

const chapters = [
  { index: '01', title: 'LIGHT\nARRIVES.', copy: 'A warm opening. A quiet electric edge.' },
  { index: '02', title: 'AMBER\nMOVES.', copy: 'The heart settles closer to the skin.' },
  { index: '03', title: 'AUREA\nREMAINS.', copy: 'Vanilla, sandalwood and a trace of musk.' },
] as const;

type ChapterProps = {
  chapter: (typeof chapters)[number];
  index: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
};

function SequenceChapter({ chapter, index, progress, reducedMotion }: ChapterProps) {
  const start = index * 0.32;
  const end = Math.min(start + 0.38, 1);
  const opacity = useTransform(
    progress,
    index === 0 ? [0, 0.28] : [start, start + 0.12, end - 0.08, end],
    index === 0 ? [1, 0] : [0, 1, 1, 0],
  );

  return (
    <motion.article style={reducedMotion ? undefined : { opacity }}>
      <span>{chapter.index} / 03</span>
      <h3>{chapter.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h3>
      <p>{chapter.copy}</p>
    </motion.article>
  );
}

export function LaunchSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const bottleX = useTransform(scrollYProgress, [0, 0.45, 1], ['-29vw', '3vw', '27vw']);
  const bottleY = useTransform(scrollYProgress, [0, 0.48, 1], ['8vh', '-3vh', '11vh']);
  const bottleRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-13, 8, 78]);
  const bottleScale = useTransform(scrollYProgress, [0, 0.55, 1], [0.82, 1.13, 0.74]);
  const wordX = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

  return (
    <section className="launch-sequence" ref={sectionRef} aria-labelledby="sequence-title">
      <div className="sequence-sticky">
        <div className="sequence-rule" aria-hidden="true" />
        <span className="sequence-kicker">AUREA / A study in three movements</span>

        <motion.h2 id="sequence-title" style={reducedMotion ? undefined : { x: wordX }}>
          LIGHT IN
          <br />
          <em>MOTION.</em>
        </motion.h2>

        <motion.div
          className="sequence-product"
          style={
            reducedMotion
              ? undefined
              : { x: bottleX, y: bottleY, rotate: bottleRotate, scale: bottleScale }
          }
        >
          <AureaBottle ariaLabel="Flacone AUREA sospeso durante la sequenza editoriale" />
        </motion.div>

        <div className="sequence-chapters">
          {chapters.map((chapter, index) => (
            <SequenceChapter
              chapter={chapter}
              index={index}
              key={chapter.index}
              progress={scrollYProgress}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        <div className="sequence-progress" aria-hidden="true">
          <motion.span style={reducedMotion ? { scaleX: 1 } : { scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  );
}
