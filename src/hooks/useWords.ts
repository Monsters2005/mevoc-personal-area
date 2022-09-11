import React, { useState } from 'react';
import { List } from '../@types/entities/List';

type Props = {
  items: List[];
};

export default function useWords({ items }: Props) {
  const [words, setWords] = useState([]);
}
