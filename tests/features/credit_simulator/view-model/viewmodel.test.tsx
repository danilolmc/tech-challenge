import {act, renderHook} from '@testing-library/react';
import {useSimulatorModel} from '@/features/credit_simulator/model/simulator/simulatorModel';
import {useSimulatorViewModel} from "@/features/credit_simulator/view-model/useSimulatorViewModel";
import {describe, expect, it} from "vitest";
import {Simulation} from "@/features/credit_simulator/model/simulator/domain/simulation";

describe('useSimulatorViewModel - Integração com SimulatorModel', () => {
    it('deve realizar uma simulação corretamente com o SimulatorModel', async () => {
        const simulatorModel = useSimulatorModel();

        const {result} = renderHook(() => useSimulatorViewModel({simulatorModel}));

        result.current.form.setValue('amount', 1000);
        result.current.form.setValue('installments', 12);
        result.current.form.setValue('client_birthdate', new Date(`${new Date().getFullYear() - 25}/01/19`));

        expect(result.current.form.getValues()).toEqual({
            amount: 1000,
            installments: 12,
            client_birthdate: new Date(`${new Date().getFullYear() - 25}/01/19`)
        } as Simulation);

        expect(result.current.result).toBeUndefined();

        await act(async () => {
            result.current.simulate();
        });

        expect(result.current.result).toEqual({
            simulation_result: {
                monthlyPayment: expect.any(Number),
                totalPayment: expect.any(Number),
                interestRate: expect.any(Object),
                totalInterestRate: expect.any(Number),
            },
            errors: [],
        });
    });

    it('deve retornar erros quando os parâmetros de simulação forem inválidos', async () => {
        const simulatorModel = useSimulatorModel();

        const {result} = renderHook(() => useSimulatorViewModel({simulatorModel}));

        result.current.form.setValue('amount', -1000);

        await act(async () => {
            result.current.simulate();
        });

        expect(result.current.result).toEqual({
            simulation_result: null,
            errors: expect.any(Array),
        });
    });

    it('deve retornar a lista de pagamentos mensais, constando ga evolução do total pago', async () => {
        const simulatorModel = useSimulatorModel();

        const {result} = renderHook(() => useSimulatorViewModel({simulatorModel}));

        const installments = 12;
        result.current.form.setValue('amount', 1000);
        result.current.form.setValue('client_birthdate', new Date(`${new Date().getFullYear() - 25}/01/19`));
        result.current.form.setValue('installments', installments);

        await act(async () => {
            result.current.simulate();
        });

        const paymentEvolution = result.current.getPaymentEvolution();
        expect(paymentEvolution).toHaveLength(12)
        expect(paymentEvolution[0].totalPayed).toBe(result.current.result.simulation_result.monthlyPayment)
        expect(paymentEvolution[0].month).toBe(1)

    })
});
