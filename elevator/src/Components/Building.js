import BuildingClass from "../Classes/BuildingClass";
import styled from "styled-components";
import TableCell from "./TableCell";
import Button from "./Button";
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

let Building = function () {
  const size = useSelector((state) => state.size);
  let callQueue = useSelector((state) => state.callQueue);
  const anyElevatorAvailable = useSelector(
    (state) => state.anyElevatorAvailable
  );
  const dispatch = useDispatch();
  // Creating a new building instance with the required measures from store
  const building = new BuildingClass(size.floors, size.elevators);

  for (let i = 0; i < building.floors; i++) {
    let buttonId = `${i}`;
    building.buttons.push(<Button id={buttonId}></Button>);
  }

  //Building rows and cols
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

    //Creating unique id for each cell based on column number and row number

    for (let j = 1; j <= building.elevatorsNumber; j++) {
      const cellId = `${i}${j}`;

      cols.push(<TableCell floor={i} elevator={j} id={cellId}></TableCell>);

      //Rendering the buttons
      if (j === building.elevatorsNumber) {
        cols.push(building.buttons[i]);
      }
    }
    rows.push(<tr>{cols}</tr>);
  }

  useEffect(() => {
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

export default Building;
