import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { elevatorSystemActions } from "../Store";

// const moveElevator = (dif) => keyframes`
// 0% {
//   transform: translateY(0);
// }
// 100% {
//   transform: translateY(${dif > 0 ? "-" : ""}+${Math.abs(dif)}+"%")
// }
// `;
/* 
const moveElevator = (x) => keyframes`
 0% {
   transform: translateY(0);
 }
 100% {
  transform: translateY(-${x}%)} 
`; */
const moveElevator = (x) =>
  keyframes`
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(${x < 0 ? "" : "-"}${Math.abs(x)}%);
    }
  `;

const AnimatedElevatorImg = styled.svg`
  animation: ${(props) => moveElevator(props.difference)} 2.5s linear;
  animation-fill-mode: forwards;
  animation-play-state: ${(props) => (props.moving ? "running" : "paused")};
`;
export const ElevatorImg = (props) => {
  const elevators = useSelector((state) => state.elevators);
  const buttons = useSelector((state) => state.buttons);
  const dispatch = useDispatch();

  const handleAnimationEnd = () => {
    dispatch(
      elevatorSystemActions.elevatorArrived({
        elevator: props.id,
        button: Number(props.destination),
      })
    );

    setTimeout(() => {
      dispatch(
        elevatorSystemActions.changeStatusAfterTwoSec({
          elevator: props.id,
          button: Number(props.destination),
        })
      );
    }, 2000);
  };

  return (
    <AnimatedElevatorImg
      buttonId={props.position}
      onAnimationEnd={handleAnimationEnd}
      difference={props.difference}
      moving={props.moving}
      id={props.id}
      width="40"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_4087_4214)">
        <path
          d="M15.875 2.95644e-05C15.6172 0.0351859 15.3789 0.167999 15.2188 0.37503L10.2188 6.37503C9.97656 6.67581 9.92969 7.08597 10.0977 7.43362C10.2656 7.78128 10.6172 8.00003 11 8.00003H21C21.3828 8.00003 21.7344 7.78128 21.9023 7.43362C22.0703 7.08597 22.0234 6.67581 21.7812 6.37503L16.7812 0.37503C16.5664 0.101593 16.2227 -0.0429392 15.875 2.95644e-05ZM29.8125 2.95644e-05C29.4609 0.0625296 29.1719 0.308624 29.0469 0.640655C28.9258 0.976593 28.9922 1.35159 29.2188 1.62503L34.2188 7.62503C34.4102 7.86331 34.6953 8.00003 35 8.00003C35.3047 8.00003 35.5898 7.86331 35.7812 7.62503L40.7812 1.62503C41.0234 1.32425 41.0703 0.914093 40.9023 0.566436C40.7344 0.21878 40.3828 2.95644e-05 40 2.95644e-05H30C29.9688 2.95644e-05 29.9375 2.95644e-05 29.9062 2.95644e-05C29.875 2.95644e-05 29.8438 2.95644e-05 29.8125 2.95644e-05ZM32.125 2.00003H37.875L35 5.43753L32.125 2.00003ZM16 2.56253L18.875 6.00003H13.125L16 2.56253ZM3 10C1.35547 10 0 11.3555 0 13V47C0 48.6446 1.35547 50 3 50H47C48.6445 50 50 48.6446 50 47V13C50 11.3555 48.6445 10 47 10H3ZM3 12H47C47.5547 12 48 12.4453 48 13V47C48 47.5547 47.5547 48 47 48H3C2.44531 48 2 47.5547 2 47V13C2 12.4453 2.44531 12 3 12ZM11 14C8.80078 14 7 15.8008 7 18C7 20.1992 8.80078 22 11 22C13.1992 22 15 20.1992 15 18C15 15.8008 13.1992 14 11 14ZM11 22C7.67578 22 5 24.6758 5 28V35C4.99609 35.3867 5.21484 35.7383 5.5625 35.9063L7 36.625V45C7 45.5508 7.44922 46 8 46H14C14.5508 46 15 45.5508 15 45V36.625L16.4375 35.9063C16.7852 35.7383 17.0039 35.3867 17 35V28C17 24.6758 14.3242 22 11 22ZM25 14C22.8008 14 21 15.8008 21 18C21 20.1992 22.8008 22 25 22C27.1992 22 29 20.1992 29 18C29 15.8008 27.1992 14 25 14ZM25 22C21.6758 22 19 24.6758 19 28V35C18.9961 35.3867 19.2148 35.7383 19.5625 35.9063L21 36.625V45C21 45.5508 21.4492 46 22 46H28C28.5508 46 29 45.5508 29 45V36.625L30.4375 35.9063C30.7852 35.7383 31.0039 35.3867 31 35V28C31 24.6758 28.3242 22 25 22ZM39 14C36.8008 14 35 15.8008 35 18C35 20.1992 36.8008 22 39 22C41.1992 22 43 20.1992 43 18C43 15.8008 41.1992 14 39 14ZM39 22C35.6758 22 33 24.6758 33 28V35C32.9961 35.3867 33.2148 35.7383 33.5625 35.9063L35 36.625V45C35 45.5508 35.4492 46 36 46H42C42.5508 46 43 45.5508 43 45V36.625L44.4375 35.9063C44.7852 35.7383 45.0039 35.3867 45 35V28C45 24.6758 42.3242 22 39 22ZM11 16C12.1172 16 13 16.8828 13 18C13 19.1172 12.1172 20 11 20C9.88281 20 9 19.1172 9 18C9 16.8828 9.88281 16 11 16ZM25 16C26.1172 16 27 16.8828 27 18C27 19.1172 26.1172 20 25 20C23.8828 20 23 19.1172 23 18C23 16.8828 23.8828 16 25 16ZM39 16C40.1172 16 41 16.8828 41 18C41 19.1172 40.1172 20 39 20C37.8828 20 37 19.1172 37 18C37 16.8828 37.8828 16 39 16ZM11 24C13.2773 24 15 25.7227 15 28V34.375L13.5625 35.0938C13.2148 35.2617 12.9961 35.6133 13 36V44H9V36C9.00391 35.6133 8.78516 35.2617 8.4375 35.0938L7 34.375V28C7 25.7227 8.72266 24 11 24ZM25 24C27.2773 24 29 25.7227 29 28V34.375L27.5625 35.0938C27.2148 35.2617 26.9961 35.6133 27 36V44H23V36C23.0039 35.6133 22.7852 35.2617 22.4375 35.0938L21 34.375V28C21 25.7227 22.7227 24 25 24ZM39 24C41.2773 24 43 25.7227 43 28V34.375L41.5625 35.0938C41.2148 35.2617 40.9961 35.6133 41 36V44H37V36C37.0039 35.6133 36.7852 35.2617 36.4375 35.0938L35 34.375V28C35 25.7227 36.7227 24 39 24Z"
          fill={props.color}
        />
      </g>
      <defs>
        <clipPath id="clip0_4087_4214">
          <rect width="50" height="50" fill="white" />
        </clipPath>
      </defs>
    </AnimatedElevatorImg>
  );
};

export default ElevatorImg;
