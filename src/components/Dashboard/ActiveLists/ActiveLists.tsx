import React from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { CardLayout } from '../../../layouts/CardLayout/CardLayout';
import { lists } from '../../../mocks/lists';
import { Button } from '../../UI/Button/Button';
import { ActiveList } from '../ActiveList/ActiveList';
import s from './ActiveLists.module.scss';
import { reorder } from '../../../utils/reorder';

export function DashboardActiveLists() {
  const [items, setItems] = React.useState(lists);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    const newItems = reorder(items, source.index, destination.index);
    setItems(newItems);
  };

  return (
    <CardLayout title="Active Lists">
      <Button
        type="primary"
        onClick={() => console.log('added')}
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

      <div className={s.activelists_container}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-list">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((item, index) => (
                  <ActiveList item={item} index={index} key={item.key} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </CardLayout>
  );
}
