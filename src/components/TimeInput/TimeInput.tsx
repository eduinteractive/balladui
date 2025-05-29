/* eslint-disable react-native/no-inline-styles */
import { useState, forwardRef } from 'react';
import { TextInput as RNTextInput, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { TextInput, type TextInputProps } from '../TextInput';
import { applyColor } from '../../hooks/useColor';
import { useTheme } from '../../hooks/useTheme';

const ClockIcon = ({ color, size }: { color?: string; size: number }) => (
    <View style={{ width: size, height: size }}>
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z"
                fill={color}
            />
        </Svg>
    </View>
);

export interface TimeInputProps extends Omit<TextInputProps, 'value' | 'onChangeText' | 'keyboardType' | 'onChange'> {
    /**
     * The time value in HH:MM format.
     */
    value?: string;

    /**
     * Callback when the time changes.
     * @param time - The time in HH:MM format
     * @param isValid - Whether the time is valid
     */
    onChange?: (time: string, isValid: boolean) => void;

    /**
     * Minimum allowed time in HH:MM format.
     */
    minTime?: string;

    /**
     * Maximum allowed time in HH:MM format.
     */
    maxTime?: string;

    /**
     * Whether to show the clock icon.
     * @default true
     */
    withIcon?: boolean;

    /**
     * Custom error message for invalid times.
     * @default 'Invalid time format'
     */
    invalidTimeMessage?: string;

    /**
     * Custom error message for times outside the allowed range.
     * @default 'Time is outside the allowed range'
     */
    timeRangeMessage?: string;

    /**
     * Whether to allow seconds input (HH:MM:SS format).
     * @default false
     */
    withSeconds?: boolean;
}

/**
 * Formats a time string to HH:MM or HH:MM:SS format
 */
const formatTimeDisplay = (input: string, withSeconds: boolean = false): string => {
    // Remove all non-numeric characters
    const numbers = input.replace(/\D/g, '');

    if (withSeconds) {
        // Apply HH:MM:SS formatting
        if (numbers.length <= 2) {
            return numbers;
        } else if (numbers.length <= 4) {
            return `${numbers.slice(0, 2)}:${numbers.slice(2)}`;
        } else {
            return `${numbers.slice(0, 2)}:${numbers.slice(2, 4)}:${numbers.slice(4, 6)}`;
        }
    } else {
        // Apply HH:MM formatting
        if (numbers.length <= 2) {
            return numbers;
        } else {
            return `${numbers.slice(0, 2)}:${numbers.slice(2, 4)}`;
        }
    }
};

/**
 * Validates if a time string in HH:MM or HH:MM:SS format is valid
 */
const isValidTime = (formattedTime: string, withSeconds: boolean = false): boolean => {
    const expectedLength = withSeconds ? 8 : 5; // HH:MM:SS or HH:MM
    if (formattedTime.length !== expectedLength) return false;

    const parts = formattedTime.split(':');
    const expectedParts = withSeconds ? 3 : 2;
    if (parts.length !== expectedParts) return false;

    const hourStr = parts[0];
    const minuteStr = parts[1];
    const secondStr = withSeconds ? parts[2] : undefined;

    if (!hourStr || !minuteStr || (withSeconds && !secondStr)) return false;

    const hour = Number(hourStr);
    const minute = Number(minuteStr);
    const second = withSeconds ? Number(secondStr) : 0;

    if (isNaN(hour) || isNaN(minute) || (withSeconds && isNaN(second))) return false;
    if (hour < 0 || hour > 23) return false;
    if (minute < 0 || minute > 59) return false;
    if (withSeconds && (second < 0 || second > 59)) return false;

    return true;
};

/**
 * Converts time string to minutes for comparison
 */
const timeToMinutes = (time: string): number => {
    const parts = time.split(':');
    const hour = Number(parts[0]) || 0;
    const minute = Number(parts[1]) || 0;
    const second = Number(parts[2]) || 0;

    return hour * 60 + minute + (second / 60);
};

/**
 * Checks if a time is within the specified range
 */
const isTimeInRange = (time: string, minTime?: string, maxTime?: string): boolean => {
    const timeMinutes = timeToMinutes(time);

    if (minTime) {
        const minTimeMinutes = timeToMinutes(minTime);
        if (timeMinutes < minTimeMinutes) return false;
    }

    if (maxTime) {
        const maxTimeMinutes = timeToMinutes(maxTime);
        if (timeMinutes > maxTimeMinutes) return false;
    }

    return true;
};

/**
 * Converts various time formats to HH:MM or HH:MM:SS
 */
const normalizeTimeValue = (value: string, withSeconds: boolean = false): string => {
    if (!value) return '';

    // If already in correct format, return as is
    if (withSeconds && value.match(/^\d{2}:\d{2}:\d{2}$/)) return value;
    if (!withSeconds && value.match(/^\d{2}:\d{2}$/)) return value;

    // Try to format the input
    return formatTimeDisplay(value, withSeconds);
};

export const TimeInput = forwardRef<RNTextInput, TimeInputProps>((props, ref) => {
    const {
        value,
        onChange,
        minTime,
        maxTime,
        withIcon = true,
        withSeconds = false,
        invalidTimeMessage = 'Invalid time format',
        timeRangeMessage = 'Time is outside the allowed range',
        error,
        rightSection,
        size = 'md',
        ...rest
    } = props;

    const theme = useTheme();
    const [displayValue, setDisplayValue] = useState(() => normalizeTimeValue(value || '', withSeconds));
    const [internalError, setInternalError] = useState<string>('');

    const handleTextChange = (text: string) => {
        const formatted = formatTimeDisplay(text, withSeconds);
        setDisplayValue(formatted);

        // Clear previous errors
        setInternalError('');

        if (formatted.length === 0) {
            // Empty input
            onChange?.('', true);
            return;
        }

        const expectedLength = withSeconds ? 8 : 5;
        if (formatted.length === expectedLength) {
            // Complete time entered
            if (isValidTime(formatted, withSeconds)) {
                if (isTimeInRange(formatted, minTime, maxTime)) {
                    onChange?.(formatted, true);
                } else {
                    setInternalError(timeRangeMessage);
                    onChange?.(formatted, false);
                }
            } else {
                setInternalError(invalidTimeMessage);
                onChange?.(formatted, false);
            }
        } else {
            // Incomplete time
            onChange?.(formatted, false);
        }
    };

    const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
    const clockIcon = withIcon ? (
        <ClockIcon
            color={applyColor('gray.6', theme)}
            size={iconSize}
        />
    ) : undefined;

    const finalError = error || internalError;
    const placeholder = withSeconds ? 'HH:MM:SS' : 'HH:MM';
    const maxLength = withSeconds ? 8 : 5;

    return (
        <TextInput
            {...rest}
            ref={ref}
            value={displayValue}
            onChangeText={handleTextChange}
            placeholder={props.variant === 'underline' ? '' : placeholder}
            keyboardType="numeric"
            maxLength={maxLength}
            error={finalError}
            rightSection={rightSection || clockIcon}
            size={size}
        />
    );
});

TimeInput.displayName = 'TimeInput'; 