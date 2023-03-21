import Building from "../Classes/Building";
import styled from "styled-components";

let BuildingComp = function () {
  const building = new Building(10, 5);
  building.initiateElevators();

  // Create logic - to draw the build according to the floors and elevators in the current instance
  // floors - number of horizonal lines, elevators - number of vertical lines

  return <>{building.renderBuilding()}</>;
};

export default BuildingComp;
