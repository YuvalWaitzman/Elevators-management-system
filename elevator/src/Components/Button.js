import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { elevatorSystemActions } from "../Store/index";

const CallButton = styled.button`
  background-color: ${(props) =>
    props.status === "Call"
      ? "green"
      : props.status === "Wait"
      ? "red"
      : "yellow"};
  border-radius: 8px;
  color: white;
  margin-right: 4px;
  margin-left: 8px;
  margin-top: 15px;
  cursor: pointer;
  font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif;
  display: block;
  align-items: center;
  flex-direction: row;
  text-align: center;
  transition: all 250ms;
  border: 0;
  font-size: 12px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 3rem;
  height: 2rem;
  :hover {
    transform: scale(1.03);
  }
`;
const Button = function (props) {
  const buttons = useSelector((state) => state.buttons);
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(elevatorSystemActions.createCall(props.id));
  };
  let buttonStatus = buttons[props.id].status;

  return (
    <>
      <CallButton status={buttonStatus} id={props.id} onClick={clickHandler}>
        {buttonStatus === "Call"
          ? "Call"
          : buttonStatus === "Wait"
          ? "Wait"
          : "Arrived"}
      </CallButton>
    </>
  );
};

export default Button;
