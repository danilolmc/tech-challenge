import React from "react";
import {Simulation} from "@/features/credit_simulator/view/simulator/components/proposal/index.tsx";
import {LoanProposalContext} from "@/features/credit_simulator/view/simulator/components/proposal/context.tsx";

export type LoanProposalWrapperProps = React.AllHTMLAttributes<HTMLDivElement> & Simulation;

export const LoanProposalWrapper: React.FC<LoanProposalWrapperProps> = ({children, simulation}) => {

    const hasSimulationResult = Number(simulation?.simulation_result?.totalPayment) > 0

    return (
        <>
            {
                hasSimulationResult ? (
                    <LoanProposalContext.Provider value={{simulation}}>
                        {children}
                    </LoanProposalContext.Provider>

                ) : null
            }
        </>
    )
}