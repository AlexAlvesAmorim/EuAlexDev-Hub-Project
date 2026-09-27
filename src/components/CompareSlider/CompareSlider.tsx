import { type CSSProperties, useState } from "react";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { siteCopy } from "../../content/loader";

export interface ComparePair {
  before: string;
  after: string;
}

interface CompareSliderProps {
  pairs: ComparePair[];
  beforeLabel: string;
  afterLabel: string;
  alt: string;
}

/**
 * Comparador antes/depois arrastável: pares derivados de
 * `gallery.v12Images × gallery.v21Images` (por índice), labels de
 * versão do JSON. Input range nativo = teclado e touch de graça.
 */
export function CompareSlider({ pairs, beforeLabel, afterLabel, alt }: CompareSliderProps) {
  const [pairIndex, setPairIndex] = useState(0);
  const [pos, setPos] = useState(50);
  const pair = pairs[pairIndex];
  const copy = siteCopy.case.compare;

  if (!pair) return null;

  return (
    <div className="compare">
      <div
        className="compare__stage"
        style={{ "--pos": `${pos}%` } as CSSProperties}
      >
        <img
          src={pair.after}
          alt={`${alt} — ${copy.after} ${afterLabel}`}
          className="compare__img compare__img--after"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <img
          src={pair.before}
          alt=""
          aria-hidden="true"
          className="compare__img compare__img--before"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <span className="compare__tag compare__tag--before">
          {copy.before} · {beforeLabel}
        </span>
        <span className="compare__tag compare__tag--after">
          {copy.after} · {afterLabel}
        </span>
        <span className="compare__line" aria-hidden="true">
          <FaArrowRightArrowLeft aria-hidden="true" />
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="compare__range"
          aria-label={`${copy.hint}: ${copy.before} ${beforeLabel} × ${copy.after} ${afterLabel}`}
        />
      </div>

      {pairs.length > 1 && (
        <div className="compare__pairs" role="tablist" aria-label={`${copy.pair}s`}>
          {pairs.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === pairIndex}
              aria-label={`${copy.pair} ${i + 1} ${copy.of} ${pairs.length}`}
              className={`compare__dot${i === pairIndex ? " active" : ""}`}
              onClick={() => setPairIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
