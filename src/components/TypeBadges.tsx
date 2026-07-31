import React from 'react';
import TypeBadge from './TypeBadge';

interface Props {
  types: string[];
}

function TypeBadges({ types }: Props) {
  return (
    <div className='flex gap-3 flex-wrap mt-2'>
      {types.map((t) => (
        <TypeBadge key={t} type={t} />
      ))}
    </div>
  );
}

export default TypeBadges;
