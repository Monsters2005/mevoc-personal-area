import { Position } from 'postcss';

export const primaryMiddle = {
  padding: '6px 14px',
  fontSize: '13px',
  lineHeight: '19px',
  fontWeight: '600',
};

export const primarySmallLists = {
  fontWeight: '700',
  fontSize: '13px',
  lineHeight: '19px',
  padding: '10px 16px',
  width: '65px',
  height: '30px',
  position: 'absolute' as const,
  right: '25px',
  top: '18px',
};

export const primarySmallNoLists = {
  fontWeight: '700',
  fontSize: '13px',
  lineHeight: '19px',
  padding: '10px 16px',
  width: '65px',
  height: '30px',
  position: 'absolute' as const,
  left: '50%',
  top: '58%',
  transform: 'translateX(-50%) translateY(-50%)',
};
