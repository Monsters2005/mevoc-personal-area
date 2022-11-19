import React from 'react';
import { merge } from 'lodash';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import { getMediaLink } from '../../../utils/components/getMediaLink';
import { LanguageField } from '../LanguageField/LanguageField';
import s from './Card.module.scss';
import defaultAvatar from '../../../assets/images/defaultAvatar.png';
import { User } from '../../../@types/entities/User';
import FallbackImgSelector from '../../../assets/FallbackImgSelector';
import usertr from '../../../pages/UserProfile/UserProfile.i18n.json';
import common from '../../UI/Common.i18n.json';
import languages from '../../UI/Languages.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';

type Props = {
  userData: Partial<User>;
};

export function UserCard({
  userData: {
    firstName,
    lastName,
    avatar,
    location,
    learningLang,
    nativeLang,
  },
}: Props) {
  const avatarUrl = avatar && getMediaLink(avatar);
  const { t } = useLocalTranslation(merge(usertr, common, languages));

  return (
    <div className={s.usercard_container}>
      <div className={s.usercard_avatar}>
        {avatarUrl ? (
          <img src={avatarUrl} alt={`${firstName} profile`} />
        ) : (
          <FallbackImgSelector id="user-avatar" />
        )}
      </div>
      <div className={s.usercard_info}>
        <h4>{`${firstName} ${lastName || ''}`}</h4>
        <p>
          <GlobalSvgSelector id="location" />
          {location || t('hidden')}
        </p>

        <LanguageField
          label={t('nativeLang')}
          language={nativeLang || 'English'}
          value={t(nativeLang?.toLowerCase() || 'English')}
        />
        <LanguageField
          label={t('currentlyLearning')}
          language={learningLang || 'English'}
          value={t(learningLang?.toLowerCase() || 'English')}
        />
      </div>
    </div>
  );
}
