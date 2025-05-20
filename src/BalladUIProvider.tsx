import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import { DEFAULT_THEME } from './style/DefaultTheme';

export interface BalladColors extends Record<string, string[]> {
    primary: string[];
    dark: string[];
    gray: string[];
    red: string[];
    grape: string[];
    violet: string[];
    blue: string[];
    cyan: string[];
}

export interface BalladTheme {
    colors: BalladColors;
    primaryShade: number;
}

export interface BalladContextType {
    theme: BalladTheme;
}

export const BalladContext = createContext<BalladContextType | undefined>(undefined);

export const BalladUIProvider = ({ children, theme }: { children: ReactNode, theme?: BalladTheme }) => {
    const [currentTheme] = useState<BalladTheme>(theme ? {
        ...theme,
        colors: {
            ...theme?.colors,
            ...DEFAULT_THEME.colors
        }
    } : DEFAULT_THEME);

    return (
        <BalladContext.Provider value={{ theme: currentTheme }}>
            {children}
        </BalladContext.Provider>
    );
};