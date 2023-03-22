import styled from "styled-components";

const CallButton = styled.button`
  background-color: green;
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
  return (
    <>
      <CallButton id={props.id} onClick={props.onClick}>
        Call
      </CallButton>
    </>
  );
};

export default Button;
