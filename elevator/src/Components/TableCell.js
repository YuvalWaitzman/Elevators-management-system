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
  const elevatorStatus = elevators[props.id[1] - 1].status;

  return (
    <StyledTableCell id={props.id}>
      {props.isLastRow && (
        <ImgContainer>
          <ElevatorImg
            color={
              elevatorStatus === "available"
                ? "black"
                : elevatorStatus === "active"
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
