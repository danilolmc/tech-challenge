import {SimulatorModelReturn} from "@/features/credit_simulator/model/simulator/simulatorModel.tsx";
import {
    Simulation,
    SimulationParams,
    SimulationResult
} from "@/features/credit_simulator/model/simulator/domain/simulation.ts";
import {truncateToDecimalPlaces} from "@/lib/utils.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";

export type SimulatorViewModelProps = {
    simulatorModel: SimulatorModelReturn
}

export type SimulatorViewModelReturn = {
    simulate: () => void,
    form: UseFormReturn<Simulation>,
    result: SimulationResult | undefined
}

export type SimulatorViewModel = (data: SimulatorViewModelProps) => SimulatorViewModelReturn

export const useSimulatorViewModel: SimulatorViewModel = ({simulatorModel}) => {

    const [simulation_result, setSimulation] = useState<SimulationResult>();

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

    return {
        simulate,
        form,
        result: simulation_result
    }
}