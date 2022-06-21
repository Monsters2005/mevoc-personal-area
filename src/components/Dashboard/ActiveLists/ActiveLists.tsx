import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { CardLayout } from '../../../layouts/CardLayout/CardLayout';
import { Button } from '../../UI/Button/Button';
import { DashboardActiveList } from '../ActiveList/ActiveList';
import s from './ActiveLists.module.scss';
import { reorderArray } from '../../../utils/reorderArray';
import { List } from '../../../@types/entities/List';

type Props = {
  onAddList: () => void;
  lists: List[];
};

export function DashboardActiveLists({ onAddList, lists }: Props) {
  const [items, setItems] = React.useState(lists);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    const newItems = reorderArray(items, source.index, destination.index);
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CardLayout title="Active Lists">
        <Button
          type="primary"
          onClick={() => onAddList()}
          styles={{
            fontWeight: '700',
            fontSize: '13px',
            lineHeight: '19px',
            padding: '10px 16px',
            width: '65px',
            height: '30px',
            position: 'absolute',
            right: '25px',
            top: '18px',
          }}
        >
          Add
        </Button>
        <Droppable droppableId="droppable-list">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <DashboardActiveList item={item} index={index} key={item.id} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </CardLayout>
    </DragDropContext>
  );
}
