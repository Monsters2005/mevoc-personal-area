import React from 'react';
import { Button } from './components/UI/Button/Button';
import { Dropdown } from './components/UI/DropDown/Dropdown';

function App() {
  const obj = {
    value: 'Option',
    details: 'details',
    key: 1456,
  };

  const options = [
    {
      value: 'Option',
      details: 'details',
      key: 1456,
    },
    {
      value: 'Option2',
      details: 'details',
      key: 7566,
    },
    {
      value: 'Option3',
      details: 'details',
      key: 9384,
    },
    {
      value: 'Option4',
      details: 'details',
      key: 3457,
    },
  ];

  return (
    <div className="App">
      <Dropdown
        options={options}
        defaultSelected={obj}
        listTitle="Languages"
        allowNoneSelected={false}
        side="right"
      />
    </div>
  );
}

export default App;
