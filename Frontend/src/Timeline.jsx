// import React from "react";
// import {
//   VerticalTimeline,
//   VerticalTimelineElement,
// } from "react-vertical-timeline-component";
// import "react-vertical-timeline-component/style.min.css";
// import { FaTrainSubway } from "react-icons/fa6";
// function Timeline() {
//   return (
//     <div className="experience">
//       <VerticalTimeline lineColor="#000">
//         <VerticalTimelineElement
//           className="vertical-timeline-element--education"
//           iconStyle={{ background: "#000", color: "#fff" }}
//           icon={<FaTrainSubway />}
//           date="2000-2014"
//         >
//           <h3>domain</h3>
//           <p>journey from different tiploc</p>
//         </VerticalTimelineElement>

//         <VerticalTimelineElement
//           className="vertical-timeline-element--education"
//           iconStyle={{ background: "#000", color: "#fff" }}
//           icon={<FaTrainSubway />}
//           date="2000-2014"
//         >
//           <h3>domain</h3>
//           <p>journey from different tiploc</p>
//         </VerticalTimelineElement>
//       </VerticalTimeline>
//     </div>
//   );
// }

// export default Timeline;
// <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
// <TileLayer
//   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// />
// {data &&
//   data.allTrainSchedule &&
//   data.allTrainSchedule.flatMap((trainMovements, index) =>
//     trainMovements.map((movement, movementIndex) => (
//       <>
//         {/* <p> test{movement.latLong.latitude}</p> */}
//         {movement.latLong && (
//           <Marker
//             key={`${index}-${movementIndex}`}
//             position={[
//               movement.latLong.latitude,
//               movement.latLong.longitude,
//             ]}
//             // position={[51.505, -0.09]}
//           >
//             <Popup>
//               A pretty CSS3 popup for <br /> {movement.location}
//             </Popup>
//             {/* <Polyline
//           positions={[
//             movement.latLong.latitude,
//             movement.latLong.longitude,
//           ]}
//         /> */}
//           </Marker>
//         )}
//       </>
//     ))
//   )}
// </MapContainer>
