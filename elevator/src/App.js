import React from "react";
import Header from "./Components/App/Header";
import Building from "./Components/App/Building";
import styled from "styled-components";
import LandingPage from "./Components/LandingPage/LandingPage";
import { useState } from "react";

const PageWrapper = styled.div`
  background-color: #f0fff0;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100vw;
  overflow: auto;
`;

const Container = styled.div`
  background-color: #f0fff0;
  display: flex;
  justify-content: center;
  width: 80vw;
  min-height: 85vh;
  margin-top: 65px;
`;

function App() {
  const [showApp, setShowApp] = useState(false);

  return (
    <>
      {showApp ? (
        <PageWrapper>
          <Header />
          <Container>
            <Building />
          </Container>
        </PageWrapper>
      ) : (
        <LandingPage onButtonClick={() => setShowApp(true)} />
      )}
    </>
  );
}

export default App;
