import styled from "styled-components";
import AnimatedElevatorImg from "./ElevatorImg";
import { useSelector } from "react-redux";
import Timer from "./Timer";

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

  const elevator = elevators[props.elevator - 1];
  //WRITE EXPLANATION
  const checkIfRenderElevator =
    elevator.currentFloor + props.elevator == props.id;

  // console.log(elevators[props.elevator - 1].destinationFloor, props.floor);
  const checkIfRenderTimer =
    elevators[props.elevator - 1].status === "active" &&
    Number(elevators[props.elevator - 1].destinationFloor) ===
      Number(props.floor) &&
    elevators[props.elevator - 1].currentFloor !== props.floor;

  //Moving images logic here

  const isMoving = elevator.status === "active";

  // elevator.destinationFloor &&
  // elevator.currentFloor !== elevator.destinationFloor;

  const difference = () => {
    return (elevator.destinationFloor - elevator.currentFloor) * 118;
  };

  return (
    <StyledTableCell
      floor={props.floor}
      elevator={props.elevator}
      id={props.id}
      height={props.height}
    >
      {isMoving && checkIfRenderTimer && <Timer />}
      {checkIfRenderElevator && (
        <ImgContainer>
          <AnimatedElevatorImg
            difference={difference()}
            moving={isMoving}
            destination={elevator.destinationFloor}
            position={elevator.currentFloor}
            color={
              elevator.status === "available"
                ? "black"
                : elevator.status === "active"
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
