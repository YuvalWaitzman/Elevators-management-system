import { createSlice, configureStore } from "@reduxjs/toolkit";
import { chooseRandomFromArray } from "../Helpers/helper";

const initialState = {
  size: { floors: 20, elevators: 5 },
  elevators: [],
  buttons: [],
  callsQueue: {
    queue: [],
    isEmpty: true,
  },
};

// Create elevator objects based on the number of elevators
for (let i = 1; i <= initialState.size.elevators; i++) {
  initialState.elevators.push({
    id: i,
    currentFloor: 0,
    destinationFloor: null,
    status: "available",
  });
}

// Create button objects based on the number of floors
for (let i = 0; i < initialState.size.floors; i++) {
  initialState.buttons.push({
    id: i,
    status: "Call",
  });
}

const elevatorSystemSlice = createSlice({
  name: "elevator system",
  initialState,
  reducers: {
    createCall(state, action) {
      // console.log(`call created from button${action.payload}`);
      const newCall = { timeStamp: Date.now(), floor: action.payload };
      state.callsQueue.queue.push(newCall);
      if (state.callsQueue.isEmpty) {
        state.callsQueue.isEmpty = false;
      }
      state.buttons[action.payload].status = "Waiting";

      //choose the closest elevetor
      let minDistance = state.buttons.length;
      let bestElevators = [];
      let bestElevator;
      let currentCall = state.callsQueue.queue.shift();
      state.elevators.forEach((elevator) => {
        if (elevator.status === "available") {
          let currentElevatorDIstance = Math.abs(
            elevator.currentFloor - currentCall.floor
          );
          if (currentElevatorDIstance <= minDistance) {
            minDistance = currentElevatorDIstance;
            bestElevators.push(elevator);
          }
        }
      });

      //case one available elevator is closest
      if (bestElevators.length === 1) {
        [bestElevator] = bestElevators;
      }
      //case more than one available elevator are closest
      if (bestElevators.length > 1) {
        bestElevator = chooseRandomFromArray(bestElevators);
      }

      //Chosen elevator is taking the call, if statement cover the case that no elevator is available
      if (bestElevator) {
        state.elevators[bestElevator.id - 1].status = "active";
        state.elevators[bestElevator.id - 1].destinationFloor =
          currentCall.floor;
      }
    },

    elevatorArrived(state) {},
  },
});

const store = configureStore({ reducer: elevatorSystemSlice.reducer });

export default store;

export const elevatorSystemActions = elevatorSystemSlice.actions;
