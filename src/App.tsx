import { useEffect } from 'react';
import './App.css';
import Feed from './page/feed/feed.component';
import { fetchUsers } from './store/users/users.store';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(function(){
   dispatch(fetchUsers() as any);
  },[]);

  return (
    <Feed />
  );
}

export default App;
