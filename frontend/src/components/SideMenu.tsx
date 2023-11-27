import { FingersStrengthAssesmentProps } from "../types/models";
import { EnterBodyWeight } from "./EnterBodyWeight";
import { SelectAssesment } from "./SelectAssesment";
import { SelectGripType } from "./SelectGripType";
import { SelectHand } from "./SelectHand";
import { SelectWeightUnits } from "./SelectWeightUnits";
import { SetStateFunction } from "../types/utilities";

export const SideMenu = ({
  fingersAssesment,
  setFingersAssesment,
  isMenuVisible,
  setMenuVisibility,
}: FingersStrengthAssesmentProps & {
  isMenuVisible: boolean;
  setMenuVisibility: SetStateFunction<boolean>;
}) => {
  return (
    <>
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-80 h-screen p-4 overflow-y-auto transition-transform ${
          !isMenuVisible ? "-translate-x-full" : ""
        } bg-gray-800`}
        tabIndex={1}
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold text-white uppercase"
        >
          Menu
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-navigation"
          aria-controls="drawer-navigation"
          className="text-white bg-transparent hover:bg-gray-500 hover:text-white rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={() => {
            setMenuVisibility(false);
          }}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul>
            <SelectAssesment
              fingersAssesment={fingersAssesment}
              setFingersAssesment={setFingersAssesment}
            />
            <SelectGripType
              fingersAssesment={fingersAssesment}
              setFingersAssesment={setFingersAssesment}
            />
            <SelectHand
              fingersAssesment={fingersAssesment}
              setFingersAssesment={setFingersAssesment}
            />
            <SelectWeightUnits
              fingersAssesment={fingersAssesment}
              setFingersAssesment={setFingersAssesment}
            />
            <EnterBodyWeight
              fingersAssesment={fingersAssesment}
              setFingersAssesment={setFingersAssesment}
            />
          </ul>
        </div>
      </div>
    </>
  );
};
