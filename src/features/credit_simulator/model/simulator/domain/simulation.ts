import {z, ZodIssue} from "zod";

export const MIN_LOAN_VALUE = 1_000;
export const MAX_LOAN_VALUE = 500_000;

export const MIN_PAYMENTS_NUMBER = 1;
export const MAX_PAYMENTS_NUMBER = 48;

export const MIN_AGE = 18;

export const SimulationParams = z.object({
    amount: z
        .number({
            required_error: "O valor do empréstimo é obrigatório.",
            invalid_type_error: "O valor do empréstimo deve ser um número válido.",
        })
        .min(MIN_LOAN_VALUE, `O valor do empréstimo deve ser no mínimo R$ ${MIN_LOAN_VALUE}.`)
        .max(MAX_LOAN_VALUE, `O valor do empréstimo não pode exceder R$ ${MAX_LOAN_VALUE}.`),

    installments: z
        .number({
            required_error: "A quantidade de parcelas é obrigatória.",
            invalid_type_error: "A quantidade de parcelas deve ser um número válido.",
        })
        .int("A quantidade de parcelas deve ser um número inteiro.")
        .min(MIN_PAYMENTS_NUMBER, `A quantidade mínima de parcelas é ${MIN_PAYMENTS_NUMBER}.`)
        .max(MAX_PAYMENTS_NUMBER, `A quantidade máxima de parcelas é ${MAX_PAYMENTS_NUMBER}.`),

    client_birthdate: z
        .date({
            required_error: "A data de nascimento do cliente é obrigatória.",
            invalid_type_error: "Data de nascimento inválida.",
        })
        .refine((date) => {
            const today = new Date();
            const idadeMinima = new Date(today.getFullYear() - MIN_AGE, today.getMonth(), today.getDate());
            return date <= idadeMinima;
        }, {
            message: "O cliente deve ter pelo menos 18 anos para solicitar um empréstimo.",
        })
});

export type Simulation = z.infer<typeof SimulationParams>;

export type SimulationResult = {
    simulation_result: {
        monthlyPayment: number,
        totalPayment: number,
        interestRate: {
            reference: 'mensal' | 'anual',
            value: number
        },
        totalInterestRate: number,
    } | null,
    errors: ZodIssue[] | Error[]
}