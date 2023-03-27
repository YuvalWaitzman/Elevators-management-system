# Elevators Management System
This project is a React and JavaScript-based application designed to manage an elevators system. The goal of the project is to create a flexible and scalable solution that can accommodate buildings of any size, and take all elevators call by order. The core functionality of the system includes:

- Creating an extensible and responsive solution for managing elevator systems of any size and complexity.
- Implementing a call queue to track every user-generated elevator call and ensure that they are consumed in the order of submission, improving overall efficiency and     reducing wait times.
- Prioritizing elevators based on their distance from the floors where calls are made, in order to optimize response times and improve system performance.
- Creating a state updating system to manage the real-time status of elevator buttons and elevators with redux, ensuring that users are able to receive accurate information and that the system is able to respond quickly to changes in demand.

## Flow

1. Users click on the call buttons on a floor to request an elevator, which changes the button's status and color.
2. The system assigns the closest elevator to the call.
3. A timer appears on the floor to show when the elevator is expected to arrive.
4. The elevator arrives, and after a 2-second delay, it becomes available to respond to the next call.

## Technologies Used

### React.js
#### styled-components

#### Redux

## Implementation
- One of the key features of this app is a calls Queue maintained in the redux store, which allows the relevant elevators to consume each and every call in the right order. By adding the "isAnyElevatorAvailable" and the queue itself to the initial state, and using them as dependencies to a useEffect hook, the system is always aware if there is an unhandled call, and an available elevator to take it.

- The app can be easily modified to handle more elevators and floors by adjusting the initial state values.

- Each of the stages of a call life cycle is handled separately in the reducers.

## State Management
State management in this elevator simulation app is implemented using Redux.
The initial state of the system includes size,calls Queue, elevators and buttons arrays.
A redux slice is defined with 5 reducers in order to manage the state of the entire system:

1. The 'createCall' reducer is called when a button is clicked to call an elevator to a floor. It creates a new call object with a timestamp and floor number, pushes it onto the callQueue array in the state, and sets the button status to "Waiting".

2. The 'assignElevator' reducer is called when an elevator is assigned to a call, triggered with a useEffect hook which dispatch an action whenever the callQueue isn't empty and there are any eleavtors available. It chooses the available elevator with the shortest distance to the requested floor and sets its status to "occupied". It also updates the destinationFloor field of the chosen elevator with the floor number of the current call. If all elevators are occupied, it sets the anyElevatorAvailable field to false.

3. The 'elevatorArrived' reducer is called when an elevator arrives at a floor. It sets the elevator status to "braking", updates its currentFloor field to the destination floor, and sets the destinationFloor field to null. It also sets the button status to "Arrived" and plays a sound effect.

4. The changeStatusAfterTwoSec reducer is called two seconds after an elevator arrives at a floor. It sets the elevator status to "available", decrements the occupiedElevatorsCounter field, sets the 'anyElevatorAvailable' field to true if necessary, and sets the button status to "Call".

5. The 'dequeue' reducer is called when a call is completed it's process. It removes the first call object from the callQueue array in the state.




