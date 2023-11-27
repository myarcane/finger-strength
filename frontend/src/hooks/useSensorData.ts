import { useEffect, useRef, useState } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import { FingersStrengthAssesment, SensorData } from "../types/models";

const host = import.meta.env.PROD ? window.location.host : "192.168.0.22:8000";

export const useSensorData = ({
  fingersAssesment,
}: {
  fingersAssesment: FingersStrengthAssesment;
}) => {
  const ws = useRef<ReconnectingWebSocket>();
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    //Send request to our websocket server using the "/request" path
    console.log("Connecting to websocket server");
    ws.current = new ReconnectingWebSocket(`ws://${host}/api/ws`);

    ws.current.onmessage = (e: MessageEvent) => {
      console.log("message event", e.data);
      const weight = Math.round(
        parseFloat((e.data as string).replace("kg", "").trim())
      );

      if (weight > 0) {
        setSensorData((prevData) => {
          return [
            ...prevData,
            {
              id: Date.now().toString(),
              weight,
            },
          ];
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

  useEffect(() => {
    // we clear the sensor data if the user changes
    // the assesment config
    setSensorData([]);
  }, [fingersAssesment]);

  return { sensorData, setSensorData };
};
