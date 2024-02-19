import { FingersStrengthAssesmentProps } from "../types/models";

export const SelectWeightUnits = ({
  fingersAssesment,
  setFingersAssesment,
}: FingersStrengthAssesmentProps) => {
  return (
    <li>
      <div className="flex items-center w-full p-2 text-base text-white rounded-lg group">
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          ⚖️ Weight units
        </span>
      </div>
      <ul className="mt-2 list-none flex font-medium">
        <li className="inline-block mr-10 ml-10">
          <input
            checked={fingersAssesment.bodyWeightUnit === "lb"}
            id="default-radio-1"
            type="checkbox"
            value=""
            name="default-radio"
            className={`pointer-events-${
              fingersAssesment.bodyWeightUnit === "lb" ? "none" : "auto"
            } w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2`}
            onClick={() => {
              setFingersAssesment({
                ...fingersAssesment,
                bodyWeight: Math.round(fingersAssesment.bodyWeight * 2.20462),
                bodyWeightUnit: "lb",
              });
            }}
            onChange={() => {}}
          />
          <label
            htmlFor="default-radio-1"
            className="ms-2 text-sm font-medium text-white"
          >
            lb
          </label>
        </li>
        <li className="inline-block">
          <input
            checked={fingersAssesment.bodyWeightUnit === "kg"}
            id="default-radio-2"
            type="checkbox"
            value=""
            name="default-radio"
            className={`pointer-events-${
              fingersAssesment.bodyWeightUnit === "kg" ? "none" : "auto"
            } w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2`}
            onClick={() => {
              setFingersAssesment({
                ...fingersAssesment,
                bodyWeight: Math.round(fingersAssesment.bodyWeight / 2.20462),
                bodyWeightUnit: "kg",
              });
            }}
            onChange={() => {}}
          />
          <label
            htmlFor="default-radio-2"
            className="ms-2 text-sm font-medium text-white"
          >
            kg
          </label>
        </li>
      </ul>
    </li>
  );
};
