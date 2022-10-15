import React, { createContext, useContext } from 'react';
import { List } from '../@types/entities/List';

type ActiveLists = {
  currentLists: List[] | [];
  setCurrentLists: any;
  //! remove any for fucks sake
};

const defaultState: ActiveLists = {
  currentLists: [],
  setCurrentLists: () => [],
};

export const ActiveListsContext = createContext(defaultState);

export const useActiveLists = () => useContext(ActiveListsContext);
