import { useContext, useState } from 'react';
import './appbar.style.scss';
import ThemeContext from '../../lib/context/themeProvider';
import Input from '../../components/input/input.component';
import { MdOutlineSearch } from "react-icons/md";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { ThemeMode } from '../../lib/enum/theme.enum';


const Appbar:React.FC = function(){
    const {mode:themeMode, changeMode:changeThemeMode} = useContext(ThemeContext);

    const [search, setSearch] = useState('');

    return <header id='main-app-bar' className={`${themeMode}`}>
        {
            themeMode === ThemeMode.DARK
                ?  <FaSun className='icon' color='var(--text1)' onClick={()=>changeThemeMode(ThemeMode.LIGHT)} />
                :  <FaMoon className='icon' color='var(--text1)' onClick={()=>changeThemeMode(ThemeMode.DARK)} />
        }
       <Input value={search} onChange={setSearch} StartIcon={MdOutlineSearch}/>
    </header>
}

export default Appbar;