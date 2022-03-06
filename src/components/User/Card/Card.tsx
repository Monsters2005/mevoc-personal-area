import React from 'react';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import { getMediaLink } from '../../../utils/getMediaLink';
import { LanguageField } from '../LanguageField/LanguageField';
import s from './Card.module.scss';

type Props = {
  userData: {
    firstName: string;
    lastName: string;
    avatar: string;
    location: string;
    langNative: string;
    langLearning: string;
  };
};

export function UserCard({ userData }: Props) {
  return (
    <div className={s.usercard_container}>
      <div className={s.usercard_avatar}>
        <img src={getMediaLink(userData.avatar)} alt={userData.avatar} />
      </div>
      <div className={s.usercard_info}>
        <h4>{`${userData.firstName} ${userData.lastName}`}</h4>
        <p>
          <GlobalSvgSelector id="location" />
          {userData.location}
        </p>

        <LanguageField
          label="Native Language"
          language={userData.langNative}
        />
        <LanguageField
          label="Currently Learning"
          language={userData.langLearning}
        />
      </div>
    </div>
  );
}
