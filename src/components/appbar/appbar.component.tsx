import { useContext } from 'react';
import './appbar.style.scss';
import ThemeContext from '../../lib/context/themeProvider';

const Appbar:React.FC = function(){
    const {mode:themeMode} = useContext(ThemeContext);

    return <header id='main-app-bar' className={`${themeMode}`}>
        header
    </header>
}

export default Appbar;