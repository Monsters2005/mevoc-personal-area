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

export const primaryModal = {
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '13px',
  lineHeight: '20px',
  letterSpacing: '1px',
  width: 'fit-content',
  height: '36px',
  padding: '2px 15px',
  color: '#1F2029',
};

export const smallModal = {
  width: '50px',
};

export const btnInputSettings = {
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '20px',
  fontSize: '16px',
  padding: '5px 10px',
  marginRight: '20px',
};
