import { createContext, useState, useContext } from "react";

const ThemeContext = createContext({
  theme: 'Claro',
  toggleTheme: () => {},
});

// 3. Proveedor del contexto
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('Claro');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'Claro' ? 'Oscuro' : 'Claro');
    console.log(`Theme changed to: ${theme === 'Claro' ? 'Oscuro' : 'Claro'}`);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`app ${theme}-theme`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};