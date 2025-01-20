import {describe, expect} from "vitest";
import {useSimulatorModel} from "@/features/credit_simulator/model/simulator/simulatorModel";
import {
    MAX_LOAN_VALUE,
    MAX_PAYMENTS_NUMBER,
    MIN_LOAN_VALUE,
    MIN_PAYMENTS_NUMBER,
    Simulation,
    SimulationResult
} from "@/features/credit_simulator/model/simulator/domain/simulation";

describe('useSimulatorModel', () => {

    it('deve calcular uma simulação de empréstimo', () => {

        const useSimulation = useSimulatorModel();

        const clientData: Simulation = {
            amount: 10_000,
            client_birthdate: new Date(`${new Date().getFullYear() - 25}/01/19`),
            installments: 12
        }

        const result = useSimulation.simulate_credit(clientData);

        expect(result.simulation_result).toEqual(expect.objectContaining({
            interestRate: {
                value: 5,
                reference: 'anual'
            },
            totalPayment: 10272.897814616095,
            monthlyPayment: 856.0748178846745,

            totalInterestRate:  272.8978146160953,
        } as SimulationResult['simulation_result']));

        expect(result.errors).toHaveLength(0);
    });

    it('deve retornar erro quando o montante não é fornecido', () => {
        const useSimulation = useSimulatorModel();

        const clientData = {
            client_birthdate: new Date(`${new Date().getFullYear() - 25}/01/19`),
            installments: 12
        }

        const result = useSimulation.simulate_credit(clientData as unknown);

        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].message).toBe("O valor do empréstimo é obrigatório.");
    });

    it.each(
        [0, -1]
    )('deve retornar erro quando o montante é menor que o mínimo: %s', (value) => {
        const useSimulation = useSimulatorModel();

        const clientData: Simulation = {
            amount: value,
            client_birthdate: new Date(`${new Date().getFullYear() - 25}/01/19`),
            installments: 12
        }

        const result = useSimulation.simulate_credit(clientData);

        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].message).toBe(`O valor do empréstimo deve ser no mínimo R$ ${MIN_LOAN_VALUE}.`)
    })

    it('deve retornar erro quando o montante é maior que o máximo', () => {
        const useSimulation = useSimulatorModel();

        const clientData: Simulation = {
            amount: 500_001,
            client_birthdate: new Date(`${new Date().getFullYear() - 25}/01/19`),
            installments: 12
        }

        const result = useSimulation.simulate_credit(clientData);

        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].message).toBe(`O valor do empréstimo não pode exceder R$ ${MAX_LOAN_VALUE}.`)
    });

    it('deve retornar erro quando o númerod e parcelas informada é menor que o mínimo permitido', () => {
        const useSimulation = useSimulatorModel();

        const clientData: Simulation = {
            amount: 10_000,
            client_birthdate: new Date(`${new Date().getFullYear() - 25}/01/19`),
            installments: 0
        }

        const result = useSimulation.simulate_credit(clientData);

        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].message).toBe(`A quantidade mínima de parcelas é ${MIN_PAYMENTS_NUMBER}.`)
    });

    it('deve retornar erro quando o número de parcelas é maior que o máximo permitido', () => {
        const useSimulation = useSimulatorModel();

        const clientData: Simulation = {
            amount: 10_000,
            client_birthdate: new Date(`${new Date().getFullYear() - 25}/01/19`),
            installments: 96
        }

        const result = useSimulation.simulate_credit(clientData);

        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].message).toBe(`A quantidade máxima de parcelas é ${MAX_PAYMENTS_NUMBER}.`)
    });
})