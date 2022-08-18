import { createContext } from 'react';

const ThemeContext = createContext({
  mode: 'light',
  setMode: () => {},
});

export default ThemeContext;
