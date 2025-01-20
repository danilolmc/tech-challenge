import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {truncateToDecimalPlaces} from "@/lib/utils.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {
    Simulation,
    SimulationParams,
    SimulationResult
} from "@/features/credit_simulator/model/simulator/domain/simulation.ts";
import {SimulatorModelReturn} from "@/features/credit_simulator/model/simulator/simulatorModel.tsx";

export type SimulatorViewModelProps = {
    simulatorModel: SimulatorModelReturn
}

export type SimulatorViewModelReturn = {
    simulate: () => void,
    form: UseFormReturn<Simulation>,
    result: SimulationResult | undefined
    getPaymentEvolution: () => { month: number, totalPayed: number }[]
}

export type SimulatorViewModel = (data: SimulatorViewModelProps) => SimulatorViewModelReturn

export const useSimulatorViewModel: SimulatorViewModel = ({simulatorModel}) => {

    const [simulation, setSimulation] = useState<SimulationResult>();

    const form = useForm<Simulation>({
        resolver: zodResolver(SimulationParams),
        criteriaMode: "all",
        defaultValues: {
            installments: 12,
            amount: 1000
        }
    });

    const simulate = () => {
        const result = simulatorModel.simulate_credit(form.getValues())

        if (result.simulation_result) {
            const truncatedValues: SimulationResult = {
                simulation_result: {
                    totalInterestRate: truncateToDecimalPlaces(result.simulation_result.totalInterestRate),
                    monthlyPayment: truncateToDecimalPlaces(result.simulation_result.monthlyPayment),
                    totalPayment: truncateToDecimalPlaces(result.simulation_result.totalPayment),
                    interestRate: result.simulation_result.interestRate
                },
                errors: []
            }
            setSimulation(truncatedValues)
        } else {
            setSimulation(result)
        }
    }

    const getPaymentEvolution = () => {

        if (simulation?.simulation_result?.monthlyPayment) {
            const installments = form.getValues().installments;
            if(!installments) return [];

            const totalPayed = new Array(installments).fill(0).map((_, index) => {

                return {
                    month: index + 1,
                    totalPayed: truncateToDecimalPlaces(Number(simulation?.simulation_result?.monthlyPayment), 2) * (index + 1),
                }
            });

            return totalPayed;
        }

        return [];
    }

    return {
        simulate,
        form,
        result: simulation,
        getPaymentEvolution
    }
}