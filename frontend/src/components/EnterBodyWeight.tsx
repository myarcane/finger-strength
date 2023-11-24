import { FingersStrengthAssesment } from "../types/models";
import { SetStateFunction } from "../types/utilities";

export const EnterBodyWeight = ({
  fingersAssesment,
  setFingersAssesment,
}: {
  fingersAssesment: FingersStrengthAssesment;
  setFingersAssesment: SetStateFunction<FingersStrengthAssesment>;
}) => {
  return (
    <li className="space-y-2 font-medium">
      <div className="w-full p-2 text-base text-white rounded-lg group">
        <span className="ms-3 text-left rtl:text-right whitespace-nowrap">
          Enter Body Weight
        </span>
      </div>
      <div className="w-full flex items-center">
        <input
          type="text"
          id="floating_outlined"
          placeholder={fingersAssesment.bodyWeight!.toString()}
          className="block ml-5 px-2.5 pb-2.5 pt-2.5 w-1/4 text-sm text-gray-900 bg-white rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          maxLength={3}
          onKeyDown={(e) => {
            if (
              e.key.match(/[^0-9]/) &&
              e.key !== "Backspace" &&
              e.key !== "Delete"
            ) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            const bodyWeight = parseInt(e.target.value);
            if (isNaN(bodyWeight)) {
              setFingersAssesment({
                ...fingersAssesment,
                bodyWeight: 70,
              });
              e.target.placeholder = fingersAssesment.bodyWeight.toString();
            } else {
              setFingersAssesment({
                ...fingersAssesment,
                bodyWeight,
              });
            }
          }}
        />
        <span className="text-white ml-3">
          {fingersAssesment.bodyWeightUnits}
        </span>
      </div>
    </li>
  );
};
