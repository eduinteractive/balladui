/* eslint-disable react-native/no-inline-styles */
import { useState, forwardRef } from 'react';
import { TextInput as RNTextInput, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { TextInput, type TextInputProps } from '../TextInput';
import { applyColor } from '../../hooks/useColor';
import { useTheme } from '../../hooks/useTheme';

const CalendarIcon = ({ color, size }: { color?: string; size: number }) => (
    <View style={{ width: size, height: size }}>
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    </View>
);

export interface DateInputProps extends Omit<TextInputProps, 'value' | 'onChangeText' | 'keyboardType' | 'onChange'> {
    /**
     * The date value in YYYY-MM-DD format or Date object.
     */
    value?: string | Date;

    /**
     * Callback when the date changes.
     * @param date - The date in YYYY-MM-DD format
     * @param formattedDate - The date in DD.MM.YYYY format
     * @param isValid - Whether the date is valid
     */
    onChange?: (date: string, formattedDate: string, isValid: boolean) => void;

    /**
     * Minimum allowed date in YYYY-MM-DD format or Date object.
     */
    minDate?: string | Date;

    /**
     * Maximum allowed date in YYYY-MM-DD format or Date object.
     */
    maxDate?: string | Date;

    /**
     * Whether to show the calendar icon.
     * @default true
     */
    withIcon?: boolean;

    /**
     * Custom error message for invalid dates.
     * @default 'Invalid date format'
     */
    invalidDateMessage?: string;

    /**
     * Custom error message for dates outside the allowed range.
     * @default 'Date is outside the allowed range'
     */
    dateRangeMessage?: string;
}

/**
 * Formats a date string to DD.MM.YYYY format
 */
const formatDateDisplay = (input: string): string => {
    // Remove all non-numeric characters
    const numbers = input.replace(/\D/g, '');

    // Apply DD.MM.YYYY formatting
    if (numbers.length <= 2) {
        return numbers;
    } else if (numbers.length <= 4) {
        return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    } else {
        return `${numbers.slice(0, 2)}.${numbers.slice(2, 4)}.${numbers.slice(4, 8)}`;
    }
};

/**
 * Converts DD.MM.YYYY to YYYY-MM-DD format
 */
const convertToISODate = (formattedDate: string): string => {
    const parts = formattedDate.split('.');
    if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
        const [day, month, year] = parts;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return '';
};

/**
 * Converts YYYY-MM-DD or Date to DD.MM.YYYY format
 */
const convertFromISODate = (date: string | Date): string => {
    if (!date) return '';

    let dateObj: Date;
    if (typeof date === 'string') {
        dateObj = new Date(date);
    } else {
        dateObj = date;
    }

    if (isNaN(dateObj.getTime())) return '';

    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString();

    return `${day}.${month}.${year}`;
};

/**
 * Validates if a date string in DD.MM.YYYY format is valid
 */
const isValidDate = (formattedDate: string): boolean => {
    if (formattedDate.length !== 10) return false;

    const parts = formattedDate.split('.');
    if (parts.length !== 3) return false;

    const dayStr = parts[0];
    const monthStr = parts[1];
    const yearStr = parts[2];

    if (!dayStr || !monthStr || !yearStr) return false;

    const day = Number(dayStr);
    const month = Number(monthStr);
    const year = Number(yearStr);

    if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
    if (day < 1 || day > 31) return false;
    if (month < 1 || month > 12) return false;
    if (year < 1000 || year > 9999) return false;

    // Check if the date actually exists
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day;
};

/**
 * Checks if a date is within the specified range
 */
const isDateInRange = (date: string, minDate?: string | Date, maxDate?: string | Date): boolean => {
    const dateObj = new Date(date);

    if (minDate) {
        const minDateObj = typeof minDate === 'string' ? new Date(minDate) : minDate;
        if (dateObj < minDateObj) return false;
    }

    if (maxDate) {
        const maxDateObj = typeof maxDate === 'string' ? new Date(maxDate) : maxDate;
        if (dateObj > maxDateObj) return false;
    }

    return true;
};

export const DateInput = forwardRef<RNTextInput, DateInputProps>((props, ref) => {
    const {
        value,
        onChange,
        minDate,
        maxDate,
        withIcon = true,
        invalidDateMessage = 'Ungültiges Datum',
        dateRangeMessage = 'Date is outside the allowed range',
        error,
        rightSection,
        size = 'md',
        ...rest
    } = props;

    const theme = useTheme();
    const [displayValue, setDisplayValue] = useState(() => convertFromISODate(value || ''));
    const [internalError, setInternalError] = useState<string>('');

    const handleTextChange = (text: string) => {
        const formatted = formatDateDisplay(text);
        setDisplayValue(formatted);

        // Clear previous errors
        setInternalError('');

        if (formatted.length === 0) {
            // Empty input
            onChange?.('', '', true);
            return;
        }

        if (formatted.length === 10) {
            // Complete date entered
            if (isValidDate(formatted)) {
                const isoDate = convertToISODate(formatted);

                if (isDateInRange(isoDate, minDate, maxDate)) {
                    onChange?.(isoDate, formatted, true);
                } else {
                    setInternalError(dateRangeMessage);
                    onChange?.(isoDate, formatted, false);
                }
            } else {
                setInternalError(invalidDateMessage);
                onChange?.('', formatted, false);
            }
        } else {
            // Incomplete date
            onChange?.('', formatted, false);
        }
    };

    const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
    const calendarIcon = withIcon ? (
        <CalendarIcon
            color={applyColor('gray.6', theme)}
            size={iconSize}
        />
    ) : undefined;

    const finalError = error || internalError;

    return (
        <TextInput
            {...rest}
            ref={ref}
            value={displayValue}
            onChangeText={handleTextChange}
            placeholder="DD.MM.YYYY"
            keyboardType="numeric"
            maxLength={10}
            error={finalError}
            rightSection={rightSection || calendarIcon}
            size={size}
        />
    );
});

DateInput.displayName = 'DateInput'; 