import {
    LoanProposalHeader
} from "@/features/credit_simulator/view/simulator/components/proposal/header.tsx";
import {SimulationResult} from "@/features/credit_simulator/model/simulator/domain/simulation.ts";
import {LoanProposalBody} from "@/features/credit_simulator/view/simulator/components/proposal/body.tsx";
import {LoanProposalWrapper} from "@/features/credit_simulator/view/simulator/components/proposal/wrapper.tsx";

export type Simulation = {
    simulation: {
        simulation_result: SimulationResult['simulation_result']
        errors: SimulationResult['errors']
    }
}

export const LoanProposal = {
    Wrapper: LoanProposalWrapper,
    Body: LoanProposalBody,
    Header:
    LoanProposalHeader
}