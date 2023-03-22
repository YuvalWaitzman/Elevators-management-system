import Building from "../Classes/Building";
import styled from "styled-components";

const BuildingContainer = styled.div`
  margin-top: 10px;
  margin-right: 70px;
`;

let BuildingComp = function () {
  const building = new Building(10, 5);
  building.initiateElevators();

  return <BuildingContainer>{building.renderBuilding()}</BuildingContainer>;
};

export default BuildingComp;
