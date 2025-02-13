import { waypoints } from "../config.js";
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
        // Smooth Movement towards the waypoint
        this.moveArrow(currentWaypoint.position);
      }
    } else if (currentWaypointIndex >= waypoints.length) {
      console.log("Destination Reached!");
      arrow.setAttribute("visible", false);
    }
  },
  moveArrow: function (targetPosition) {
    const arrowPosition = arrow.object3D.position;
    const speed = 0.05;  // Adjust speed as needed

    // Calculate new position for smooth movement
    arrowPosition.x += (targetPosition.x - arrowPosition.x) * speed;
    arrowPosition.z += (targetPosition.z - arrowPosition.z) * speed;

    // Update arrow's position
    arrow.setAttribute("position", `${arrowPosition.x} 0.5 ${arrowPosition.z}`);

    // Rotate the arrow to face the next waypoint
    const angle = Math.atan2(targetPosition.z - arrowPosition.z, targetPosition.x - arrowPosition.x);
    arrow.setAttribute("rotation", `0 ${-THREE.Math.radToDeg(angle)} 0`);
  },
  calculateDistance: function (pos1, pos2) {
    const dx = pos1.x - pos2.x;
    const dz = pos1.z - pos2.z;
    return Math.sqrt(dx * dx + dz * dz);
  }
});

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
        // Smooth Movement towards the waypoint
        this.moveArrow(currentWaypoint.position);
      }
    } else if (currentWaypointIndex >= waypoints.length) {
      console.log("Destination Reached!");
      arrow.setAttribute("visible", false);
    }
  },
  moveArrow: function (targetPosition) {
    const arrowPosition = arrow.object3D.position;
    const speed = 0.05;  // Adjust speed as needed

    // Calculate new position for smooth movement
    arrowPosition.x += (targetPosition.x - arrowPosition.x) * speed;
    arrowPosition.z += (targetPosition.z - arrowPosition.z) * speed;

    // Update arrow's position
    arrow.setAttribute("position", `${arrowPosition.x} 0.5 ${arrowPosition.z}`);

    // Rotate the arrow to face the next waypoint
    const angle = Math.atan2(targetPosition.z - arrowPosition.z, targetPosition.x - arrowPosition.x);
    arrow.setAttribute("rotation", `0 ${-THREE.Math.radToDeg(angle)} 0`);
  },
  calculateDistance: function (pos1, pos2) {
    const dx = pos1.x - pos2.x;
    const dz = pos1.z - pos2.z;
    return Math.sqrt(dx * dx + dz * dz);
  }
});
