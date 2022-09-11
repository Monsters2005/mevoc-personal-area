import React, { createContext, useContext } from 'react';
import { List } from '../@types/entities/List';

type ActiveLists = {
  currentLists: List[] | [];
  setCurrentLists: (item: List[] | []) => void;
};

const defaultState: ActiveLists = {
  currentLists: [],
  setCurrentLists: () => null,
};

export const ActiveListsContext = createContext(defaultState);

export const useActiveLists = () => useContext(ActiveListsContext);
