import React from 'react';
import { FlagSvgSelector } from '../assets/images/flags/FlagsSelector';

// const base = [
//   { lang: 'English', coun: 'uk' },
//   { lang: 'German', coun: 'germany' },
//   { lang: 'Russian', coun: 'russia' },
//   { lang: 'Spanish', coun: 'france' },
//   { lang: 'French', coun: 'spain' },
//   { lang: 'Swedish', coun: 'uk' },
// ];

// export const languages = base.map((el, i) => ({
//   value: el.lang,
//   id: ++i,
//   icon: <FlagSvgSelector id={`${el.coun}-flag`} />,
// }));

export const languages = [
  {
    value: 'English',
    id: 1,
    icon: <FlagSvgSelector id="uk-flag" />,
  },
  {
    value: 'German',
    id: 2,
    icon: <FlagSvgSelector id="germany-flag" />,
  },
  {
    value: 'Russian',
    id: 3,
    icon: <FlagSvgSelector id="russia-flag" />,
  },
  {
    value: 'French',
    id: 4,
    icon: <FlagSvgSelector id="france-flag" />,
  },
  {
    value: 'Spanish',
    id: 5,
    icon: <FlagSvgSelector id="spain-flag" />,
  },
  {
    value: 'Swedish',
    id: 6,
    icon: <FlagSvgSelector id="sweden-flag" />,
  },
];
