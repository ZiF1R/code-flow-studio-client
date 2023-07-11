import React, { createContext, useState } from 'react';
import {ComponentBaseProps, Theme} from "utils/types/global.types";

const ThemeContext = createContext({
  theme: Theme.dark,
  toggleTheme: () => {},
});

const ThemeProvider: React.FC<ComponentBaseProps> = ({ children }) => {
  const [theme, setTheme] = useState(Theme.dark);
  const [body] = useState(document.body);
  body.setAttribute("data-theme", theme);

  const toggleTheme = () => {
    if (theme === Theme.light) {
      setTheme(Theme.dark);
    } else {
      setTheme(Theme.light);
    }
    body.setAttribute("data-theme", theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
