import Elevator from "./Elevator";
import Button from "../Components/Button";
import TableCell from "../Components/TableCell";
import styled from "styled-components";

const StyledSpan = styled.span`
  display: flex;
  margin-left: 60px;
`;

class Building {
  constructor(floors, elevatorsNumber) {
    this.floors = floors;
    this.elevatorsNumber = elevatorsNumber;
    this.elevators = [];
  }

  initiateElevators() {
    for (let i = 0; i < this.elevatorsNumber; i++) {
      this.elevators.push(new Elevator());
    }
  }

  renderBuilding() {
    const rows = [];
    for (let i = this.floors; i >= 1; i--) {
      const cols = [];
      if (i === 1) {
        cols.push(<span> Ground Floor </span>);
      } else if (i === 2) {
        cols.push(<StyledSpan>{i - 1}st </StyledSpan>);
      } else if (i === 3) {
        cols.push(<StyledSpan>{i - 1}nd </StyledSpan>);
      } else if (i === 4) {
        cols.push(<StyledSpan>{i - 1}rd </StyledSpan>);
      } else {
        cols.push(<StyledSpan>{i - 1}th</StyledSpan>);
      }

      for (let j = 1; j <= this.elevatorsNumber; j++) {
        if (i === 1) {
          cols.push(
            <TableCell>
              <img src="C:\Users\yuvalwa\Desktop\Arbox\icons8-elevator.svg/></TableCell" />
            </TableCell>
          );
        } else {
          cols.push(<TableCell></TableCell>);
        }

        if (j === this.elevatorsNumber) {
          cols.push(<Button>Call</Button>);
        }
      }
      rows.push(<tr>{cols}</tr>);
    }

    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default Building;
