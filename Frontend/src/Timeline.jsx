import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaTrainSubway } from "react-icons/fa6";
function Timeline() {
  return (
    <div className="experience">
      <VerticalTimeline lineColor="#000">
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          iconStyle={{ background: "#000", color: "#fff" }}
          icon={<FaTrainSubway />}
          date="2000-2014"
        >
          <h3>domain</h3>
          <p>journey from different tiploc</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          iconStyle={{ background: "#000", color: "#fff" }}
          icon={<FaTrainSubway />}
          date="2000-2014"
        >
          <h3>domain</h3>
          <p>journey from different tiploc</p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
}

export default Timeline;
