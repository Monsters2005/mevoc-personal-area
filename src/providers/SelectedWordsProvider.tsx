import React, { ReactNode, useMemo, useState } from 'react';
import { Word } from '../@types/entities/Word';
import {
  SelectedWordsContext,
  useSelectedWords,
} from '../context/SelectedWords';

type Props = {
  children: ReactNode;
};

export default function SelectedWordsProvider({ children }: Props) {
  const { selectedWords: data } = useSelectedWords();

  const [selectedWords, setLists] = useState<Word[] | []>(data);

  const setSelectedWords = (items: Word[] | []) => {
    setLists(items);
  };

  const stateMemo = useMemo(
    () => ({ selectedWords, setSelectedWords }),
    [selectedWords]
  );

  return (
    <SelectedWordsContext.Provider value={stateMemo}>
      {children}
    </SelectedWordsContext.Provider>
  );
}
