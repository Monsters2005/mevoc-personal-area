import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = function (args) {
  return <Button {...args} />;
};

export const ButtonExample = Template.bind({});

ButtonExample.args = {
  type: 'primary',
  children: <p>ok</p>,
};
