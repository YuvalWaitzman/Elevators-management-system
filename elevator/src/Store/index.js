import { createSlice, configureStore } from "@reduxjs/toolkit";
import { chooseRandomFromArray } from "../Helpers/helper";
import sound from "../ding-47489.mp3";
const audio = new Audio(sound);

//Defining initial state values
const initialState = {
  size: { floors: 10, elevators: 5 },
  elevators: [],
  buttons: [],
  callQueue: [],
  anyElevatorAvailable: true,
  occupiedElevatorsCounter: 0,
};

// Creating elevator objects according to the the number of elevators from initial state
for (let i = 1; i <= initialState.size.elevators; i++) {
  initialState.elevators.push({
    id: i,
    currentFloor: 0,
    destinationFloor: null,
    status: "available",
  });
}

//Creating button objects according to the number of floors from initial state
for (let i = 0; i < initialState.size.floors; i++) {
  initialState.buttons.push({
    id: i,
    status: "Call",
  });
}

//Creating elevator system slice - with 5 reducers
const elevatorSystemSlice = createSlice({
  name: "elevator system",
  initialState,
  reducers: {
    // Creating a call object and inserting into the queue - trigerred with a click on one of the buttons
    createCall(state, action) {
      console.log("call created");
      const newCall = { timeStamp: Date.now(), floor: action.payload };

      state.callQueue.push(newCall);

      state.buttons[action.payload].status = "Waiting";
    },

    // Choosing the available elevator with the min distance from requested floor
    assignElevator(state, action) {
      console.log("assignin elevator process starting..");

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

      bestElevator = chooseRandomFromArray(bestElevators);

      //Chosen elevator is taking the call + updating the occupied elevators counter

      state.elevators[bestElevator.id - 1].status = "occupied";
      state.occupiedElevatorsCounter++;

      //If all elevators are occupied - updating any elevator available to false
      if (state.occupiedElevatorsCounter === state.elevators.length) {
        state.anyElevatorAvailable = false;
      }
      state.elevators[bestElevator.id - 1].destinationFloor = currentCall.floor;
    },

    //After amimation ends - Changing elevator and button status, updating floor fields activating sound effect
    elevatorArrived(state, action) {
      state.elevators[action.payload.elevator - 1].status = "braking";
      state.elevators[action.payload.elevator - 1].currentFloor =
        state.elevators[action.payload.elevator - 1].destinationFloor;

      state.elevators[action.payload.elevator - 1].destinationFloor = null;
      state.buttons[action.payload.button].status = "Arrived";

      audio.play();
    },

    //Changing button and elevator status 2 seconds after reaching a floor
    changeStatusAfterTwoSec(state, action) {
      state.elevators[action.payload.elevator - 1].status = "available";
      state.occupiedElevatorsCounter--;
      state.anyElevatorAvailable = true;
      state.buttons[action.payload.button].status = "Call";
    },

    //Taking the call out of the queue after process has finished
    dequeue(state) {
      const newQueue = state.callQueue.slice(1);
      state.callQueue = newQueue;
    },
  },
});

const store = configureStore({ reducer: elevatorSystemSlice.reducer });

export default store;

export const elevatorSystemActions = elevatorSystemSlice.actions;
