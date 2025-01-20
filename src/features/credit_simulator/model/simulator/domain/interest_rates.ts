import {InvalidClientAge} from "@/features/credit_simulator/model/simulator/errors/InvalidClientAge.ts";

export const getYearlyInterestRate = (client_birth_date: Date) => {
    const today = new Date();
    let client_age = today.getFullYear() - client_birth_date.getFullYear();

    const birthday_passed = today.getMonth() < client_birth_date.getMonth() ||
        (today.getMonth() === client_birth_date.getMonth() && today.getDate() < client_birth_date.getDate());

    if (birthday_passed) {
        client_age--;
    }

    const interestRanges = [
        {min: 18, max: 25, value: 5},
        {min: 26, max: 40, value: 3},
        {min: 41, max: 60, value: 2},
        {min: 61, max: Infinity, value: 4}
    ];

    const interestRate = interestRanges.find(range => client_age >= range.min && client_age <= range.max);

    return {
        rate: interestRate?.value,
        error: interestRate ? null : new InvalidClientAge()
    }
}