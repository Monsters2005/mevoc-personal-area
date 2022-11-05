import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { merge } from 'lodash';
import { CardLayout } from '../../../layouts/CardLayout/CardLayout';
import { Button } from '../../UI/Button/Button';
import { DashboardActiveList } from '../ActiveList/ActiveList';
import s from './ActiveLists.module.scss';
import { reorderArray } from '../../../utils/common/reorderArray';
import { List } from '../../../@types/entities/List';
import {
  primarySmallLists,
  primarySmallNoLists,
} from '../../../shared/styles/button-variations';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import translations from '../Dashboard.i18n.json';
import common from '../../UI/Common.i18n.json';

type Props = {
  onAddList: () => void;
  lists: List[] | null | undefined;
};

export function DashboardActiveLists({ onAddList, lists }: Props) {
  const [items, setItems] = useState<List[] | null>(null);

  useEffect(() => {
    if (lists) setItems(lists);
  }, [lists]);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    const newItems = (items && reorderArray(items, source.index, destination.index)) || [];
    setItems(newItems);
  };

  const { t } = useLocalTranslation(merge(translations, common));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CardLayout title={t('activeLists')}>
        <Button
          type="primary"
          onClick={() => onAddList()}
          styles={items ? primarySmallLists : primarySmallNoLists}
        >
          {t('add')}
        </Button>
        <div className={s.activelists_container}>
          {items?.length ? (
            <Droppable droppableId="droppable-list">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {items?.map((item, index) => (
                    <DashboardActiveList
                      item={item}
                      index={index}
                      key={item.id}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ) : (
            <div className={s.activelists_none}>
              <p>{t('noLists')}</p>
            </div>
          )}
        </div>
      </CardLayout>
    </DragDropContext>
  );
}
