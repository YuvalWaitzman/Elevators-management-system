import Elevator from "./Elevator";

class Building {
  constructor(floors, elevatorsNumber) {
    this.floors = floors;
    this.elevatorsNumber = elevatorsNumber;
    this.elevators = [];
    this.buttons = [];
  }

  initiateElevators() {
    for (let i = 0; i < this.elevatorsNumber; i++) {
      this.elevators.push(new Elevator());
    }
  }
}

export default Building;
