import { View } from "react-native";
import { applySizeProp, applyStyle, type BalladSize, type BoxProps } from "../../style";

export interface SpaceProps extends BoxProps {
    /**
     * The size of the space.
     */
    size?: BalladSize;
}

export const Space = (props: SpaceProps) => {
    let { size, ...rest } = props;

    const { style, ...viewProps } = applyStyle(rest, {
        h: size ? applySizeProp(size) : applySizeProp('xs'),
    });

    return <View style={style} {...viewProps} />;
};
