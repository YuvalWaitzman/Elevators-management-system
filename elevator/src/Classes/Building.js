import Elevator from "./Elevator";
import Button from "./../Components/Button";
import TableCell from "./../Components/TableCell";
import styled from "styled-components";

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
        cols.push(<span>Ground Floor </span>);
      } else if (i === 2) {
        cols.push(<span>{i - 1}st </span>);
      } else if (i === 3) {
        cols.push(<span>{i - 1}nd </span>);
      } else if (i === 4) {
        cols.push(<span>{i - 1}rd </span>);
      } else {
        cols.push(<span>{i - 1}th</span>);
      }

      for (let j = 1; j <= this.elevatorsNumber; j++) {
        cols.push(<TableCell> </TableCell>);

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
