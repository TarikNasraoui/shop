import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container className="justify-content-md-center">
      <Col xs={12} md={6}>
        {children}
      </Col>
    </Container>
  );
};

export default FormContainer;
