import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { elevatorSystemActions } from "../../Store";

//Styled button colored conditionally with props
const CallButton = styled.button`
  background-color: ${(props) =>
    props.status === "Call"
      ? "green"
      : props.status === "Waiting"
      ? "red"
      : "white"};
  border-radius: 8px;
  border-color: ${(props) =>
    props.status === "Call" || props.status === "Arrived" ? "green" : "red"};
  color: ${(props) =>
    props.status === "Call" || props.status === "Waiting" ? "white" : "green"};
  margin-right: 4px;
  margin-left: 8px;
  margin-top: 15px;
  cursor: pointer;
  font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif;
  display: block;
  align-items: center;
  flex-direction: row;
  text-align: center;
  font-weight: ${(props) =>
    props.status === "Call" || props.status === "Waiting" ? "normal" : "bold"};
  transition: all 250ms;
  border: 2;
  font-size: 12px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 4rem;
  height: 2rem;
  :hover {
    transform: scale(1.03);
  }
`;

const Button = function (props) {
  const buttons = useSelector((state) => state.buttons);
  const dispatch = useDispatch();
  let buttonStatus = buttons[props.id].status;

  const clickHandler = () => {
    if (buttonStatus === "Call") {
      dispatch(elevatorSystemActions.createCall(props.id));
    }
  };

  return (
    <>
      <CallButton status={buttonStatus} onClick={clickHandler}>
        {buttonStatus === "Call"
          ? "Call"
          : buttonStatus === "Waiting"
          ? "Waiting"
          : "Arrived"}
      </CallButton>
    </>
  );
};

export default Button;
