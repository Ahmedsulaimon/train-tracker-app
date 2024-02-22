import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaTrainSubway } from "react-icons/fa6";
function Timeline({ location, eventTypes }) {
  console.log(trainJourney);
  return (
    <div className="overflow-y-auto touch-pan-y h-80 w-[500px] experience">
      <VerticalTimeline lineColor="#000">
        {trainJourney &&
          trainJourney.map((journey) => (
            <VerticalTimelineElement
              className="vertical-timeline-element--education"
              iconStyle={{ background: "#000", color: "#fff" }}
              icon={<FaTrainSubway />}
              date={
                <span style={{ padding: "40px" }}>
                  {journey.plannedDeparture}
                </span>
              }
            >
              <h3 style={{ fontSize: "larger", fontWeight: "bold" }}>
                {journey.location}
              </h3>
              <div>
                {trainJourney &&
                  journey.eventTypes &&
                  journey.eventTypes.map((e) => <p>{e}</p>)}
              </div>
            </VerticalTimelineElement>
          ))}
        {/* <VerticalTimelineElement
          className="vertical-timeline-element--education"
          iconStyle={{ background: "#000", color: "#fff" }}
          icon={<FaTrainSubway />}
          date={<span style={{ padding: "40px" }}>2000-2014</span>}
        >
          <h3 style={{ fontSize: "larger", fontWeight: "bold" }}>Domain</h3>
          <p>journey from different tiploc</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          iconStyle={{ background: "#000", color: "#fff" }}
          icon={<FaTrainSubway />}
          date={<span style={{ padding: "40px" }}>2000-2014</span>}
        >
          <h3 style={{ fontSize: "larger", fontWeight: "bold" }}>Domain</h3>
          <p>journey from different tiploc</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          iconStyle={{ background: "#000", color: "#fff" }}
          icon={<FaTrainSubway />}
          date={<span style={{ padding: "40px" }}>2000-2014</span>}
        >
          <h3 style={{ fontSize: "larger", fontWeight: "bold" }}>Domain</h3>
          <p>journey from different tiploc</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          iconStyle={{ background: "#000", color: "#fff" }}
          icon={<FaTrainSubway />}
          date={<span style={{ padding: "40px" }}>2000-2014</span>}
        >
          <h3 style={{ fontSize: "larger", fontWeight: "bold" }}>Domain</h3>
          <p>journey from different tiploc</p>
        </VerticalTimelineElement> */}
      </VerticalTimeline>
    </div>
  );
}

export default Timeline;
