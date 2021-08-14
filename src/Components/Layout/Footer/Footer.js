import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrapper>
      Pokemon App, Images are only for Educational Purposes
    </FooterWrapper>
  );
};
const FooterWrapper = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5454d4;
  border-top: 1px solid #000;
`;

export default Footer;
