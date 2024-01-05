import React, { CSSProperties } from 'react';
import { useGetCurrentUserQuery } from '../../../store/api/userApi';
import { rgbToHex } from '../../../utils/lib/colorTransform';
import { defaultColorValues } from '../../../constants/kit/themes';

type Props = {
  size?: number;
  color?: string;
  stroke?: number;
  styles?: CSSProperties;
};

export function Loader({
  size = 150, color, stroke = 3, styles,
}: Props) {
  const { data: user } = useGetCurrentUserQuery();
  const accentColor = color || rgbToHex(user?.accentColor || defaultColorValues.accentColor);

  return (
    <div style={styles}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <g transform="translate(50,50)">
          <circle
            cx="0"
            cy="0"
            r="8.333333333333334"
            fill="none"
            stroke={accentColor}
            strokeWidth={stroke}
            strokeDasharray="26.179938779914945 26.179938779914945"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 0 0;360 0 0"
              dur="1s"
              calcMode="spline"
              keySplines="0.2 0 0.8 1"
              begin="0"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="0"
            cy="0"
            r="16.666666666666668"
            fill="none"
            stroke={accentColor}
            strokeWidth={stroke}
            strokeOpacity={0.9}
            strokeDasharray="52.35987755982989 52.35987755982989"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 0 0;360 0 0"
              dur="1s"
              calcMode="spline"
              keySplines="0.2 0 0.8 1"
              begin="-0.2"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="0"
            cy="0"
            r="25"
            fill="none"
            stroke={accentColor}
            strokeWidth={stroke}
            strokeOpacity={0.8}
            strokeDasharray="78.53981633974483 78.53981633974483"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 0 0;360 0 0"
              dur="1s"
              calcMode="spline"
              keySplines="0.2 0 0.8 1"
              begin="-0.4"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="0"
            cy="0"
            r="33.333333333333336"
            fill="none"
            stroke={accentColor}
            strokeWidth={stroke}
            strokeOpacity={0.7}
            strokeDasharray="104.71975511965978 104.71975511965978"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 0 0;360 0 0"
              dur="1s"
              calcMode="spline"
              keySplines="0.2 0 0.8 1"
              begin="-0.6"
              repeatCount="indefinite"
            />
          </circle>
          <circle
            cx="0"
            cy="0"
            r="41.666666666666664"
            fill="none"
            stroke={accentColor}
            strokeOpacity={0.6}
            strokeWidth={stroke}
            strokeDasharray="130.89969389957471 130.89969389957471"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 0 0;360 0 0"
              dur="1s"
              calcMode="spline"
              keySplines="0.2 0 0.8 1"
              begin="-0.8"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
}
