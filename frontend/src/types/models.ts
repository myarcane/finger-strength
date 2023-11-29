import { SetStateFunction } from "./utilities";

type AssesmentType = "Max Finger Strength" | "Critical Force";
type HandType = "Left Hand" | "Right Hand";
type GripType =
  | "Half Crimp"
  | "Full Crimp"
  | "Three Finger Drag"
  | "Four Finger Drag";
type BodyWeightUnitType = "kg" | "lb";

type PlotData = {
  id: string;
  weight: number;
};

export type FingersStrengthAssesment = {
  type: AssesmentType;
  hand: HandType;
  grip: GripType;
  bodyWeightUnit: BodyWeightUnitType;
  bodyWeight: number;
};

export type FingersStrengthAssesmentProps = {
  fingersAssesment: FingersStrengthAssesment;
  setFingersAssesment: SetStateFunction<FingersStrengthAssesment>;
};

export type SensorData = {
  maxMVC: number;
  plot: PlotData[];
};
