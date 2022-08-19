import React, { useContext, useEffect, useState } from 'react';
import { TodoContext, ThemeContext } from '../context';
import '../styles/App.css';
import { ThemeButton, Input } from '../components';
import { BiTrash } from 'react-icons/bi';
import classNames from 'classnames';

export default function App(props) {
  const [mode, setMode] = useState('dark');
  const [list, setList] = useState([]);
  const [inputText, setInputText] = useState('');

  const themeToggleHandler = () => setMode(mode === 'light' ? 'dark' : 'light');
  const inputChangeHandler = (e) => setInputText(e.target.value);

  const enterPressedHandler = (e) => {
    if (e.charCode === 13 && inputText)
      setList((prev) => [
        ...prev,
        {
          id: !prev.at(-1) ? 0 : prev.at(-1).id + 1,
          text: inputText,
          done: false,
        },
      ]);
  };

  const todoDeleteHandler = (todoId) => {
    setList((prev) => {
      const targetIndexPosition = prev.findIndex((todo) => todo.id === todoId);
      prev.splice(targetIndexPosition, 1);
      return [...prev];
    });
  };

  const statusToggleHandler = (todoId) => {
    setList(prev => {
      const targetIndexPosition = prev.findIndex((todo) => todo.id === todoId);
      prev[targetIndexPosition]['done'] = !prev[targetIndexPosition]['done']
      return [...prev];
    });
  }

  useEffect(() => {
    setInputText('');
  }, [list]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <div role={`theme-${mode}`} className="_parent">
        <div aria-label="Todo Container" className="_container">
          <header aria-label="Todo Header" className="_header">
            <a href="#" aria-label="Todo App Name" className="_brand">
              🦄 Kudo <small>(空道)</small>
            </a>
            <ThemeButton onClick={themeToggleHandler} />
          </header>
          <TodoContext.Provider value={{ list, setList }}>
            <main>
              <div aria-label="Todo Input" className="_input_section">
                <small>What you want to do?</small>
                <Input type="text" onChange={inputChangeHandler} onKeyPress={enterPressedHandler} value={inputText} />
              </div>
              <div>
                {list.map((todo, i) => (
                  <div className="_todo_container" key={i}>
                    <div>
                      <p onClick={() => statusToggleHandler(todo.id)} className={classNames('_todo_text', {'_todo_text_done': todo.done})}>{todo.text}</p>
                    </div>
                    <span className="_todo_delete_btn" onClick={() => todoDeleteHandler(todo.id)}>
                      <BiTrash />
                    </span>
                  </div>
                ))}
              </div>
            </main>
          </TodoContext.Provider>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
