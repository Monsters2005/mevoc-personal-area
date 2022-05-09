import React, { useState } from 'react';
import { Calendar } from './components/User/Calendar/Calendar';
import { Dates } from './components/User/Calendar/types';

export type Tab = {
  key: string;
  value: string;
};

function App() {
  const s = new Date();

  const [dates, setDates] = useState<Dates>({
    startDate: new Date(s.getTime() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  });

  const [graphDates, setGraphDates] = useState<Dates>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const tabs: Tab[] = [
    {
      key: 'week',
      value: 'Week',
    },
    {
      key: 'month',
      value: 'Month',
    },
    {
      key: 'year',
      value: 'Year',
    },
  ];
  const [activeTab, setActiveTab] = useState<string>(tabs[0].key);

  return (
    <div className="App">
      <Calendar
        setActiveTab={setActiveTab}
        setGraphDates={setGraphDates}
        startDate={dates.startDate}
        endDate={dates.endDate}
      />
    </div>
  );
}

export default App;
