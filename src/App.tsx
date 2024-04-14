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
  const [ActiveTheme, setActiveTheme] = useState<ThemeMode>(ThemeMode.SYSTEM);

  const dispatch = useDispatch();

  useEffect(function(){
   dispatch(fetchUsers() as any);
   dispatch(fetchPosts() as any);
  },[dispatch]);

  return (
    <ThemeContext.Provider value={{mode:ActiveTheme, changeMode:setActiveTheme}}>
      <Appbar />
      <Outlet />
    </ThemeContext.Provider>
  );
}

export default App;
