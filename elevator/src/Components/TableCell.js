import keyframes from "styled-components";
import styled from "styled-components";
import AnimatedElevatorImg from "./ElevatorImg";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import Timer from "./Timer";

const ImgContainer = styled.div`
  text-align: center;
`;

const StyledTableCell = styled.td`
  border: 1px solid #a8a8a8;
  height: 30px;
  width: 100px;
`;

const TableCell = function (props) {
  const elevators = useSelector((state) => state.elevators);
  const buttons = useSelector((state) => state.buttons);

  const elevator = elevators[props.elevator - 1];

  const checkIfRenderElevator =
    elevator.currentFloor + props.elevator == props.id;

  const checkIfRenderTimer =
    buttons[props.floor].status === "Waiting" &&
    elevators[props.elevator - 1].destinationFloor == props.floor;

  //Moving images logic here

  // useEffect(() => {}, [elevator.destinationFloor]);
  const isMoving =
    elevator.currentFloor !== elevator.destinationFloor &&
    elevator.destinationFloor;

  return (
    <StyledTableCell i={props.floor} j={props.elevator} id={props.id}>
      {checkIfRenderTimer && <Timer />}
      {checkIfRenderElevator && (
        <ImgContainer>
          <AnimatedElevatorImg
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
