import { useEffect, useState } from "react";
import { FingersStrengthAssesment, SensorData } from "./types/models";
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
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    // we clear the sensor data if the user changes
    // the assesment config
    setSensorData([]);
  }, [fingersAssesment]);

  return (
    <>
      <SideMenu
        fingersAssesment={fingersAssesment}
        setFingersAssesment={setFingersAssesment}
        isMenuVisible={isMenuVisible}
        setMenuVisibility={setMenuVisibility}
        setSensorData={setSensorData}
      />
      <SensorChart
        fingersAssesment={fingersAssesment}
        setMenuVisibility={setMenuVisibility}
        sensorData={sensorData}
        setSensorData={setSensorData}
      />
    </>
  );
}

export default App;
