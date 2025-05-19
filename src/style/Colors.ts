import { useColors } from "../hooks/useColors"

export const applyColor = (color?: string) => {
    if (!color) return undefined;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { colors, primaryShade } = useColors();
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