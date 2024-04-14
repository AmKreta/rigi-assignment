import ThemeContext from "@lib/context/themeProvider";
import { ThemeMode } from "@lib/enum/theme.enum";
import { useContext, useEffect, useState } from "react";

export default function useThemeBasedClassName(){
    const currentTheme = useContext(ThemeContext);
    const [useThemeBasedClassName, setThemeBasedClassName] = useState<ThemeMode>(ThemeMode.SYSTEM);
    
    useEffect(function(){
        setThemeBasedClassName(currentTheme.mode);    
    },[currentTheme.mode]);

    return useThemeBasedClassName;
}