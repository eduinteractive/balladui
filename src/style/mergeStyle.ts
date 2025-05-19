import { StyleSheet } from 'react-native';
import type { StyleProp } from 'react-native';
import { applyBoxProps, type BoxProps } from './Box';

type StyleObject = {
    [key: string]: any;
};

const cleanStyleObject = (obj: StyleObject): StyleObject => {
    const result: StyleObject = {};

    for (const key in obj) {
        const value = obj[key];
        if (value !== undefined && value !== null) {
            if (value instanceof Object && !Array.isArray(value)) {
                const cleaned = cleanStyleObject(value);
                if (Object.keys(cleaned).length > 0) {
                    result[key] = cleaned;
                }
            } else {
                result[key] = value;
            }
        }
    }

    return result;
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

    return cleanStyleObject(result);
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
    const { style, ...boxProps } = applyBoxProps(props);
    const flattenedBoxStyles = StyleSheet.flatten(style);
    const flattenedAdditional = additionalStyles
        ? StyleSheet.flatten(additionalStyles)
        : {};

    return {
        style: mergeStyle(flattenedBoxStyles, flattenedAdditional, props.style),
        ...boxProps
    };
};
