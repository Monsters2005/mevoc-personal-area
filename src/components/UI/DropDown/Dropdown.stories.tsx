import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Dropdown } from './Dropdown';

export default {
  title: 'Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = function (args) {
  return <Dropdown {...args} />;
};

export const DropdownExample = Template.bind({});

const options = [
  {
    value: 'Option',
    details: 'details',
    key: 1456,
  },
  {
    value: 'Option',
    details: 'details',
    key: 7566,
  },
  {
    value: 'Option',
    details: 'details',
    key: 9384,
  },
  {
    value: 'Option',
    details: 'details',
    key: 3457,
  },
];

const obj = {
  value: 'Option',
  details: 'details',
  key: 1456,
};

DropdownExample.args = {
  options,
  defaultSelected: obj,
  listTitle: 'Options',
  allowNoneSelected: true,
  side: 'right',
  //   onClick: active => {
  //     console.log(active);
  //   },
};
