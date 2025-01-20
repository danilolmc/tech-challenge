import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const truncateToDecimalPlaces = (num: number, decimalPlaces = 2) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.trunc(num * factor) / factor;
};

export const moneyFormat = (
    value: number,
    currency = 'BRL',
    locale = 'pt-BR',
    options: Intl.NumberFormatOptions = {style: 'currency', currency}
) => {
    return new Intl.NumberFormat(locale, options).format(value);
}