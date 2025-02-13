import { waypoints } from "../config.js";

let currentWaypointIndex = 0;
let arrow;

AFRAME.registerComponent('navigate-waypoints', {
  init: function () {
    arrow = document.querySelector("#arrow");
    this.el.addEventListener("markerFound", (e) => {
      console.log("Start Marker Found");
      arrow.setAttribute("visible", true);
      this.updateArrow();
    });
    this.el.addEventListener("markerLost", (e) => {
      console.log("Start Marker Lost");
      arrow.setAttribute("visible", false);
    });
  },
  tick: function () {
    if (arrow && arrow.getAttribute("visible")) {
      this.updateArrow();
    }
  },
  updateArrow: function () {
    const currentWaypoint = waypoints[currentWaypointIndex];
    if (currentWaypoint && !currentWaypoint.reached) {
      const distance = this.calculateDistance(arrow.object3D.position, currentWaypoint.position);
      if (distance < 1) {
        currentWaypoint.reached = true;
        currentWaypointIndex++;
        console.log("Waypoint Reached. Moving to next waypoint.");
      } else {
        arrow.setAttribute("position", `${currentWaypoint.position.x} 0 ${currentWaypoint.position.z}`);
      }
    } else if (currentWaypointIndex >= waypoints.length) {
      console.log("Destination Reached!");
      arrow.setAttribute("visible", false);
    }
  },
  calculateDistance: function (pos1, pos2) {
    const dx = pos1.x - pos2.x;
    const dz = pos1.z - pos2.z;
    return Math.sqrt(dx * dx + dz * dz);
  }
});
