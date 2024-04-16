import { useEffect, useState } from 'react';
import './App.scss';
import { fetchUsers } from './store/users/users.store';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './store/posts/posts';
import { ThemeMode } from './lib/enum/theme.enum';
import ThemeContext from './lib/context/themeProvider';
import Appbar from './components/appbar/appbar.component';
import { Outlet } from 'react-router-dom';

function App() {
  const [activeTheme, setActiveTheme] = useState<ThemeMode>(ThemeMode.SYSTEM);

  const dispatch = useDispatch();

  useEffect(function(){
    dispatch(fetchUsers() as any);
    dispatch(fetchPosts() as any);
  },[dispatch]);

  useEffect(function(){
   if(activeTheme === ThemeMode.SYSTEM){
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setActiveTheme(ThemeMode.DARK);
      } else {
       setActiveTheme(ThemeMode.LIGHT);
      }
   }

  },[activeTheme]);

  if(activeTheme === ThemeMode.SYSTEM){
    //preventing initial creation of nodes and then changing theme
    return null;
  }

  return (
    <ThemeContext.Provider value={{mode:activeTheme, changeMode:setActiveTheme}}>
      <Appbar />
      <Outlet />
    </ThemeContext.Provider>
  );
}

export default App;
