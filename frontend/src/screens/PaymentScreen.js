import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../redux/actions/cartActions";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;
  if (!shippingAddress.address) {
    history.push("/shipping");
  }
  const [shippingMethod, setShippingMethod] = useState("Paypal");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(shippingMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Methods</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select a method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal"
              id="paypal"
              name="paymentMethod"
              value="paypal"
              onChange={(e) => setShippingMethod(e.target.value)}
              defaultChecked={paymentMethod === "paypal"}
            />
            <Form.Check
              type="radio"
              label="Stripe"
              id="stripe"
              name="paymentMethod"
              value="stripe"
              onChange={(e) => setShippingMethod(e.target.value)}
              defaultChecked={paymentMethod === "stripe"}
            />
          </Col>
        </Form.Group>
        <Button type="submit">Continue</Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
