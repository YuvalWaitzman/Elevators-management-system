import { createSlice, configureStore } from "@reduxjs/toolkit";
import { chooseRandomFromArray } from "../Helpers/helper";
import sound from "../ding-47489.mp3";
const audio = new Audio(sound);

const initialState = {
  size: { floors: 10, elevators: 5 },
  elevators: [],
  buttons: [],
  callQueue: [],
  anyElevatorAvailable: true,
  occupiedElevatorsCounter: 0,
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

//CREATE BUTTON OBJECTS BASED ON NUMBER OF FLOORS
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

      state.callQueue.push(newCall);
      if (state.callQueue.isEmpty) {
        state.callQueue.isEmpty = false;
      }
      state.buttons[action.payload].status = "Waiting";
    },

    assignElevator(state, action) {
      let minDistance = state.buttons.length;
      let bestElevators = [];
      let bestElevator;
      let currentCall = action.payload;

      state.elevators.forEach((elevator) => {
        if (elevator.status === "available") {
          let currentElevatorDistance = Math.abs(
            elevator.currentFloor - currentCall.floor
          );
          if (currentElevatorDistance < minDistance) {
            minDistance = currentElevatorDistance;
            bestElevators = [elevator]; // clear the array and add the current elevator
          } else if (currentElevatorDistance === minDistance) {
            bestElevators.push(elevator); // add the current elevator to the array
          }
        }
      });
      //TODO: unite 2 cases
      bestElevator = chooseRandomFromArray(bestElevators);
      //CHOSEN ELEVATOR IS TAKING THE CALL

      state.elevators[bestElevator.id - 1].status = "active";
      state.occupiedElevatorsCounter++;
      if (state.occupiedElevatorsCounter === state.elevators.length) {
        state.anyElevatorAvailable = false;
      }
      state.elevators[bestElevator.id - 1].destinationFloor = currentCall.floor;
    },
    elevatorArrivedSameFloor(state, action) {
      state.elevators[action.payload.elevator - 1].status = "idle";
      state.buttons[action.payload.button].status = "Arrived";
      audio.play();
    },

    elevatorArrived(state, action) {
      state.elevators[action.payload.elevator - 1].status = "idle";
      state.elevators[action.payload.elevator - 1].currentFloor =
        state.elevators[action.payload.elevator - 1].destinationFloor;

      state.elevators[action.payload.elevator - 1].destinationFloor = null;
      state.buttons[action.payload.button].status = "Arrived";

      audio.play();
    },

    changeStatusAfterTwoSec(state, action) {
      state.elevators[action.payload.elevator - 1].status = "available";
      state.occupiedElevatorsCounter--;
      state.anyElevatorAvailable = true;
      state.buttons[action.payload.button].status = "Call";
    },

    // updateCallQueue(state, action) {
    //   state.callQueue = action.payload;
    // },

    dequeue(state) {
      const newQueue = state.callQueue.slice(1);
      state.callQueue = newQueue;
    },
  },
});

const store = configureStore({ reducer: elevatorSystemSlice.reducer });

export default store;

export const elevatorSystemActions = elevatorSystemSlice.actions;
