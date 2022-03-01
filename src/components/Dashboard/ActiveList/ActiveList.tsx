import React, { useState } from 'react';
import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import s from './ActiveList.module.scss';
import { List } from '../ActiveLists/types';
import { getWordsCount } from '../../../utils/getWordsCount';

type Props = {
  item: List;
  index: number;
};

export function ActiveList({ item, index }: Props) {
  const [selected, setSelected] = useState(false);

  function selectList() {
    setSelected(!selected);
    // TODO: pass the funciton here which actully selects a specific list
  }

  return (
    <Draggable draggableId={item.key} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classNames(s.activelist_container, {
            [s.activelist_selected]: selected,
            [s.activelist_dragging]: snapshot.isDragging,
          })}
        >
          <button
            className={classNames(s.activelist_checkbox, {
              [s.activelist_checkbox_selected]: selected,
            })}
            onClick={selectList}
          >
            <span />
          </button>
          <div className={s.activelist_content}>
            <h4 className={s.activvelist_title}>{item.name}</h4>
            <p>{getWordsCount(item.words.length)}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
}
