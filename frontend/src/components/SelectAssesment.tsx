import { useState } from "react";
import { FingersStrengthAssesmentProps } from "../types/models";

export const SelectAssesment = ({
  fingersAssesment,
  setFingersAssesment,
}: FingersStrengthAssesmentProps) => {
  const [isAssesmentsMenuVisible, setAssesmentMenuVisibility] = useState(false);
  const isMaxFingerStrength = fingersAssesment.type === "Max Finger Strength";

  return (
    <li>
      <button
        type="button"
        className="flex items-center w-full p-2 text-base text-white rounded-lg group"
        aria-controls="dropdown-assesment-type"
        data-collapse-toggle="dropdown-assesment-type"
        onClick={() => {
          setAssesmentMenuVisibility(!isAssesmentsMenuVisible);
        }}
      >
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          📈 Fingers assesments
        </span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <ul
        id="dropdown-assesment-type"
        className={`py-2 space-y-2 ${!isAssesmentsMenuVisible ? "hidden" : ""}`}
      >
        <li
          className={`select-none cursor-pointer w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-gray-500 
                    ${isMaxFingerStrength ? "bg-gray-500" : ""}`}
          onClick={() => {
            setFingersAssesment({
              ...fingersAssesment,
              type: "Max Finger Strength",
            });
          }}
        >
          Max finger strength 10s
        </li>
        <li
          className={`select-none cursor-pointer w-full p-2 opacity-50 pointer-events-none text-white transition duration-75 rounded-lg pl-11 group hover:bg-gray-500 ${
            !isMaxFingerStrength ? "bg-gray-500" : ""
          }`}
          onClick={() => {
            setFingersAssesment({
              ...fingersAssesment,
              type: "Critical Force",
            });
          }}
        >
          Critical Force (not available yet)
        </li>
      </ul>
    </li>
  );
};
