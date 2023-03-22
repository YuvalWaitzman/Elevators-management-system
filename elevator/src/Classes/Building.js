import Elevator from "./Elevator";
import Button from "../Components/Button";
import TableCell from "../Components/TableCell";
import styled from "styled-components";
// import ElevatorImg from "../Components/ElevatorImg";

const StyledSpan = styled.span`
  display: flex;
  margin-left: 60px;
  font-weight: bold;
`;
const StyledSpanGround = styled.span`
  display: flex;
  margin-right: 10px;
  margin-left: 30px;
  text-align: center;
  font-weight: bold;
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
        cols.push(<StyledSpanGround> Ground Floor </StyledSpanGround>);
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
          //ground floor
          cols.push(<TableCell isLastRow="true"></TableCell>);
        } else {
          cols.push(<TableCell />);
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
