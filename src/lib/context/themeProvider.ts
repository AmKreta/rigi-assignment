import { ThemeMode } from "../enum/theme.enum"
import React from "react"

export interface Theme{
    mode: ThemeMode,
    changeMode: (value:ThemeMode)=>void
}

const ThemeContext = React.createContext<Theme>({
    mode: ThemeMode.SYSTEM,
    changeMode : ()=>{}
});

export default ThemeContext;