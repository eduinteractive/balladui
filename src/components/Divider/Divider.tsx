import { View } from "react-native";
import { applySizeProp, applyStyle, type BalladSize, type BoxProps } from "../../style";

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
        w: rest.w ?? '100%',
        borderTopColor: color ?? 'gray',
        borderTopWidth: size ? applySizeProp(size) : 1
    });

    return <View style={style} {...viewProps} />;
};
