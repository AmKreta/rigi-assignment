import { useEffect, useState } from 'react';
import './App.css';
import Feed from './page/feed/feed.component';
import { fetchUsers } from './store/users/users.store';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './store/posts/posts';
import { ThemeMode } from '@lib/enum/theme.enum';
import ThemeContext from '@lib/context/themeProvider';

function App() {
  const [ActiveTheme, setActiveTheme] = useState<ThemeMode>(ThemeMode.SYSTEM);

  const dispatch = useDispatch();

  useEffect(function(){
   dispatch(fetchUsers() as any);
   dispatch(fetchPosts() as any);
  },[]);

  return (
    <ThemeContext.Provider value={{mode:ActiveTheme, changeMode:setActiveTheme}}>
      <Feed />
    </ThemeContext.Provider>
  );
}

export default App;
