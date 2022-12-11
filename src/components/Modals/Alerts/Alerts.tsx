import React from 'react';
import languages from '../../../assets/images/languages.png';
import { LSKeys } from '../../../constants/LSKeys';
import { useModal } from '../../../context/ModalContext';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import ConfirmationAlert from '../../../layouts/ConfirmationAlert/ConfirmationAlert';
import { UISvgSelector } from '../../UI/UISvgSelector';
import { ModalWrapper } from '../Wrapper/ModalWrapper';

export function LanguageConfirmationAlert({
  onConfirm,
  onDontShow,
}: {
  onConfirm: () => void;
  onDontShow: () => void;
}) {
  const { setCurrentModal } = useModal();
  return (
    <ModalWrapper>
      <ConfirmationAlert
        icon={<img src={languages} alt="languages" />}
        onClose={() => setCurrentModal(null)}
        onDontShow={onDontShow}
        text="Would you like to change the application language to your native?"
        title="Your native language is supported"
        onConfirm={() => {
          onConfirm();
          setCurrentModal(null);
        }}
      />
    </ModalWrapper>
  );
}
