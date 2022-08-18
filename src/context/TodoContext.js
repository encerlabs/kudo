import { createContext } from 'react';

const TodoContext = createContext({
  list: [],
  setList: () => {},
});

export default TodoContext;
