import styled from "styled-components";
import ElevatorImg from "./ElevatorImg";
import { useSelector } from "react-redux";

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
  const elevator = elevators[props.id[1] - 1];

  return (
    <StyledTableCell id={props.id}>
      {props.isLastRow && (
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
