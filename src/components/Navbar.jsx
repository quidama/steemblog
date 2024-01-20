import React from 'react';
import Link from 'next/link';
import classNames from '@/services/classNames';

export default function Navbar({ navigation, selected, onClick }) {
  return (
    <>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={`/blogs/${item.tag}`}
          className={classNames(
            item.name === selected
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'rounded-md px-3 py-2 text-sm font-medium'
          )}
          aria-current={item.current ? 'page' : undefined}
          onClick={() => onClick(item.name)}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
}
