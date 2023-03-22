import Building from "../Classes/Building";

let BuildingComp = function () {
  const building = new Building(10, 5);
  building.initiateElevators();

  return <>{building.renderBuilding()}</>;
};

export default BuildingComp;
