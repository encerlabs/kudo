import React, { useContext } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { ThemeContext } from '../context';

export default function ThemeButton(props) {
  const { onClick } = props;
  const theme = useContext(ThemeContext);
  return (
    <i onClick={onClick} className="_themeBtn">
      {theme.mode === 'light' ? <FiMoon /> : <FiSun />}
    </i>
  );
}
