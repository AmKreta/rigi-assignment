import { useContext, useState } from 'react';
import './appbar.style.scss';
import ThemeContext from '../../lib/context/themeProvider';
import Input from '../../components/input/input.component';
import { MdOutlineSearch } from "react-icons/md";

const Appbar:React.FC = function(){
    const {mode:themeMode} = useContext(ThemeContext);

    const [search, setSearch] = useState('');

    return <header id='main-app-bar' className={`${themeMode}`}>
       <Input value={search} onChange={setSearch} StartIcon={MdOutlineSearch}/>
    </header>
}

export default Appbar;