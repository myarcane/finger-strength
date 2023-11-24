import { useState } from "react";
import { FingersStrengthAssesment } from "../types/models";
import { SetStateFunction } from "../types/utilities";

export const SelectGripType = ({
  fingersAssesment,
  setFingersAssesment,
}: {
  fingersAssesment: FingersStrengthAssesment;
  setFingersAssesment: SetStateFunction<FingersStrengthAssesment>;
}) => {
  const [isGripTypeMenuVisible, setGripTypeMenuVisibility] = useState(false);

  const isFullCrimp = fingersAssesment.grip === "Full Crimp";
  const isHalfCrimp = fingersAssesment.grip === "Half Crimp";
  const isThreeFingerDrag = fingersAssesment.grip === "Three Finger Drag";
  const isFourFingerDrag = fingersAssesment.grip === "Four Finger Drag";

  return (
    <li>
      <button
        type="button"
        className="flex items-center w-full p-2 text-base text-white rounded-lg group"
        aria-controls="dropdown-grip-type"
        data-collapse-toggle="dropdown-grip-type"
        onClick={() => {
          setGripTypeMenuVisibility(!isGripTypeMenuVisible);
        }}
      >
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          🤏🏻 Grip type
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
        id="dropdown-grip-type"
        className={`py-2 space-y-2 ${!isGripTypeMenuVisible ? "hidden" : ""}`}
      >
        <li
          className={`select-none cursor-pointer w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-gray-500 
            ${isHalfCrimp ? "bg-gray-500" : ""}`}
          onClick={() => {
            setFingersAssesment({
              ...fingersAssesment,
              grip: "Half Crimp",
            });
          }}
        >
          Half Crimp
        </li>
        <li
          className={`select-none cursor-pointer w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-gray-500 ${
            isFullCrimp ? "bg-gray-500" : ""
          }`}
          onClick={() => {
            setFingersAssesment({
              ...fingersAssesment,
              grip: "Full Crimp",
            });
          }}
        >
          Full Crimp
        </li>
        <li
          className={`select-none cursor-pointer w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-gray-500 ${
            isThreeFingerDrag ? "bg-gray-500" : ""
          }`}
          onClick={() => {
            setFingersAssesment({
              ...fingersAssesment,
              grip: "Three Finger Drag",
            });
          }}
        >
          Three Finger Drag
        </li>
        <li
          className={`select-none cursor-pointer w-full p-2 text-white transition duration-75 rounded-lg pl-11 group hover:bg-gray-500 ${
            isFourFingerDrag ? "bg-gray-500" : ""
          }`}
          onClick={() => {
            setFingersAssesment({
              ...fingersAssesment,
              grip: "Four Finger Drag",
            });
          }}
        >
          Four Finger Drag
        </li>
      </ul>
    </li>
  );
};
