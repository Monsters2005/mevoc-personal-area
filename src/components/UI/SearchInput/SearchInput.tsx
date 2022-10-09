import classNames from 'classnames';
import React, {
  ChangeEvent, CSSProperties, useEffect, useState,
} from 'react';
import { GlobalSvgSelector } from '../../../shared/GlobalSvgSelector';
import s from './SearchInput.module.scss';

type Props<T> = {
  items: T[];
  setItems: (items: T[]) => void;
  size: 'large' | 'medium' | 'small';
  styles?: CSSProperties;
  placeholder: string;
};

export default function SearchInput<T extends string>({
  items,
  setItems,
  size,
  styles,
  placeholder,
}: Props<T>) {
  const [value, setValue] = useState<null | string>(null);

  const handleOnChange = (item: ChangeEvent<HTMLInputElement>) => {
    setValue(item.target.value);
  };

  useEffect(() => {
    const copyArr = JSON.parse(JSON.stringify(items));
    const newArr = copyArr.filter((item: T) => item.toLowerCase().includes(value || ''));
    setItems(newArr);
  }, [value]);

  return (
    <div
      className={classNames(s.searchinput_container, s[`searchinput${size}`])}
      style={styles}
    >
      <input
        name="searchinput"
        onChange={handleOnChange}
        placeholder={placeholder}
      />
      <span className={s.searchinput_icon}>
        <GlobalSvgSelector id="search" />
      </span>
      {/* <div className={s.searchinput_list}>
        {results ? (
          results.map((item: T) => {
            return <div className={s.searchinput_list_item}> {item} </div>;
          })
        ) : (
          <p>Nothing found</p>
        )}
      </div> */}
    </div>
  );
}
