import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaTrainSubway } from "react-icons/fa6";

function Timeline({ trainMovements }) {
  return (
    <div className="touch-pan-y experience leading-8">
      <VerticalTimeline lineColor="#000">
        {trainMovements.map((movement, movementIndex) => {
          // Extracting keys that are not metadata
          const movementKeys = Object.keys(movement).filter(
            (key) => !["tiploc", "location", "latLong"].includes(key)
          );

          // Generate movement details, assuming 'departure' and 'arrival' could be keys
          const movementDetails = movementKeys
            .map((key) => ({
              type: key,
              time: movement[key],
            }))
            .sort((a, b) => {
              // Ensure 'arrival' comes before 'departure'
              if (a.type === "arrival" && b.type === "departure") {
                return -1;
              }
              if (a.type === "departure" && b.type === "arrival") {
                return 1;
              }
              // If neither are 'arrival' or 'departure', or if they are the same, keep original order
              return 0;
            });

          return (
            <VerticalTimelineElement
              key={movementIndex}
              className="vertical-timeline-element--education"
              iconStyle={{ background: "#000", color: "#fff" }}
              icon={<FaTrainSubway />}
            >
              <div>
                <h3
                  style={{
                    fontSize: "small",
                    fontWeight: "bold",
                  }}
                >
                  {movement.location}
                </h3>
                <div className="flex flex-col border border-x-0 border-t-1 border-b-0 border-t-slate-300">
                  {movementDetails.map((detail, index) => (
                    <div key={index} className="px-4">
                      <p className="font-semibold text-sm text-blue-500">
                        {detail.type.charAt(0).toUpperCase() +
                          detail.type.slice(1)}{" "}
                        Time:
                      </p>
                      <span>{detail.time.match(/.{1,2}/g).join(":")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
}

export default Timeline;
