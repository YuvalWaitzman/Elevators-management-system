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

  //GET THE CURRENT ELEVATOR WITH SLICE (TO ENABLE 2+ DIGIT NUMBER OF ELEVATORS)

  //cell 23
  const elevator = elevators[props.id.slice(1) - 1];
  const checkIfRenderElevator =
    elevator.currentFloor + props.id.slice(1) === props.id;
  console.log(
    elevators[props.id.slice(1) - 1].destinationFloor,
    props.id.slice(1)
  );
  const checkIfRenderTimer =
    buttons[props.id[0]].status === "Waiting" &&
    elevators[props.id.slice(1) - 1].destinationFloor === props.id[0];

  return (
    <StyledTableCell id={props.id}>
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
