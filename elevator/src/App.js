import React from "react";
import Header from "./Components/Header";
import BuildingComp from "./Components/BuildingComp";
import styled from "styled-components";
import ElevatorImg from "./Components/ElevatorImg";

const PageWrapper = styled.div`
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Container = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  width: 80vw;
  height: 80vh;
  margin-top: 120px;
  margin
`;
function App() {
  return (
    <>
      <PageWrapper>
        <Header />
        <Container>
          <BuildingComp />
        </Container>
      </PageWrapper>
    </>
  );
}

export default App;
