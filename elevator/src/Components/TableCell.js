import styled from "styled-components";
import ElevatorImg from "./ElevatorImg";

const ImgContainer = styled.div`
  text-align: center;
`;

const StyledTableCell = styled.td`
  border: 1px solid #a8a8a8;
  height: 30px;
  width: 100px;
`;

const TableCell = function (props) {
  return (
    <StyledTableCell id={props.id}>
      {props.isLastRow && (
        <ImgContainer>
          <ElevatorImg id={props.id[1]} />
        </ImgContainer>
      )}
    </StyledTableCell>
  );
};

export default TableCell;
