import Building from "../Classes/Building";
import styled from "styled-components";
import TableCell from "./TableCell";
import Button from "../Components/Button";

const BuildingContainer = styled.div`
  margin-top: 10px;
  margin-right: 70px;
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
  //CREATING A NEW BUILDING INSTANCE WITH THE REQUIRES MEASURES
  const building = new Building(10, 5);
  building.initiateElevators();

  //click handler for trial

  let clickHandler = function (index) {
    console.log(index);
  };

  //Setting building.buttons with click event listener
  for (let i = 0; i < building.floors; i++) {
    building.buttons.push(
      <Button
        onClick={() => {
          clickHandler(i);
        }}
        id={i}
      >
        Call
      </Button>
    );
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
      if (i === 0) {
        //ground floor
        cols.push(<TableCell id={(i, j)} isLastRow="true"></TableCell>);
      } else {
        cols.push(<TableCell id={(i, j)} />);
      }
      if (j === building.elevatorsNumber) {
        cols.push(building.buttons[i]);
      }
    }
    rows.push(<tr>{cols}</tr>);
  }

  return (
    <BuildingContainer>
      <table>
        <tbody>{rows}</tbody>
      </table>
    </BuildingContainer>
  );
};

export default BuildingComp;
