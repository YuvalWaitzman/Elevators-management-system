import Building from "../Classes/Building";
import styled from "styled-components";
import TableCell from "./TableCell";
import Button from "../Components/Button";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { elevatorSystemActions } from "../Store";

const BuildingContainer = styled.div`
  margin-top: 5px;
  margin-right: 40px;
`;
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

let BuildingComp = function () {
  const size = useSelector((state) => state.size);
  let callQueue = useSelector((state) => state.callQueue);
  const elevators = useSelector((state) => state.elevators);
  const anyElevatorAvailable = useSelector(
    (state) => state.anyElevatorAvailable
  );
  const dispatch = useDispatch();

  //CREATING A NEW BUILDING INSTANCE WITH THE REQUIRED MEASURES FROM STORE
  const building = new Building(size.floors, size.elevators);
  building.initiateElevators();
  for (let i = 0; i < building.floors; i++) {
    let buttonId = `${i}`;
    building.buttons.push(<Button id={buttonId}></Button>);
  }

  //BUILD ROWS AND COLS FOR FINAL BUILDING GRID
  const rows = [];
  for (let i = building.floors - 1; i >= 0; i--) {
    const cols = [];
    if (i === 0) {
      cols.push(<StyledSpanGround> Ground Floor </StyledSpanGround>);
    } else if (i === 1) {
      cols.push(<StyledSpan>{i}st </StyledSpan>);
    } else if (i === 2) {
      cols.push(<StyledSpan>{i}nd </StyledSpan>);
    } else if (i === 3) {
      cols.push(<StyledSpan>{i}rd </StyledSpan>);
    } else {
      cols.push(<StyledSpan>{i}th</StyledSpan>);
    }

    for (let j = 1; j <= building.elevatorsNumber; j++) {
      const cellId = `${i}${j}`;

      cols.push(<TableCell floor={i} elevator={j} id={cellId}></TableCell>);

      if (j === building.elevatorsNumber) {
        cols.push(building.buttons[i]);
      }
    }
    rows.push(<tr>{cols}</tr>);
  }

  useEffect(() => {
    console.log(
      "use effect - checking if elevators available and queue not empty"
    );
    //Case queue is not empty and there are any available elevators
    if (callQueue.length > 0 && anyElevatorAvailable) {
      const dequeuedCall = callQueue[0];
      dispatch(elevatorSystemActions.assignElevator(dequeuedCall));
      dispatch(elevatorSystemActions.dequeue());
    }
  }, [callQueue, anyElevatorAvailable]);

  return (
    <BuildingContainer>
      <table>
        <tbody>{rows}</tbody>
      </table>
    </BuildingContainer>
  );
};

export default BuildingComp;
function isElevatorAvailable(elevators) {
  elevators.forEach((elevator) => {
    if (elevator.status === "available") {
      return true;
    }
  });
  return false;
}
