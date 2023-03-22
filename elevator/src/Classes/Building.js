import Elevator from "./Elevator";
import Button from "./../Components/Button";

class Building {
  constructor(floors, elevatorsNumber) {
    this.floors = floors;
    this.elevatorsNumber = elevatorsNumber;
    this.elevators = [];
    this.buttons = [];
  }

  func() {
    console.log("button clicked");
  }

  initiateElevators() {
    for (let i = 0; i < this.elevatorsNumber; i++) {
      this.elevators.push(new Elevator());
    }
  }
}

export default Building;
