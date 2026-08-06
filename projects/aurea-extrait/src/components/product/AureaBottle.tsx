import { useId } from 'react';

type BottleVariant = 'front' | 'angled' | 'top' | 'detail';

type AureaBottleProps = {
  rotation?: number;
  scale?: number;
  showShadow?: boolean;
  variant?: BottleVariant;
  className?: string;
  ariaLabel?: string;
};

function SunMonogram({ stroke = '#8f2428' }: { stroke?: string }) {
  return (
    <g fill="none" stroke={stroke} strokeLinecap="round">
      <circle cx="260" cy="449" r="18" strokeWidth="1.8" />
      <path d="M250 462 260 437l10 25M254 454h12" strokeWidth="2" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <path key={angle} d="M260 425v-7" transform={`rotate(${angle} 260 449)`} />
      ))}
    </g>
  );
}

export function AureaBottle({
  rotation = 0,
  scale = 1,
  showShadow = true,
  variant = 'front',
  className = '',
  ariaLabel,
}: AureaBottleProps) {
  const rawId = useId();
  const id = rawId.replace(/:/g, '');
  const decorative = !ariaLabel;
  const finalRotation = rotation + (variant === 'angled' ? -8 : 0);

  if (variant === 'top') {
    return (
      <svg
        className={`bottle bottle--top ${className}`}
        viewBox="0 0 500 500"
        role={decorative ? undefined : 'img'}
        aria-hidden={decorative || undefined}
        aria-label={ariaLabel}
      >
        <defs>
          <radialGradient id={`${id}-top`} cx="38%" cy="31%">
            <stop stopColor="#7b4a32" />
            <stop offset=".44" stopColor="#2b160f" />
            <stop offset=".82" stopColor="#120e0b" />
            <stop offset="1" stopColor="#050302" />
          </radialGradient>
          <filter id={`${id}-top-shadow`} x="-30%" width="160%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>
        <ellipse cx="250" cy="369" rx="172" ry="36" fill="#120e0b" opacity=".38" filter={`url(#${id}-top-shadow)`} />
        <ellipse cx="250" cy="250" rx="190" ry="162" fill={`url(#${id}-top)`} stroke="#67402d" strokeWidth="5" />
        <ellipse cx="250" cy="250" rx="146" ry="124" fill="none" stroke="#e9c678" strokeWidth="4" opacity=".85" />
        <ellipse cx="250" cy="250" rx="115" ry="98" fill="#21110c" stroke="#d7952b" strokeWidth="2" />
        <path d="M210 294 250 186l40 108M225 254h50" fill="none" stroke="#e9c678" strokeWidth="9" />
        <path d="M126 187c38-65 116-91 181-68" fill="none" stroke="#fff" strokeWidth="8" opacity=".16" strokeLinecap="round" />
      </svg>
    );
  }

  const viewBox = variant === 'detail' ? '55 15 410 655' : '0 0 520 900';

  return (
    <svg
      className={`bottle bottle--${variant} ${className}`}
      style={{ transform: `rotate(${finalRotation}deg) scale(${scale})` }}
      viewBox={viewBox}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={ariaLabel}
    >
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" x2="1">
          <stop stopColor="#190d09" stopOpacity=".96" />
          <stop offset=".09" stopColor="#684024" stopOpacity=".88" />
          <stop offset=".22" stopColor="#d99b4d" stopOpacity=".62" />
          <stop offset=".42" stopColor="#6f261c" stopOpacity=".93" />
          <stop offset=".7" stopColor="#a93525" stopOpacity=".9" />
          <stop offset=".87" stopColor="#e4a542" stopOpacity=".58" />
          <stop offset="1" stopColor="#1a0b08" stopOpacity=".98" />
        </linearGradient>
        <linearGradient id={`${id}-liquid`} x1="0" x2=".8" y1="0" y2="1">
          <stop stopColor="#f1a43a" stopOpacity=".72" />
          <stop offset=".34" stopColor="#b94324" stopOpacity=".88" />
          <stop offset=".72" stopColor="#7f1f22" stopOpacity=".96" />
          <stop offset="1" stopColor="#39120d" />
        </linearGradient>
        <linearGradient id={`${id}-base`} y1="0" y2="1">
          <stop stopColor="#fff4da" stopOpacity=".12" />
          <stop offset=".35" stopColor="#f8c970" stopOpacity=".32" />
          <stop offset="1" stopColor="#f3e7d1" stopOpacity=".76" />
        </linearGradient>
        <linearGradient id={`${id}-cap`} x1="0" x2="1">
          <stop stopColor="#080403" />
          <stop offset=".2" stopColor="#563526" />
          <stop offset=".5" stopColor="#24130e" />
          <stop offset=".76" stopColor="#69422d" />
          <stop offset="1" stopColor="#070403" />
        </linearGradient>
        <linearGradient id={`${id}-gold`} x1="0" x2="1">
          <stop stopColor="#8c5616" />
          <stop offset=".24" stopColor="#f7dc93" />
          <stop offset=".5" stopColor="#b87718" />
          <stop offset=".76" stopColor="#ffe6a3" />
          <stop offset="1" stopColor="#8a5315" />
        </linearGradient>
        <radialGradient id={`${id}-shoulder`} cx="50%" cy="0%">
          <stop stopColor="#f3c263" stopOpacity=".72" />
          <stop offset=".6" stopColor="#7e291c" stopOpacity=".65" />
          <stop offset="1" stopColor="#29100b" stopOpacity=".9" />
        </radialGradient>
        <filter id={`${id}-shadow`} x="-35%" width="170%" y="-80%" height="260%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <filter id={`${id}-soft`} x="-80%" width="260%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <filter id={`${id}-inner`} x="-20%" width="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="9" result="blur" />
          <feOffset dy="8" result="offset" />
          <feComposite in="offset" in2="SourceAlpha" operator="out" result="cut" />
          <feFlood floodColor="#120e0b" floodOpacity=".72" result="color" />
          <feComposite in="color" in2="cut" operator="in" result="shadow" />
          <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id={`${id}-body`}>
          <path d="M65 315Q65 247 130 228h260q65 19 65 87v432q0 70-70 76H135q-70-6-70-76z" />
        </clipPath>
      </defs>

      {showShadow && (
        <>
          <ellipse cx="260" cy="842" rx="190" ry="28" fill="#120e0b" opacity=".34" filter={`url(#${id}-shadow)`} />
          <ellipse cx="260" cy="824" rx="138" ry="14" fill="#120e0b" opacity=".28" />
        </>
      )}

      <g className="bottle-cap">
        <path d="M153 72Q163 36 205 26h110q42 10 52 46l17 122q-124 42-248 0z" fill={`url(#${id}-cap)`} stroke="#080403" strokeWidth="4" />
        <path d="M166 74q94-38 188 0" fill="none" stroke="#a98162" strokeWidth="6" opacity=".45" />
        <path d="M175 88q18-30 49-35" fill="none" stroke="#fff" strokeWidth="8" opacity=".12" strokeLinecap="round" />
        <ellipse cx="260" cy="191" rx="123" ry="27" fill="#110a07" />
        <ellipse cx="260" cy="186" rx="111" ry="19" fill="#4d2c20" opacity=".7" />
        <rect x="136" y="189" width="248" height="43" rx="7" fill={`url(#${id}-gold)`} />
        <path d="M150 199h220" stroke="#fff1bc" strokeWidth="2" opacity=".55" />
      </g>

      <path d="M119 244q27-25 67-31h148q40 6 67 31l24 41H95z" fill={`url(#${id}-shoulder)`} />
      <path d="M65 315Q65 247 130 228h260q65 19 65 87v432q0 70-70 76H135q-70-6-70-76z" fill={`url(#${id}-glass)`} stroke="#f1c47b" strokeOpacity=".28" strokeWidth="6" filter={`url(#${id}-inner)`} />

      <g clipPath={`url(#${id}-body)`}>
        <path d="M78 337q182-32 364 0v394q0 58-58 66H136q-58-8-58-66z" fill={`url(#${id}-liquid)`} />
        <path d="M79 337q181 30 362 0" fill="none" stroke="#ffd17f" strokeWidth="8" opacity=".42" />
        <path d="M106 253h80L145 773H74z" fill="#fff" opacity=".16" filter={`url(#${id}-soft)`} />
        <path d="M122 271h22l-25 384H91z" fill="#fff" opacity=".24" />
        <path d="M405 285h29v421h-29z" fill="#ffe4a2" opacity=".2" filter={`url(#${id}-soft)`} />
        <ellipse cx="268" cy="774" rx="176" ry="50" fill={`url(#${id}-base)`} />
        <rect x="69" y="704" width="382" height="113" fill={`url(#${id}-base)`} opacity=".72" />
        <path d="M96 790q164 31 328 0" fill="none" stroke="#fff5d8" strokeWidth="9" opacity=".4" />
        <ellipse cx="260" cy="815" rx="165" ry="22" fill="#f5d18c" opacity=".22" />
      </g>

      <g className="bottle-label">
        <rect x="119" y="397" width="282" height="247" rx="4" fill="#c6a87b" opacity=".25" transform="translate(5 7)" />
        <rect x="119" y="397" width="282" height="247" rx="3" fill="#f3e7d1" />
        <path d="M129 407h262v227H129z" fill="none" stroke="#d0ae68" strokeWidth="1" />
        <SunMonogram />
        <text x="260" y="523" textAnchor="middle" fill="#2b160f" fontSize="48" fontWeight="700" letterSpacing="9">AUREA</text>
        <path d="M155 542h210" stroke="#d7952b" />
        <text x="260" y="574" textAnchor="middle" fill="#2b160f" fontSize="15" letterSpacing="4">EXTRAIT DE PARFUM</text>
        <text x="260" y="603" textAnchor="middle" fill="#2b160f" fontSize="11" letterSpacing="3">75 ML · PARIS — MILANO</text>
        <text x="260" y="624" textAnchor="middle" fill="#8f2428" fontSize="8" letterSpacing="2">LIMITED FIRST EDITION</text>
      </g>

      <path d="M98 282q-17 73-9 160" fill="none" stroke="#fff" strokeWidth="7" opacity=".2" strokeLinecap="round" />
      <path d="M422 300q17 64 8 122" fill="none" stroke="#ffd583" strokeWidth="5" opacity=".24" strokeLinecap="round" />
    </svg>
  );
}
