import { createSlice, configureStore } from "@reduxjs/toolkit";
import Elevator from "../Classes/Elevator";
import { chooseRandomFromArray } from "../Helpers/helper";
import sound from "../ding-47489.mp3";

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
      console.log(state.callsQueue.queue);
      if (state.callsQueue.isEmpty) {
        state.callsQueue.isEmpty = false;
      }
      state.buttons[action.payload].status = "Waiting";

      let minDistance = state.buttons.length;
      let bestElevators = [];
      let bestElevator;
      let currentCall = state.callsQueue.queue.shift();

      // CASE ONE OF THE ELEVATORS IN THE FLOOR
      // state.elevators.forEach((elevator) => {
      //   if (elevator.status === "available") {
      //     if (elevator.currentFloor === currentCall.floor) {
      //       bestElevators.push(elevator);
      //     }
      //   }
      // });
      // if (bestElevators.length > 1) {
      //   bestElevator = chooseRandomFromArray(bestElevators);
      // }
      // if (bestElevators.length === 1) {
      //   [bestElevator] = bestElevators;
      // }

      // if (bestElevator) {
      //   state.elevators[bestElevator.id - 1].status = "Arrived";

      //   // state.elevators[bestElevator.id - 1].destinationFloor =
      //   //   currentCall.floor;
      //   return;
      // }

      //CHOOSE BEST ELEVATOR

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
        state.elevators[bestElevator.id - 1].status = "active";
        state.elevators[bestElevator.id - 1].destinationFloor =
          currentCall.floor;
      }
    },

    elevatorArrived(state, action) {
      state.elevators[action.payload.elevator - 1].status = "idle";
      state.elevators[action.payload.elevator - 1].currentFloor =
        state.elevators[action.payload.elevator - 1].destinationFloor;

      state.elevators[action.payload.elevator - 1].destinationFloor = null;
      state.buttons[action.payload.button].status = "Arrived";

      // SOUND FILE SERVED FROM HTTP SERVER
      const audio = new Audio(sound);
      audio.play();
    },

    changeStatusAfterTwoSec(state, action) {
      state.elevators[action.payload.elevator - 1].status = "available";
      state.buttons[action.payload.button].status = "Call";
    },
  },
});

const store = configureStore({ reducer: elevatorSystemSlice.reducer });

export default store;

export const elevatorSystemActions = elevatorSystemSlice.actions;
