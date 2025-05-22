import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { applyStyle, type BoxProps, type BalladSize } from '../../style';
import { applySizeProp } from '../../style/Size';
import { applyColor } from '../../hooks/useColor';
import { useTheme } from '../../hooks/useTheme';

export type FabPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface FABProps extends BoxProps, TouchableOpacityProps {
    /**
     * The content of the FAB.
     */
    children?: React.ReactNode;

    /**
     * The color of the FAB.
     * @default 'primary'
     */
    color?: string;

    /**
     * The placement of the FAB.
     * @default 'bottomRight'
     */
    placement?: FabPlacement;

    /**
     * Radius of the FAB.
     * @default 'md'
     */
    radius?: BalladSize;

    /**
     * Space of the FAB.
     * @default 'md'
     */
    space?: BalladSize;

    /**
     * Whether the FAB is disabled.
     * @default false
     */
    disabled?: boolean;

    /**
     * Callback function when FAB is pressed.
     */
    onPress?: () => void;
}

const getPlacementStyles = (placement: FabPlacement, space: BalladSize): Partial<BoxProps> => {
    switch (placement) {
        case 'top-left':
            return { position: 'absolute', top: applySizeProp(space), left: applySizeProp(space) };
        case 'top-right':
            return { position: 'absolute', top: applySizeProp(space), right: applySizeProp(space) };
        case 'bottom-left':
            return { position: 'absolute', bottom: applySizeProp(space), left: applySizeProp(space) };
        default: // bottomRight
            return { position: 'absolute', bottom: applySizeProp(space), right: applySizeProp(space) };
    }
};

export const FAB = (props: FABProps) => {
    const {
        children,
        color = 'primary',
        placement = 'bottom-right',
        disabled = false,
        onPress,
        radius = 'md',
        space = 'md',
        ...rest
    } = props;

    const theme = useTheme();
    const placementStyles = getPlacementStyles(placement, space);
    const baseColor = applyColor(color, theme);

    const { style, ...fabProps } = applyStyle(
        {
            ...rest,
            p: props.p ?? "md"
        }, theme, {
        ...placementStyles,
        backgroundColor: disabled ? applyColor('gray.3', theme) : baseColor,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.6 : 1,
        borderRadius: applySizeProp(radius)
    }
    );

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={style}
            {...fabProps}
        >
            {children}
        </TouchableOpacity>
    );
}; 