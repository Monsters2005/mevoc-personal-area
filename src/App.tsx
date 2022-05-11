import moment, { Moment } from 'moment';
import React, { useState } from 'react';
import { SettingsInputGroup } from './components/Settings/EditProfileForm/InputGroup/InputGroup';
import DatePicker from './components/UI/DatePicker/DatePicker';
import { user } from './mocks/user';

function App() {
  type Date = Moment | null;

  const [date, setDate] = useState<Date>(moment());

  const setDateHandler = (d: Date) => {
    setDate(d);
  };

  return (
    <div className="App">
      <SettingsInputGroup
        user={user}
        onSave={() => console.log('ssa')}
        onVerifyEmail={(email: string) => console.log(email)}
      />
      {/* <DatePicker defaultDate={date} setDate={setDateHandler} /> */}
      {/* <HookFormDatePicker /> */}
    </div>
  );
}

export default App;
