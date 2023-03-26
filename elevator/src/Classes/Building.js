class Building {
  constructor(floorsNum, elevatorsNum) {
    this.floors = floorsNum;
    this.elevatorsNumber = elevatorsNum;
    this.elevators = [];
    this.buttons = [];
  }
}

export default Building;
