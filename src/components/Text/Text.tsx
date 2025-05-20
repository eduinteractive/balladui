import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { applyFontSizeProp, applyStyle, type BalladFontSize, type BoxProps } from '../../style';
import { applyColor } from '../../style/Colors';

export interface TextProps extends Omit<BoxProps, 'style'>, Omit<RNTextProps, 'style'> {
    style?: BoxProps['style'] & RNTextProps['style'];

    /**
     * The content of the text.
     */
    children?: React.ReactNode;

    /**
     * The color of the text.
     */
    c?: string;

    /**
     * The font family of the text.
     */
    ff?: string;

    /**
     * The font size of the text.
     */
    fs?: BalladFontSize;

    /**
     * The font style of the text.
     */
    fst?: 'normal' | 'italic';

    /**
     * The font weight of the text.
     */
    fw?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

    /**
     * The font variant of the text.
     */
    fv?: 'normal' | 'small-caps';

    /**
     * The letter spacing of the text.
     */
    ls?: number;

    /**
     * The line height of the text.
     */
    lh?: number;

    /**
     * The text alignment of the text.
     */
    align?: 'auto' | 'left' | 'right' | 'center' | 'justify';

    /**
     * The vertical text alignment of the text.
     */
    alignVertical?: 'auto' | 'top' | 'bottom' | 'center';

    /**
     * The text decoration line of the text.
     */
    tdl?: 'none' | 'underline' | 'line-through' | 'underline line-through';
}

export const Text = (props: TextProps) => {
    const {
        children,
        c,
        ff,
        fs,
        fst,
        fw,
        fv,
        ls,
        lh,
        align,
        alignVertical,
        tdl,
        ...rest
    } = props;

    const textStyles = {
        color: applyColor(c),
        fontFamily: ff,
        fontSize: applyFontSizeProp(fs),
        fontStyle: fst,
        fontWeight: fw,
        fontVariant: fv,
        letterSpacing: ls,
        lineHeight: lh,
        textAlign: align,
        textAlignVertical: alignVertical,
        textDecorationLine: tdl,
    };

    const { style, ...textProps } = applyStyle(rest, textStyles);

    return <RNText style={style} {...textProps}>{children}</RNText>;
};
