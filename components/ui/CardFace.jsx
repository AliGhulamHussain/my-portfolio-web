"use client";

import { SUITS } from "@/lib/deck";

/**
 * The DOM card. Two faces in a preserve-3d shell:
 *  - .card-front  : content (title, body, chips, details when focused)
 *  - .card-back   : shared holographic deck design (visible face-down)
 * Used both inside the 3D scene (via drei Html transform) and in the
 * reduced-motion fallback grid.
 */
export default function CardFace({ card, focused = false, onClose }) {
  const suit = SUITS[card.zone];

  return (
    <div className={`card3d ${focused ? "is-open" : ""}`}>
      {/* FRONT */}
      <div className="card-face card-front">
        <div className="card-corner card-corner-tl">
          <span>{card.code}</span>
          <span className="card-corner-glyph">{suit.glyph}</span>
        </div>
        <div className="card-corner card-corner-br">
          <span>{card.code}</span>
          <span className="card-corner-glyph">{suit.glyph}</span>
        </div>

        <span className="card-watermark" aria-hidden="true">
          {suit.glyph}
        </span>

        <div className="card-body">
          <p className="card-suit">{suit.name}</p>
          <h3 className="card-title">{card.title}</h3>
          <p className="card-subtitle">{card.subtitle}</p>
          <p className="card-text">{card.body}</p>

          <div className="card-chips">
            {card.chips.map((chip) => (
              <span key={chip} className="card-chip">
                {chip}
              </span>
            ))}
          </div>

          {focused ? (
            <div className="card-details">
              <p>{card.details}</p>
              {card.link && (
                <a
                  href={card.link}
                  target={card.link.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="card-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  {card.linkLabel || "Visit live site"} ↗
                </a>
              )}
            </div>
          ) : (
            <p className="card-hint">Tap to open</p>
          )}
        </div>

        {focused && (
          <button
            className="card-close"
            onClick={(e) => {
              e.stopPropagation();
              onClose?.();
            }}
            aria-label="Close card"
          >
            ✕
          </button>
        )}
      </div>

      {/* BACK — the shared deck design */}
      <div className="card-face card-back" aria-hidden="true">
        <div className="card-back-inner">
          <div className="card-back-pattern" />
          <div className="card-back-center">
            <span className="card-back-glyph">◈</span>
            <span className="card-back-monogram">AGH</span>
            <span className="card-back-caption">PORTFOLIO&nbsp;DECK</span>
          </div>
        </div>
      </div>
    </div>
  );
}
