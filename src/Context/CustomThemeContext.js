import React, {useContext, createContext, useState, useEffect} from 'react';
import { getItem, setItem } from '../Utils/AsyncStorage';

const CustomThemeContext = createContext();

export const CustomThemeProvider = ({children}) => {
  const [isDark, setIsDark] = useState(null);

  useEffect(() => {
    // Get the shopping lists from storage 
    const storage = async () => {
      // Get or set the item
      if(isDark === null) {
        const res = await getItem('isDark');
        setIsDark(res);
      } else {
        await setItem('isDark', isDark);
      }
    }

    storage();

  }, [isDark])

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