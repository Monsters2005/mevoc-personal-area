import React, { createContext, useContext } from 'react';
import { Callback } from 'yup/lib/types';
import { List } from '../@types/entities/List';

type ActiveLists = {
  currentLists: List[] | [];
  setCurrentLists: any;
  // (item: List[] | []) => void
};

const defaultState: ActiveLists = {
  currentLists: [],
  setCurrentLists: () => [],
};

export const ActiveListsContext = createContext(defaultState);

export const useActiveLists = () => useContext(ActiveListsContext);
