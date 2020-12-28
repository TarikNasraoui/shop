import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Loader } from "../components/Loader";
import { listProducts, deleteProduct } from "../redux/actions/productActions";
import ModalConfirm from "../components/ModalConfirm";

const ProductListScreen = ({ history }) => {
  // get Index User
  const [index, setIndex] = useState(null);
  // handle popup confirmation dialog
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deletedProduct = useSelector((state) => state.deletedProduct);
  const { success: successDelete } = deletedProduct;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  // launch delete popup
  const deleteHandler = (id) => {
    handleShow();
    setIndex(id);
  };
  // delete Confirmation
  const handleConfim = () => {
    if (index) {
      dispatch(deleteProduct(index));
    }
    setShow(false);
  };
  const createProductHandler = () => {
    console.log("click");
  };
  return (
    <>
      <ModalConfirm
        handleShow={handleShow}
        handleClose={handleClose}
        handleConfirm={handleConfim}
        state={show}
        title="Please confirm"
        body="Do you really want to continue"
      />
      <Row>
        <Col>
          <h1>Products List</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fas-plus"></i>Create Poduct
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>

                <td>
                  <LinkContainer to={`/admin/user/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
export default ProductListScreen;
