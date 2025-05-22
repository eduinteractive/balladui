import { View } from "react-native";
import { applySizeProp, applyStyle, type BalladSize, type BoxProps } from "../../style";
import { applyColor } from "../../hooks/useColor";
import { useTheme } from "../../hooks/useTheme";

export interface DividerProps extends BoxProps {
    /**
     * The color of the divider.
     */
    color?: string;

    /**
     * The width of the divider.
     */
    size?: BalladSize;
}

export const Divider = (props: DividerProps) => {
    let { color, size, ...rest } = props;

    const theme = useTheme();

    const { style, ...viewProps } = applyStyle(rest, theme, {
        width: rest.w ?? '100%',
        borderTopColor: color ? applyColor(color, theme) : 'gray',
        borderTopWidth: size ? applySizeProp(size) : 1
    });

    return <View style={style} {...viewProps} />;
};
