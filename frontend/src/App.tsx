import { useState } from "react";
import { FingersStrengthAssesment } from "./types/models";
import { SensorChart } from "./components/SensorChart";
import { SideMenu } from "./components/SideMenu";

function App() {
  const [fingersAssesment, setFingersAssesment] =
    useState<FingersStrengthAssesment>({
      type: "Max Finger Strength",
      hand: "Right Hand",
      grip: "Half Crimp",
      bodyWeight: 70,
      bodyWeightUnits: "kg",
    });

  const [isMenuVisible, setMenuVisibility] = useState(true);

  return (
    <>
      <SideMenu
        fingersAssesment={fingersAssesment}
        setFingersAssesment={setFingersAssesment}
        isMenuVisible={isMenuVisible}
        setMenuVisibility={setMenuVisibility}
      />
      <SensorChart
        fingersAssesment={fingersAssesment}
        setMenuVisibility={setMenuVisibility}
      />
    </>
  );
}

export default App;
