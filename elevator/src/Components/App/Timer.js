import { useState, useEffect } from "react";
import styled from "styled-components";

const TimerContainer = styled.div`
  align-items: center;
  align-content: center;
  margin-left: 9px;
`;

const Timer = () => {
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  const elapsedSeconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  const timeString =
    minutes > 0 ? `${minutes} min. ${seconds} sec.` : `${seconds} Sec.`;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  return <TimerContainer>{timeString}</TimerContainer>;
};

export default Timer;
