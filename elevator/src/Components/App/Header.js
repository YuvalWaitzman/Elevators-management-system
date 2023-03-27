import styled from "styled-components";

const StyledHeader = styled.h1`
  display: grid;
  position: absolute;
  top: 0;
  background-color: #fffafa;
  width: 100%;
  padding: 1.5rem;
  color: black;
  text-align: center;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", "Geneva", Verdana, sans-serif;
  margin-bottom: 2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  height: 20px;
`;

const Header = function () {
  return <StyledHeader>Elevator System</StyledHeader>;
};
export default Header;
