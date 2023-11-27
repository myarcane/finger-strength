import { FingersStrengthAssesment } from "../types/models";
import { SetStateFunction } from "../types/utilities";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSensorData } from "../hooks/useSensorData";

export const SensorChart = ({
  fingersAssesment,
  setMenuVisibility,
}: {
  fingersAssesment: FingersStrengthAssesment;
  setMenuVisibility: SetStateFunction<boolean>;
}) => {
  const { sensorData, setSensorData } = useSensorData({ fingersAssesment });

  const formatterY = (value: string) =>
    `${value}${fingersAssesment.bodyWeightUnits}`;
  const formatterX = (value: string) => `${parseInt(value) / 10}s`;
  const formatterBodyWeight = (value: string) =>
    `${Math.round((parseFloat(value) / fingersAssesment.bodyWeight) * 100)}%`;

  //Display the chart using rechart.js
  return (
    <>
      <button
        className="fixed top-2 left-6 py-2 px-4 border border-black rounded disabled:opacity-50"
        onClick={() => {
          setMenuVisibility(true);
        }}
      >{`Show Menu`}</button>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <h1 className="py-2">
          {`${fingersAssesment.type} - ${fingersAssesment.grip} - ${fingersAssesment.hand}`}
        </h1>
        <main className="h-3/4 w-full mt-2">
          <ResponsiveContainer>
            <LineChart
              width={800}
              height={400}
              data={sensorData}
              margin={{
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis tickFormatter={formatterX} />
              <YAxis yAxisId="left-axis" tickFormatter={formatterY} />
              <YAxis
                yAxisId="right-axis"
                tickFormatter={formatterBodyWeight}
                orientation="right"
              />
              {/* <Legend content={null} /> */}
              <Tooltip />
              <Line
                yAxisId="left-axis"
                type="monotone"
                dataKey="weight"
                stroke="#8884d8"
                activeDot={{ r: 24 }}
                strokeWidth="4"
              />
              <Line
                yAxisId="right-axis"
                type="monotone"
                dataKey="weight"
                label=""
                stroke="#8884d8"
                activeDot={{ r: 24 }}
                strokeWidth="4"
              />
              {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
          </ResponsiveContainer>
        </main>
        <div className="flex justify-end gap-x-10 w-full px-20">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 border border-blue-700 rounded disabled:opacity-50"
            onClick={() => {
              setSensorData([]);
            }}
          >
            clear
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 border border-blue-700 rounded disabled:opacity-50">
            save
          </button>
        </div>
      </div>
    </>
  );
};
