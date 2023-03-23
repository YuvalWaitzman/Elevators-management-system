import { createSlice, configureStore } from "@reduxjs/toolkit";
import Call from "./../Classes/Call";

// const slice = createSlice({
//   name: "counter",
//   initialState: { counter: 0 },
//   reducers: {
//     blabla(state, action) {
//       state.counter++;
//       console.log("incrementblabla", state.counter, action.payload);
//     },
//     kaka() {},
//   },
// });
// const store = configureStore({ reducer: slice.reducer });
// export const sliceActions = slice.actions;
// export default store;

const initialState = {
  elevators: [
    { id: 1, currentFloor: 0, destinationFloor: null, isActive: false },
    { id: 2, currentFloor: 0, destinationFloor: null, isActive: false },
    { id: 3, currentFloor: 0, destinationFloor: null, isActive: false },
    { id: 4, currentFloor: 0, destinationFloor: null, isActive: false },
    { id: 5, currentFloor: 0, destinationFloor: null, isActive: false },
  ],
  buttons: [
    { id: 0, status: "Call" },
    { id: 1, status: "Call" },
    { id: 2, status: "Call" },
    { id: 3, status: "Call" },
    { id: 4, status: "Call" },
    { id: 5, status: "Call" },
    { id: 6, status: "Call" },
    { id: 7, status: "Call" },
    { id: 8, status: "Call" },
    { id: 9, status: "Call" },
  ],

  callsQueue: {
    queue: [],
    isEmpty: true,
  },
};

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
      let bestElevator;
      let currentCall = state.callsQueue.queue.shift();
      state.elevators.forEach((elevator) => {
        if (!elevator.isActive) {
          let currentElevatorDIstance = Math.abs(
            elevator.currentFloor - currentCall.floor
          );
          if (currentElevatorDIstance <= minDistance) {
            minDistance = currentElevatorDIstance;
            bestElevator = elevator;
          }
        }
      });

      //Closest non active elevator is taking the call
      state.elevators[bestElevator.id - 1].isActive = true;

      // state.elevators[bestElevator.id].isActive = true;
      // state.elevators[bestElevator.id].destinationFloor = currentCall.floor;
    },

    elevatorArrived(state) {},
  },
});

const store = configureStore({ reducer: elevatorSystemSlice.reducer });

export default store;

export const elevatorSystemActions = elevatorSystemSlice.actions;
