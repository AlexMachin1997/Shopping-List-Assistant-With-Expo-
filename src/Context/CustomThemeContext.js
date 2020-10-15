import React, {useContext, createContext, useState} from 'react';

const CustomThemeContext = createContext();

export const CustomThemeProvider = ({children}) => {
  const [isDark, setIsDark] = useState(false);

  return (
    <CustomThemeContext.Provider value={[isDark, setIsDark]}>
      {children}
    </CustomThemeContext.Provider>
  )
};

export const useCustomThemeProvider = () => {
  const context = useContext(CustomThemeContext);

  if(!context) throw Error('useCustomThemeProvider requires a ThemeProvider');

  return context;
}