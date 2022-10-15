import React, { createContext, useContext } from 'react';
import { Word } from '../@types/entities/Word';

type SelectedWords = {
  selectedWords: Word[] | [];
  setSelectedWords: any;
  //! remove any for fucks sake
};

const defaultState: SelectedWords = {
  selectedWords: [],
  setSelectedWords: () => [],
};

export const SelectedWordsContext = createContext(defaultState);

export const useSelectedWords = () => useContext(SelectedWordsContext);
