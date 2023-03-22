import React from "react";
import Header from "./Components/Header";
import BuildingComp from "./Components/BuildingComp";
import styled from "styled-components";

const PageWrapper = styled.div`
  background-color: #f2f2f2;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Container = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  width: 80vw;
  height: 80vh;
  margin-top: 70px;
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
