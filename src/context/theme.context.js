import { createContext, useState } from "react"

const ThemeContext = createContext()

function ThemeProviderWrapper(props) {

    const [theme, setTheme] = useState('green')

    const toggleTheme = () => {
        if (theme === 'orange') {
            setTheme('green');
        } else {
            setTheme('orange');
        }
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}


export { ThemeContext, ThemeProviderWrapper }