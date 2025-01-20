import {moneyFormat} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";

export type LoanProposalProps = React.AllHTMLAttributes<HTMLDivElement> & {
    simulation_result: {
        monthlyPayment: number
        totalPayment: number
        interestRate: { reference: "anual" | "mensal", value: number }
        totalInterestRate: number
    }
}

export const LoanProposal = ({simulation_result}: LoanProposalProps) => {

    return (
        <div className={"px-4 py-8 border mt-4 rounded"}>
            <header className={"text-center"}>
                <h2 className={"text-3xl font-bold"}>{moneyFormat(simulation_result.monthlyPayment)}</h2>
                <p className={"mt-2"}>Valor das parcelas</p>
            </header>
            <ul className={"mt-8"}>
                <li className={"flex justify-between py-2 border-b"}>
                    <span>Total a pagar</span>
                    <span className={"font-semibold"}>{moneyFormat(simulation_result.totalPayment)}</span>
                </li>
                <li className={"flex justify-between mt-2 py-2 border-b"}>
                    <span>Taxa de juros {simulation_result.interestRate.reference}</span>
                    <span className={"font-semibold"}>{simulation_result.interestRate.value}%</span>
                </li>
            </ul>

            <Button className={"w-full mt-8  h-10"}>Quero solicitar</Button>
        </div>
    )
}