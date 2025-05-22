import { View } from 'react-native';
import { applySizeProp, applyStyle, type BalladSize, type BoxProps } from '../../style';
import { useTheme } from '../../hooks/useTheme';

export interface FlexProps extends BoxProps {
    /**
     * The children of the flex container.
     */
    children?: React.ReactNode;
    /**
     * The direction of the flex container.
     * @default 'row'
     */
    direction?: 'row' | 'column';
    /**
     * The justify content of the flex container.
     * @default 'flex-start'
     */
    justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
    /**
     * The align items of the flex container.
     * @default 'flex-start'
     */
    align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
    /**
     * The wrap of the flex container.
     * @default 'nowrap'
     */
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    /**
     * The gap of the flex container.
     * @default 0
     */
    gap?: BalladSize;
}

const Flex = (props: FlexProps) => {
    const { children, direction, justify, align, wrap, gap, ...rest } = props;
    const theme = useTheme();

    const flexStyles = {
        flexDirection: direction ?? 'row',
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap,
        gap: applySizeProp(gap),
    };

    const { style, ...viewProps } = applyStyle(rest, theme, flexStyles);

    return <View style={style} {...viewProps}>{children}</View>;
};

export default Flex;
