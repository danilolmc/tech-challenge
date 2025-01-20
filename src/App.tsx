import {SimulatorView} from "@/features/credit_simulator/view/simulator/simulator.tsx";
import {useSimulatorModel} from "@/features/credit_simulator/model/simulator/simulatorModel.tsx";
import {useSimulatorViewModel} from "@/features/credit_simulator/view-model/useSimulatorViewModel.tsx";

function App() {

    const simulatorModel = useSimulatorModel();
    const simulatorViewModel = useSimulatorViewModel({
        simulatorModel
    })

  return (
    <div className={"transition duration-150"}>
        <SimulatorView simulatorViewModel={simulatorViewModel}/>
    </div>
  )
}

export default App;
