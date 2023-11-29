import { useEffect, useRef, useState } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import { FingersStrengthAssesment, SensorData } from "../types/models";
import { wsSensorUrl } from "../api/api";

export const useSensorData = ({
  hand,
  grip,
  type,
  bodyWeightUnit,
}: FingersStrengthAssesment) => {
  const ws = useRef<ReconnectingWebSocket>();
  const [sensorData, setSensorData] = useState<SensorData>({
    maxMVC: 0,
    plot: [],
  });

  useEffect(() => {
    //Send request to our websocket server using the "/request" path
    console.log("Connecting to websocket server");
    ws.current = new ReconnectingWebSocket(wsSensorUrl);

    ws.current.onmessage = (e: MessageEvent) => {
      console.log("message event", e.data);
      let weight = Number(
        parseFloat((e.data as string).replace("kg", "").trim())
      );

      weight =
        bodyWeightUnit === "lb"
          ? Number((weight * 2.20462).toFixed(1))
          : Number(weight.toFixed(1));

      if (weight > 1) {
        setSensorData((prevData) => {
          return {
            maxMVC: Math.max(prevData.maxMVC, weight),
            plot: [
              ...prevData.plot,
              {
                id: Date.now().toString(),
                weight,
              },
            ],
          };
        });
      }
    };

    ws.current.onclose = () => {
      console.log("Client socket close!");
    };

    ws.current.onerror = (error) => {
      console.log("Socket Error: ", error);
    };

    return () => {
      console.log("Cleaning up");
      ws.current?.close();
    };
  }, []);

  // we clear the sensor data if grip, hand or assesment type changes
  useEffect(() => {
    setSensorData({
      maxMVC: 0,
      plot: [],
    });
  }, [hand, grip, type]);

  // convert the sensor data to lb or kg if the body weight units changes
  useEffect(() => {
    if (sensorData.plot.length) {
      if (bodyWeightUnit === "lb") {
        setSensorData({
          maxMVC: Number((sensorData.maxMVC * 2.20462).toFixed(1)),
          plot: sensorData.plot.map((data) => {
            data.weight = Number((data.weight * 2.20462).toFixed(1));
            return data;
          }),
        });
      } else {
        setSensorData({
          maxMVC: Number((sensorData.maxMVC / 2.20462).toFixed(1)),
          plot: sensorData.plot.map((data) => {
            data.weight = Number((data.weight / 2.20462).toFixed(1));
            return data;
          }),
        });
      }
    }
  }, [bodyWeightUnit]);

  return { sensorData, setSensorData };
};
