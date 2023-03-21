import styled from "styled-components";

const CallButton = styled.button`
  /* background-color: ${(props) => props.color};
opacity: ${(props) =>
    props.filter === props.color || !props.filter ? "100%" : "55%"}; */
  background-color: green;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  /* display: inline-block; */
  font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif;
  display: flex;
  align-items: center;
  flex-direction: row;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 12px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  height: 2rem;
  :hover {
    transform: scale(1.03);
  }
`;

const Button = function () {
  return (
    <>
      <CallButton>Call</CallButton>
    </>
  );
};

export default Button;
