import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import { useLocation } from 'react-router';
import s from './ActiveList.module.scss';
import { List } from '../../../@types/entities/List';
import { useGetWordsByListIdQuery } from '../../../store/api/wordApi';
import { useActiveLists } from '../../../context/ActiveLists';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import common from '../../UI/Common.i18n.json';

type Props = {
  item: List;
  index: number;
};

export function DashboardActiveList({ item, index }: Props) {
  const { pathname } = useLocation();
  const { currentLists, setCurrentLists } = useActiveLists();
  const [selected, setSelected] = useState(false);
  const { data: listWords } = useGetWordsByListIdQuery(item?.id || 0);
  const { t } = useLocalTranslation(common);

  function selectList() {
    setSelected(state => !state);
    if (selected) setCurrentLists((state: List[] | []) => state.filter(el => el.id !== item.id));
    if (!selected) setCurrentLists((state: List[] | []) => [...state, item]);
  }

  useEffect(() => {
    setSelected(!!currentLists.find((el: List) => el.id === item.id));
  }, [pathname, currentLists]);

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
            <p>
              {`${listWords?.length || 0} ${t(
                `word${(listWords?.length || 0) !== 1 ? 's' : ''}`
              )}`}
            </p>
          </div>
        </div>
      )}
    </Draggable>
  );
}
