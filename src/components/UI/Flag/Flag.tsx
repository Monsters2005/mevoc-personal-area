import React, { ReactNode } from 'react';

export function Flag({ name }: { name: string }) {
  return (
    <img
      src={`/images/flags/${name.toLowerCase()}.jpg`}
      alt={`${name} flag`}
    />
  );
}
