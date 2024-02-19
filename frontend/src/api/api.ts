import { FingersStrengthAssesment, SensorData } from "../types/models";

const host = import.meta.env.PROD ? window.location.host : "192.168.0.22:8000";

export const wsSensorUrl = `ws://${host}/api/ws`;

export const postJSONAssessment = async (
  data: { user: String } & FingersStrengthAssesment & SensorData
): Promise<{ status: "success" | "error"; error?: Error }> => {
  try {
    const response = await fetch(`http://${host}/api/post-finger-assessment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response;
    console.log(result);
    return { status: "success" };
  } catch (error) {
    console.error(error);
    return { status: "error", error: error as Error };
  }
};
