import React from 'react';
import { CardLayout } from '../../../layouts/CardLayout/CardLayout';
import { lists } from '../../../mocks/lists';
import { Button } from '../../UI/Button/Button';
import { ActiveList } from '../ActiveList/ActiveList';
import s from './ActiveLists.module.scss';

export function DashboardActiveLists() {
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
          top: '20px',
        }}
      >
        Add
      </Button>
      <div className={s.activelists_container}>
        {lists.map(item => (
          <ActiveList item={item} />
        ))}
      </div>
      ;
    </CardLayout>
  );
}
