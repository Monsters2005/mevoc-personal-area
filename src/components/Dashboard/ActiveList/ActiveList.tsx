import React, { useState } from 'react';
import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import s from './ActiveList.module.scss';
import { pluralizeString } from '../../../utils/components/pluralizeString';
import { List } from '../../../@types/entities/List';
import { useGetWordsByListIdQuery } from '../../../store/api/wordApi';
import { useActiveLists } from '../../../context/ActiveLists';

type Props = {
  item: List;
  index: number;
};

export function DashboardActiveList({ item, index }: Props) {
  const [selected, setSelected] = useState(false);
  const { data: listWords } = useGetWordsByListIdQuery(item?.id || 0);

  const { currentLists, setCurrentLists } = useActiveLists();

  function selectList() {
    setSelected(state => !state);
    if (selected) setCurrentLists(currentLists.filter(el => el.id !== item.id));
    if (!selected) setCurrentLists([...currentLists, item]);
    // TODO: pass the funciton here which actully selects a specific list
  }
  return (
    <Draggable draggableId={item.id.toString()} index={index}>
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
            <p>{pluralizeString(listWords?.length || 0)}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
}
