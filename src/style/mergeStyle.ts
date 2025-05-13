import { StyleSheet } from 'react-native';
import type { StyleProp } from 'react-native';
import { applyBoxProps, type BoxProps } from './Box';

type StyleObject = {
    [key: string]: any;
};

const mergeObjects = (
    target: StyleObject,
    source: StyleObject
): StyleObject => {
    const result = { ...target };

    for (const key in source) {
        if (
            source[key] instanceof Object &&
            key in target &&
            target[key] instanceof Object
        ) {
            result[key] = mergeObjects(target[key], source[key]);
        } else {
            result[key] = source[key];
        }
    }

    return result;
};

export const mergeStyle = (
    baseStyle?: StyleProp<any>,
    additionalStyles?: StyleProp<any>,
    inlineStyle?: StyleProp<any>
): StyleProp<any> => {
    // First merge base styles with additional styles
    const flattenedBase = baseStyle ? StyleSheet.flatten(baseStyle) : {};
    const flattenedAdditional = additionalStyles
        ? StyleSheet.flatten(additionalStyles)
        : {};

    // Then merge with inline styles (which take precedence)
    const flattenedInline = inlineStyle ? StyleSheet.flatten(inlineStyle) : {};

    const styles = StyleSheet.create({
        merged: mergeObjects(
            mergeObjects(flattenedBase, flattenedAdditional),
            flattenedInline
        ),
    });

    return styles.merged;
};

export const applyStyle = (
    props: BoxProps,
    additionalStyles?: StyleProp<any>
): StyleProp<any> => {
    const boxStyles = applyBoxProps(props);
    const flattenedBoxStyles = StyleSheet.flatten(boxStyles.style);
    const flattenedAdditional = additionalStyles
        ? StyleSheet.flatten(additionalStyles)
        : {};

    return mergeStyle(flattenedBoxStyles, flattenedAdditional, props.style);
};
