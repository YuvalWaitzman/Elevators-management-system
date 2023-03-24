import styled from "styled-components";
import ElevatorImg from "./ElevatorImg";
import { useSelector } from "react-redux";
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
  // const size = useSelector((state) => state.size);

  //GET THE CURRENT ELEVATOR WITH SLICE (TO ENABLE 2+ DIGIT NUMBER OF ELEVATORS)
  const elevator = elevators[props.elevator - 1];

  const checkIfRenderElevator =
    elevator.currentFloor + props.elevator == props.id;

  const checkIfRenderTimer =
    buttons[props.floor].status === "Waiting" &&
    elevators[props.elevator - 1].destinationFloor == props.floor;

  return (
    <StyledTableCell i={props.floor} j={props.elevator} id={props.id}>
      {checkIfRenderTimer && <Timer />}
      {checkIfRenderElevator && (
        <ImgContainer>
          <ElevatorImg
            position={elevator.currentFloor}
            color={
              elevator.status === "available"
                ? "black"
                : elevator.status === "active"
                ? "red"
                : "green"
            }
            id={props.id[1]}
          />
        </ImgContainer>
      )}
    </StyledTableCell>
  );
};

export default TableCell;
