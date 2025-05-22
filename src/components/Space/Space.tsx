import { View } from "react-native";
import { applySizeProp, applyStyle, type BalladSize, type BoxProps } from "../../style";
import { useTheme } from "../../hooks/useTheme";

export interface SpaceProps extends BoxProps {
    /**
     * The size of the space.
     */
    size?: BalladSize;
}

export const Space = (props: SpaceProps) => {
    let { size, ...rest } = props;

    const theme = useTheme();

    const { style, ...viewProps } = applyStyle(rest, theme, {
        h: size ? applySizeProp(size) : applySizeProp('xs'),
    });

    return <View style={style} {...viewProps} />;
};
