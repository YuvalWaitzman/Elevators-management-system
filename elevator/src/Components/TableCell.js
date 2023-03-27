import styled from "styled-components";
import { useSelector } from "react-redux";
import Timer from "./Timer";
import Elevator from "./Elevator";

const ImgContainer = styled.div`
  text-align: center;
  /* margin-top: 5px; */
`;

const StyledTableCell = styled.td`
  border: 1px solid #a8a8a8;
  /* height: 40px; */
  width: 100px;
  height: 54px;
  vertical-align: tip;
`;

const TableCell = function (props) {
  const elevators = useSelector((state) => state.elevators);

  //Elevator relevant to this table cell
  const elevator = elevators[props.elevator - 1];

  const checkIfRenderElevator =
    String(elevator.currentFloor) + String(props.elevator) === props.id;

  console.log("Should render elevator?", checkIfRenderElevator);

  const checkIfRenderTimer =
    elevators[props.elevator - 1].status === "occupied" &&
    Number(elevators[props.elevator - 1].destinationFloor) ==
      Number(props.floor) &&
    elevators[props.elevator - 1].currentFloor !== props.floor;

  //Moving images logic here

  const shouldMove = elevator.status === "occupied";
  console.log("should move?", shouldMove, props.id);

  const isElevatorInSameFloor =
    Number(elevators[props.elevator - 1].currentFloor) === Number(props.floor);

  // elevator.destinationFloor &&
  // elevator.currentFloor !== elevator.destinationFloor;
  const difference = () => {
    console.log(
      "differnce between destination and current",
      (elevator.destinationFloor - elevator.currentFloor) * 118
    );
    return (elevator.destinationFloor - elevator.currentFloor) * 118;
  };

  return (
    <StyledTableCell
      floor={props.floor}
      elevator={props.elevator}
      id={props.id}
    >
      {!isElevatorInSameFloor && shouldMove && checkIfRenderTimer && <Timer />}
      {checkIfRenderElevator && (
        <ImgContainer>
          <Elevator
            difference={difference()}
            moving={shouldMove}
            destination={elevator.destinationFloor}
            currentFloor={elevator.currentFloor}
            color={
              elevator.status === "available"
                ? "black"
                : elevator.status === "occupied"
                ? "red"
                : "green"
            }
            id={props.elevator}
          />
        </ImgContainer>
      )}
    </StyledTableCell>
  );
};

export default TableCell;
