import {
    Simulation,
    SimulationParams,
    SimulationResult
} from "@/features/credit_simulator/model/simulator/domain/simulation.ts";
import {getYearlyInterestRate} from "@/features/credit_simulator/model/simulator/domain/interest_rates.ts";
import {InvalidClientAge} from "@/features/credit_simulator/model/simulator/errors/InvalidClientAge.ts";

export type SimulatorModel = () => {
    simulate_credit: (simulation_info: Simulation) => SimulationResult
}

export type SimulatorModelReturn = {
    simulate_credit: (simulation_info: Simulation) => SimulationResult
}

export const useSimulatorModel: SimulatorModel = () => {

    const simulate_credit = (simulation_info: Simulation): SimulationResult => {
        const simulationParams = SimulationParams.safeParse(simulation_info);

        if (simulationParams.error) {
            const errorList = simulationParams.error.errors;
            return {
                simulation_result: null,
                errors: errorList
            }
        }

        const {rate, error} = getYearlyInterestRate(simulationParams.data?.client_birthdate)

        if (rate == undefined) {
            return {
                simulation_result: null,
                errors: [error as InvalidClientAge]
            }
        }

        const monthlyRate = rate / 12 / 100;
        const monthlyPayment = (simulationParams.data?.amount * monthlyRate * Math.pow(1 + monthlyRate, simulationParams.data?.installments)) /
            (Math.pow(1 + monthlyRate, simulationParams.data?.installments) - 1);

        const totalPayment = monthlyPayment * simulationParams.data?.installments
        const totalInterestRate = totalPayment - simulationParams.data?.amount;

        return {
            simulation_result: {
                monthlyPayment: monthlyPayment,
                totalPayment: totalPayment,
                interestRate: {
                    value: rate,
                    reference: 'anual'
                },
                totalInterestRate: totalInterestRate,
            },
            errors: []
        }
    }

    return {
        simulate_credit
    }
}