import {create} from 'zustand'

export const useThemeStore = create( (set)=> ({
    theme : localStorage.getItem("chattrix-theme") || 'night',
    setTheme : (theme) => {
        localStorage.setItem("chattrix-theme", theme),
        set({theme})
    },
}))