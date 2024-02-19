import { useEffect, useState } from "react";
import { SetStateFunction } from "../types/utilities";
import { postJSONAssessment } from "../api/api";
import { FingersStrengthAssesment, SensorData } from "../types/models";

export const Modal = ({
  isModalOpen,
  setIsModalOpen,
  sensorData,
  fingersAssesment,
}: {
  isModalOpen: boolean;
  setIsModalOpen: SetStateFunction<boolean>;
  sensorData: SensorData;
  fingersAssesment: FingersStrengthAssesment;
}) => {
  const [email, setEmail] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    if (!isModalOpen) {
      setEmail("");
      setSubmitMessage("");
    }
  }, [isModalOpen]);

  return (
    <div
      id="authentication-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        isModalOpen ? "" : "hidden"
      }  overflow-y-auto overflow-x-hidden fixed flex top-0 bg-black opacity-90 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Save your finger assessment
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="authentication-modal"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="your@email.com"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <button
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={(e) => {
                  e.preventDefault();
                  if (email === "") {
                    setSubmitMessage("Please enter your email");
                    return;
                  }

                  if (
                    !email.match(
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                    )
                  ) {
                    setSubmitMessage("Please enter a valid email");
                    return;
                  }

                  const data = {
                    ...fingersAssesment,
                    ...sensorData,
                    user: btoa(email),
                  };

                  const submitAssessment = async () => {
                    const result = await postJSONAssessment(data);
                    console.log("result", result);
                    if (result.status === "success") {
                      setSubmitMessage("Assessment saved successfully!");
                      return;
                    }

                    setSubmitMessage("Something went wrong!");
                  };

                  submitAssessment();
                }}
              >
                Save
              </button>
              <div className="text-sm font-medium text-gray-500">
                {submitMessage}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
