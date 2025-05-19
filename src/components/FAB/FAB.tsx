import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { applyStyle, type BoxProps, type BalladSize } from '../../style';
import { applySizeProp } from '../../style/Size';
import { applyColor } from '../../style/Colors';

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
     * Whether the FAB is disabled.
     * @default false
     */
    disabled?: boolean;

    /**
     * Callback function when FAB is pressed.
     */
    onPress?: () => void;
}

const getPlacementStyles = (placement: FabPlacement): Partial<BoxProps> => {
    switch (placement) {
        case 'top-left':
            return { position: 'absolute', top: 32, left: 32 };
        case 'top-right':
            return { position: 'absolute', top: 32, right: 32 };
        case 'bottom-left':
            return { position: 'absolute', bottom: 32, left: 32 };
        default: // bottomRight
            return { position: 'absolute', bottom: 32, right: 32 };
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
        ...rest
    } = props;

    const placementStyles = getPlacementStyles(placement);
    const baseColor = applyColor(color);

    const { style, ...fabProps } = applyStyle(
        {
            ...rest,
            p: props.p ?? "md"
        }, {
        ...placementStyles,
        backgroundColor: disabled ? applyColor('gray.3') : baseColor,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
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