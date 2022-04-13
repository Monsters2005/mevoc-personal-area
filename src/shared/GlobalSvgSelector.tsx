import React from 'react';

export function GlobalSvgSelector({ id }: { id: string }) {
  switch (id) {
    case 'logo':
      return (
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect opacity="0.8" width="44" height="44" rx="10" fill="#4F4E60" />
          <g>
            <rect
              x="11.3774"
              y="10.4796"
              width="12.4121"
              height="17.5494"
              rx="3.5"
              stroke="#FFEBA7"
              strokeWidth="3"
            />
            <rect
              x="20.6248"
              y="16.6444"
              width="12.4121"
              height="17.5494"
              rx="3.5"
              stroke="#EAE7FF"
              strokeWidth="3"
            />
          </g>
        </svg>
      );

    default:
      return null;
  }
}
