import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { CardLayout } from '../../../layouts/CardLayout/CardLayout';
import { Button } from '../../UI/Button/Button';
import { DashboardActiveList } from '../ActiveList/ActiveList';
import s from './ActiveLists.module.scss';
import { reorderArray } from '../../../utils/reorderArray';
import { List } from '../../../@types/entities/List';
import {
  primarySmallLists,
  primarySmallNoLists,
} from '../../../shared/styles/button-variations';

type Props = {
  onAddList: () => void;
  lists: List[] | null | undefined;
};

export function DashboardActiveLists({ onAddList, lists }: Props) {
  const [items, setItems] = useState(lists);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    const newItems = items && reorderArray(items, source.index, destination.index);
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CardLayout title="Active Lists">
        <Button
          type="primary"
          onClick={() => onAddList()}
          styles={items ? primarySmallLists : primarySmallNoLists}
        >
          Add
        </Button>
        <div className={s.activelists_container}>
          {items ? (
            <Droppable droppableId="droppable-list">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {items.map((item, index) => (
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
              <p>You don’t have any added lists at the moment.</p>
            </div>
          )}
        </div>
      </CardLayout>
    </DragDropContext>
  );
}
