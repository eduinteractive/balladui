import { View } from "react-native";
import { applySizeProp, applyStyle, type BalladSize, type BoxProps } from "../../style";
import { applyColor } from "../../style/Colors";

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

    const { style, ...viewProps } = applyStyle(rest, {
        width: rest.w ?? '100%',
        borderTopColor: color ? applyColor(color) : 'gray',
        borderTopWidth: size ? applySizeProp(size) : 1
    });

    return <View style={style} {...viewProps} />;
};
