import type { DimensionValue, ViewProps } from 'react-native';
import { applySizeProp, type BalladSize } from './Size';
import { StyleSheet } from 'react-native';
import type { BalladTheme } from '../BalladUIProvider';
import { applyColor } from '../hooks/useColor';

export type BoxProps = ViewProps & {
    /**
     * The flex property of the box.
     */
    flex?: number;

    /**
     * The margin property of the box.
     */
    m?: BalladSize;
    /**
     * The margin top property of the box.
     */
    mt?: BalladSize;
    /**
     * The margin right property of the box.
     */
    mr?: BalladSize;
    /**
     * The margin bottom property of the box.
     */
    mb?: BalladSize;
    /**
     * The margin left property of the box.
     */
    ml?: BalladSize;
    /**
     * The margin horizontal property of the box.
     */
    mx?: BalladSize;
    /**
     * The margin vertical property of the box.
     */
    my?: BalladSize;
    /**
     * The padding property of the box.
     */
    p?: BalladSize;
    /**
     * The padding top property of the box.
     */
    pt?: BalladSize;
    /**
     * The padding right property of the box.
     */
    pr?: BalladSize;
    /**
     * The padding bottom property of the box.
     */
    pb?: BalladSize;
    /**
     * The padding left property of the box.
     */
    pl?: BalladSize;
    /**
     * The padding horizontal property of the box.
     */
    px?: BalladSize;
    /**
     * The padding vertical property of the box.
     */
    py?: BalladSize;

    /**
     * The width property of the box.
     */
    w?: DimensionValue;
    /**
     * The height property of the box.
     */
    h?: DimensionValue;
    /**
     * The min width property of the box.
     */
    miw?: DimensionValue;
    /**
     * The min height property of the box.
     */
    mih?: DimensionValue;
    /**
     * The max width property of the box.
     */
    maw?: DimensionValue;
    /**
     * The max height property of the box.
     */
    mah?: DimensionValue;

    /**
     * The position property of the box.
     */
    position?: 'absolute' | 'relative';
    /**
     * The top property of the box.
     */
    top?: BalladSize;
    /**
     * The right property of the box.
     */
    right?: BalladSize;
    /**
     * The bottom property of the box.
     */
    bottom?: BalladSize;
    /**
     * The left property of the box.
     */
    left?: BalladSize;
    /**
     * The z-index property of the box.
     */
    zIndex?: number;

    /**
     * The background color property of the box.
     */
    bg?: string;
};

export const applyBoxProps = (props: BoxProps, theme: BalladTheme) => {
    const {
        flex,
        m,
        mt,
        mr,
        mb,
        ml,
        mx,
        my,
        p,
        pt,
        pr,
        pb,
        pl,
        px,
        py,
        w,
        h,
        miw,
        mih,
        maw,
        mah,
        position,
        top,
        right,
        bottom,
        left,
        zIndex,
        bg,
        ...rest
    } = props;

    const styles = StyleSheet.create({
        box: {
            flex,
            margin: applySizeProp(m),
            marginTop: applySizeProp(mt),
            marginRight: applySizeProp(mr),
            marginBottom: applySizeProp(mb),
            marginLeft: applySizeProp(ml),
            marginHorizontal: applySizeProp(mx),
            marginVertical: applySizeProp(my),
            padding: applySizeProp(p),
            paddingTop: applySizeProp(pt),
            paddingRight: applySizeProp(pr),
            paddingBottom: applySizeProp(pb),
            paddingLeft: applySizeProp(pl),
            paddingHorizontal: applySizeProp(px),
            paddingVertical: applySizeProp(py),
            width: w,
            height: h,
            minWidth: miw,
            minHeight: mih,
            maxWidth: maw,
            maxHeight: mah,
            position,
            top: applySizeProp(top),
            right: applySizeProp(right),
            bottom: applySizeProp(bottom),
            left: applySizeProp(left),
            zIndex,
            backgroundColor: applyColor(bg, theme),
        },
    });

    return {
        ...rest,
        style: styles.box,
    };
};
