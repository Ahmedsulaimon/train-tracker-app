import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
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
          const movementDetails = movementKeys.map((key) => ({
            type: key,
            time: movement[key],
          }));

          return (
            <VerticalTimelineElement
              key={movementIndex}
              className="vertical-timeline-element--education"
              iconStyle={{ background: "#000", color: "#fff" }}
              icon={<FaTrainSubway />}
            >
              <div className="px-2">
                <h3
                  style={{
                    fontSize: "small",
                    fontWeight: "bold",
                  }}
                >
                  {movement.location}
                </h3>
                <div className="px-7 mt-1">
                  {movementDetails.map((detail, index) => (
                    <div key={index}>
                      <p className="font-semibold text-sm text-blue-500">
                        {detail.type.charAt(0).toUpperCase() +
                          detail.type.slice(1)}{" "}
                        Time:
                      </p>
                      <span>{detail.time || "--"}</span>
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

