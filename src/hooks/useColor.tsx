import type { BalladTheme } from "../BalladUIProvider";
import { DEFAULT_THEME } from "../style";
import { useTheme } from "./useTheme";

export const useColor = (color?: string) => {
    if (!color) return undefined;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { colors, primaryShade } = useTheme();
    const colorArray = color.split(".");
    if (colorArray[0]) {
        if (colors[colorArray[0]]) {
            if (colorArray[1]) {
                return colors[colorArray[0]!]![Number.parseInt(colorArray[1]!, 10)];
            } else {
                return colors[colorArray[0]!]![primaryShade];
            }
        }
    }
    return color;
}

export const applyColor = (color?: string, theme?: BalladTheme) => {
    if (!color) return undefined;
    if (!theme) theme = DEFAULT_THEME;
    const colorArray = color.split(".");
    if (colorArray[0]) {
        if (theme?.colors[colorArray[0]]) {
            if (colorArray[1]) {
                return theme?.colors[colorArray[0]!]![Number.parseInt(colorArray[1]!, 10)]
            } else {
                return theme?.colors[colorArray[0]!]![theme?.primaryShade!]
            }
        }
    }
    return color;
}