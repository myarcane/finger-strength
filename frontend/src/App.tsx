import { useState } from "react";
import { FingersStrengthAssesment } from "./types/models";
import { SensorChart } from "./components/SensorChart";
import { SideMenu } from "./components/SideMenu";
import { Modal } from "./components/Modal";
import { useSensorData } from "./hooks/useSensorData";

function App() {
  const [fingersAssesment, setFingersAssesment] =
    useState<FingersStrengthAssesment>({
      type: "Max Finger Strength",
      hand: "Right Hand",
      grip: "Half Crimp",
      bodyWeight: 70,
      bodyWeightUnit: "kg",
    });

  const [isMenuVisible, setMenuVisibility] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { sensorData, setSensorData } = useSensorData(fingersAssesment);

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
        setIsModalOpen={setIsModalOpen}
        setSensorData={setSensorData}
        sensorData={sensorData}
      />
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        sensorData={sensorData}
        fingersAssesment={fingersAssesment}
      />
    </>
  );
}

export default App;
