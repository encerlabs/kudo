import React, { useContext, useEffect, useState } from 'react';
import { TodoContext, ThemeContext } from '../context';
import '../styles/App.css';
import { ThemeButton, Input } from '../components';

export default function App(props) {
  const [mode, setMode] = useState('dark');
  const [list, setList] = useState([]);
  const [inputText, setInputText] = useState('');

  const themeToggleHandler = () => setMode(mode === 'light' ? 'dark' : 'light');
  const inputChangeHandler = (e) => setInputText(e.target.value);

  const enterPressedHandler = (e) => {
    if (e.charCode === 13 && inputText)
      setList((prev) => {
        return [...prev, inputText];
      });
  };

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
                <Input onChange={inputChangeHandler} onKeyPress={enterPressedHandler} value={inputText} />
              </div>
              <div>
                {list.map((r, i) => (
                  <div key={i}>{r}</div>
                ))}
              </div>
            </main>
          </TodoContext.Provider>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
