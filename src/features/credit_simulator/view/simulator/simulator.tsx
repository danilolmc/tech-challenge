"use client"

import {SimulatorViewModelReturn} from "@/features/credit_simulator/view-model/useSimulatorViewModel.tsx";
import {SimulationForm} from "@/features/credit_simulator/view/simulator/components/simulation_form.tsx";
import {LoanProposal} from "@/features/credit_simulator/view/simulator/components/loan_proposal.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {useTheme} from "@/lib/theme.tsx";

export type SimulatorViewProps = {
    simulatorViewModel: SimulatorViewModelReturn
}
export const SimulatorView = ({simulatorViewModel}: SimulatorViewProps) => {

    const {form, result, simulate} = simulatorViewModel;
    const theme = useTheme();

    const onSubmit = () => {
        simulate()
    }

    return <div className={"max-w-screen-sm lg:max-w-screen-lg mx-auto p-4 mt-10"}>
        <header>
            <label className={"flex items-center gap-3 mb-8"}>
                <Switch onClick={theme.toggle} checked={theme.isDark}/>
                <p>Mudar pra tema {theme.isDark ? 'claro' : 'escuro'}</p>
            </label>
            <h1 className={"text-3xl font-semibold"}>Bem vindo ao simulador!</h1>
            <span className={"w-8 h-1 bg-primary block rounded my-2"}></span>
            <p className={"text-1xl"}>Simule um empréstimo, é muito fácil!</p>
        </header>
        <main className={"py-3 mt-4  md:flex items-center gap-10 justify-between"}>

            <SimulationForm form={form} onSubmit={onSubmit}/>

            <div className="mt-5 sm:mt-0 flex-1 lg:max-w-sm">
                {result?.simulation_result ? (
                    <>
                        <h2 className="font-semibold">Boa notícia!</h2>
                        <p className="text-sm">Temos uma proposta pra você!</p>
                        <LoanProposal
                            simulation_result={result.simulation_result}
                            className="flex-1"
                        />
                    </>
                ) : null}
            </div>
        </main>
    </div>
}