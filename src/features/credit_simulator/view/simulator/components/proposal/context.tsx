import {createContext} from "react";
import {Simulation} from "@/features/credit_simulator/view/simulator/components/proposal/index.tsx";

export const LoanProposalContext = createContext<Simulation>({} as Simulation);
