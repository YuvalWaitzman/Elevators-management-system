import React from "react";
import Header from "./Components/Header";
import Building from "./Components/Building";
import styled from "styled-components";

const PageWrapper = styled.div`
  background-color: white;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Container = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  width: 80vw;
  height: 85vh;
  margin-top: 65px;
`;

function App() {
  return (
    <>
      <PageWrapper>
        <Header />
        <Container>
          <Building />
        </Container>
      </PageWrapper>
    </>
  );
}

export default App;
