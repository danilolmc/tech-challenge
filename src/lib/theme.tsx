import {useEffect, useState} from "react";

export const useTheme = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const theme = localStorage.getItem('theme');

        if (theme === 'dark') {
            setIsDark(true);
            document.documentElement.classList.add('dark');
            return;
        } else {


        setIsDark(false);
        document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggle = () => {
        setIsDark(!isDark);
        if (!isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }

    return {
        toggle,
        isDark
    }
}