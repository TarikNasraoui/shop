import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../redux/actions/productActions";
import { Loader } from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);
  return (
    <>
      <h1>Lastest products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
