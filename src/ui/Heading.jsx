import { css, styled } from "styled-components";

// css function provides syntax highlighting
// example of puting styles in a variable

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      color: pink;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
      color: #6cd155;
    `}
${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
      color: #d25812;
    `}


    line-height: 1.4;

  //background-color: yellow;
`;
export default Heading;
