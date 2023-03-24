import { createSlice, configureStore } from "@reduxjs/toolkit";
import Elevator from "../Classes/Elevator";
import { chooseRandomFromArray } from "../Helpers/helper";

const initialState = {
  size: { floors: 10, elevators: 5 },
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

//CREATE BUTTOM OBJECTS BASED ON NUMBER OF FLOORS
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
      const newCall = { timeStamp: Date.now(), floor: action.payload };
      state.callsQueue.queue.push(newCall);
      if (state.callsQueue.isEmpty) {
        state.callsQueue.isEmpty = false;
      }
      state.buttons[action.payload].status = "Waiting";

      //CHOOSE BEST ELEVATOR
      let minDistance = state.buttons.length;
      let bestElevators = [];
      let bestElevator;
      let currentCall = state.callsQueue.queue[0];
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

      //CASE ONE AVAILABLE BEST ELEVATOR
      if (bestElevators.length === 1) {
        [bestElevator] = bestElevators;
      }
      //CASE MORE THAN ONE AVAILABLE BEST ELEVATOR
      if (bestElevators.length > 1) {
        bestElevator = chooseRandomFromArray(bestElevators);
      }

      //CHOSEN ELEVATOR IS TAKING THE CALL
      if (bestElevator) {
        state.callsQueue.queue.shift();
        state.elevators[bestElevator.id - 1].status = "active";
        state.elevators[bestElevator.id - 1].destinationFloor =
          currentCall.floor;
      }
    },

    elevatorArrived(state) {
      //  1. PRESENT TIME PASSED FROM BUTTON PUSHED
      //  2. CHANGE COLOR OF ELEVATOR
      //  3. SOUND EFFECT WHEN REACHING THE FLOOR
      //  4. 2 SECONDS OF REMAINING IN ARRIVED STATUS BEFORE MOVING TO AVAILABLE
      //  5.SETTING DESTINATION FIELD TO NULL WHILE RESTING
    },
  },
});

const store = configureStore({ reducer: elevatorSystemSlice.reducer });

export default store;

export const elevatorSystemActions = elevatorSystemSlice.actions;
