import React from 'react';
import france from './france.png';
import uk from './uk.png';
import spain from './spain.png';
import germany from './germany.png';
import russia from './russia.png';
import sweden from './sweden.png';

type Props = {
  id: string;
};

export function FlagSvgSelector({ id }: Props) {
  switch (id) {
    case 'france-flag':
      return (
        <div>
          <img src={france} alt="france-flag" />
        </div>
      );
    case 'uk-flag':
      return (
        <div>
          <img src={uk} alt="uk-flag" />
        </div>
      );

    case 'germany-flag':
      return (
        <div>
          <img src={germany} alt="germany-flag" />
        </div>
      );
    case 'spain-flag':
      return (
        <div>
          <img src={spain} alt="spain-flag" />
        </div>
      );
    case 'russia-flag':
      return (
        <div>
          <img src={russia} alt="russia-flag" />
        </div>
      );
    case 'sweden-flag':
      return (
        <div>
          <img src={sweden} alt="sweden-flag" />
        </div>
      );

    default:
      return <p />;
  }
}
