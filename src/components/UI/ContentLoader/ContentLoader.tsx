import React, { CSSProperties } from 'react';
import ContentLoader from 'react-content-loader';

type LoaderType = 'profile' | 'area' | 'line';

type Props = {
  type: LoaderType;
  width: number;
  height: number;
  bgColor: string;
  fgColor: string;
  style?: CSSProperties;
  count?: number;
};

export function ContentSkeleton({
  type,
  width,
  height,
  bgColor,
  fgColor,
  style,
  count,
}: Props) {
  switch (type) {
    case 'profile':
      return (
        <ContentLoader
          speed={2}
          width={width}
          height={height}
          viewBox="0 0 400 50"
          backgroundColor={bgColor}
          foregroundColor={fgColor}
          style={style}
        >
          <rect x="59" y="12" rx="3" ry="3" width="200" height="8" />
          <rect x="59" y="30" rx="3" ry="3" width="82" height="7" />
          <circle cx="25" cy="25" r="25" />
        </ContentLoader>
      );
    case 'area':
      return (
        <ContentLoader
          speed={2}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          backgroundColor={bgColor}
          foregroundColor={fgColor}
          style={style}
        >
          <rect
            x="16"
            y="27"
            rx="10"
            ry="10"
            width={width - 20}
            height={height - 40}
          />
        </ContentLoader>
      );
    case 'line':
      return (
        <ContentLoader
          speed={2}
          width={width}
          height={height}
          viewBox="0 0 165 53"
          backgroundColor="#c4c3ca7b"
          foregroundColor="#c4c3cab2"
        >
          <rect x="0" y="34" rx="10" ry="10" width="165" height="18" />
        </ContentLoader>
      );

    default:
      return null;
  }
}
