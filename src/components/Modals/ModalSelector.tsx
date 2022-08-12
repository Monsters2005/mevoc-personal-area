import React, { useContext, useEffect, useState } from 'react';
import { AddListDto } from '../../@types/dto/list/add.dto';
import { ModalContext, useModal } from '../../context/ModalContext';
import { useCreateListMutation } from '../../store/api/listApi';
import AddListModal from './ListsManagement/AddList';
import AddWordModal from './WordManagement/AddWord';
import EditWordModal from './WordManagement/EditWord';

export default function Modals() {
  const { states } = useContext(ModalContext);
  const [opened, setOpened] = useState<string | null>(null);

  useEffect(() => {
    function getActiveState() {
      const [prop] = Object.keys(states).filter(k => states[k]);
      if (prop) setOpened(prop);
      else setOpened(null);
    }
    getActiveState();
  }, [states]);

  const [createList] = useCreateListMutation();

  const handleList = (data: AddListDto) => {
    console.log('ok');
    createList({ name: data.listTitle, learningLang: 'en' });
  };

  switch (opened) {
    case 'addWord':
      return <AddWordModal onAddWord={() => console.log} />;
    case 'editWord':
      return (
        <EditWordModal
          onEditWord={() => console.log}
          wordNative=""
          wordLearning=""
        />
      );
    case 'addList':
      return (
        <AddListModal onAddList={(data: AddListDto) => handleList(data)} />
      );

    default:
      return null;
  }
}
