type AssesmentType = "Max Finger Strength" | "Critical Force";
type HandType = "Left Hand" | "Right Hand";
type GripType =
  | "Half Crimp"
  | "Full Crimp"
  | "Three Finger Drag"
  | "Four Finger Drag";
type BodyWeightUnitType = "kg" | "lb";

export type FingersStrengthAssesment = {
  type: AssesmentType;
  hand: HandType;
  grip: GripType;
  bodyWeightUnits: BodyWeightUnitType;
  bodyWeight: number;
};

export type SensorData = {
  id: string;
  weight: number;
};
