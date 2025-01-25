import {useTheme} from "@/lib/theme.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {SimulationForm} from "@/features/credit_simulator/view/simulator/components/simulation_form.tsx";
import {SimulatorViewModelReturn} from "@/features/credit_simulator/view-model/useSimulatorViewModel.tsx";
import {LoanProposal,} from "@/features/credit_simulator/view/simulator/components/proposal";
import {SimulationResult} from "@/features/credit_simulator/model/simulator/domain/simulation.ts";
import {
    LoanEvolutionChart
} from "@/features/credit_simulator/view/simulator/components/charts/loan_evolution_chart.tsx";

export type SimulatorViewProps = {
    simulatorViewModel: SimulatorViewModelReturn
}
export const SimulatorView = ({simulatorViewModel}: SimulatorViewProps) => {

    const {form, result, simulate, getPaymentEvolution} = simulatorViewModel;
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
        <main className={"py-3 mt-4"}>
            {
                <>
                    <div className={"md:flex items-center gap-10 justify-between"}>
                        <SimulationForm form={form} onSubmit={onSubmit}/>

                        <LoanProposal.Wrapper simulation={result as SimulationResult}>
                            <div className={"mt-5 md:mt-0 flex-1 lg:max-w-sm"}>
                                <LoanProposal.Header/>
                                <LoanProposal.Body/>
                            </div>
                        </LoanProposal.Wrapper>
                    </div>
                    <div className={"mt-10"}>
                        <LoanEvolutionChart paymentEvolution={getPaymentEvolution()}/>
                    </div>
                </>
            }
        </main>
    </div>
}