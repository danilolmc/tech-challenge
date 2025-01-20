import {describe} from "vitest";
import {getYearlyInterestRate} from "@/features/credit_simulator/model/simulator/domain/interest_rates";
import {InvalidClientAge} from "@/features/credit_simulator/model/simulator/errors/InvalidClientAge";

describe("Credit Simulation Domain", () => {
    it.each(
        [
            {client_birthdate: new Date('2001/12/01'), interest_rate: 5},
            {client_birthdate: new Date('1999/12/01'), interest_rate: 5},
            {client_birthdate: new Date('1995/12/01'), interest_rate: 3},
            {client_birthdate: new Date('1977/12/01'), interest_rate: 2},
            {client_birthdate: new Date('1955/12/01'), interest_rate: 4},
    ]
    )('should get correct interest rate according to age range: $client_birthdate', (data) => {
        const interestRate = getYearlyInterestRate(data.client_birthdate);
        expect(interestRate.rate).toBe(data.interest_rate);
    });

    it('should return error when client age is under 18', () => {
        const date = `${new Date().getFullYear() - 15}/01/19`;

        const interestRate = getYearlyInterestRate(new Date(date)) as  {
            rate: number,
            error: Error
        };

        expect(interestRate.error).toBeInstanceOf(InvalidClientAge);
    })

})