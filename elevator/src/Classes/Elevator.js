class Elevator {
  constructor(status = "idle", currentFloor = 0) {
    this.status = status;
    this.currentFloor = currentFloor;
  }

  goTofloor(number) {
    this.currentFloor = number;
  }

  distanceFromCall(number) {
    return this.currentFloor - number;
  }
}

export default Elevator;
