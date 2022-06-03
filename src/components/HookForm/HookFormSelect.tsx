import React, { SetStateAction, useState } from 'react';
import { Dropdown } from '../UI/DropDown/Dropdown';
import { Option } from '../UI/DropDown/types';

type Props = {
  options: Option[];
  defaultSelected: Option;
  label: string;
};

const dropdownStyles = {
  width: '300px',
  height: '50px',
  background: '#1F2029',
};

export default function HookFormSelect({
  options,
  defaultSelected,
  label,
}: Props) {
  const [selectedItem, setSelectedItem] = useState<Option | null>(defaultSelected);

  return (
    <div>
      <Dropdown
        options={options}
        setSelectedItem={(item: Option | null) => setSelectedItem(item)}
        selectedItem={selectedItem}
        allowNoneSelected={false}
        label={label}
        styles={dropdownStyles}
      />
    </div>
  );
}
