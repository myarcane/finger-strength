import { FingersStrengthAssesmentProps } from "../types/models";

export const SelectHand = ({
  fingersAssesment,
  setFingersAssesment,
}: FingersStrengthAssesmentProps) => {
  return (
    <li className="space-y-2 font-medium">
      <div className="flex items-center w-full p-2 text-base text-white rounded-lg group">
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          🖐🏻 Hands
        </span>
      </div>
      <ul className="mt-2 list-none flex font-medium">
        <li className="inline-block mr-10 ml-10">
          <input
            checked={fingersAssesment.hand === "Left Hand"}
            id="default-radio-1"
            type="checkbox"
            value=""
            name="default-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            onClick={() => {
              setFingersAssesment({ ...fingersAssesment, hand: "Left Hand" });
            }}
          />
          <label
            htmlFor="default-radio-1"
            className="ms-2 text-sm font-medium text-white"
          >
            L
          </label>
        </li>
        <li className="inline-block">
          <input
            checked={fingersAssesment.hand === "Right Hand"}
            id="default-radio-2"
            type="checkbox"
            value=""
            name="default-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
            onClick={() => {
              setFingersAssesment({ ...fingersAssesment, hand: "Right Hand" });
            }}
          />
          <label
            htmlFor="default-radio-2"
            className="ms-2 text-sm font-medium text-white"
          >
            R
          </label>
        </li>
      </ul>
    </li>
  );
};
