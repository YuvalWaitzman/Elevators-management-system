import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0fff0;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", "Geneva", Verdana, sans-serif;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", "Geneva", Verdana, sans-serif;
`;

const Button = styled.button`
  background-color: #1e90ff;
  color: #fff;
  font-size: 1.2rem;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  transition: all 250ms;

  &:hover {
    background-color: #0077b6;
    cursor: pointer;
    transform: scale(1.03);
  }
`;

function LandingPage(props) {
  return (
    <Container>
      <Title>Welcome to Yuval's Building!</Title>
      <Subtitle>Click the button if you wan't to click some more...</Subtitle>
      <Button onClick={props.onButtonClick}>Start App</Button>
    </Container>
  );
}

export default LandingPage;
