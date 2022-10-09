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

export const learningBtn = {
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '24px',
  color: 'rgba(196, 195, 202, 0.7)',
  textTransform: 'capitalize' as const,
  padding: '2px 10px',
  height: '42px',
};

export const startBtn = {
  padding: '11px 25px',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '27px',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center' as const,
  letterSpacing: '1px',
  textTransform: 'uppercase' as const,
  alignSelf: 'flex-end',
  position: 'absolute' as const,
  right: '50px',
  bottom: '80px',
};

export const settingsActionBtn = {
  fontWeight: '700',
  fontSize: '15px',
  lineHeight: '19px',
  padding: '10px 16px',
};

export const settingsCancelBtn = {
  fontWeight: '700',
  fontSize: '15px',
  lineHeight: '19px',
  padding: '10px 20px',
};
