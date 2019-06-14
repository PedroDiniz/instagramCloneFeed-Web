import React from "react";
import { Link } from "react-router-dom";

import { Container, HeaderContent, Img } from "./styles";

import logo from "../../assets/logo.svg";
import camera from "../../assets/camera.svg";

export default function Header() {
  return (
    <Container>
      <HeaderContent>
        <Link to="/">
          <Img src={logo} alt="Insta clone" />
        </Link>
        <Link to="/new">
          <Img src={camera} alt="Enviar publicação" />
        </Link>
      </HeaderContent>
    </Container>
  );
}
