import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Loader } from "../components/Loader";
import Paginate from "../components/Paginate";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../redux/actions/productActions";
import { PRODUCT_CREATE_RESET } from "../redux/constants/productConstants";
import ModalConfirm from "../components/ModalConfirm";

const ProductListScreen = ({ history, match }) => {
  // get Index User
  const [index, setIndex] = useState(null);
  // handle popup confirmation dialog
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deletedProduct = useSelector((state) => state.deletedProduct);
  const { success: successDelete } = deletedProduct;

  const createdProduct = useSelector((state) => state.createdProduct);
  const {
    success: successCreate,
    loading: loadingCreate,
    product: productCreate,
    error: errorCreate,
  } = createdProduct;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/product/${productCreate._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    productCreate,
  ]);

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
    dispatch(createProduct());
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
            <i className="fas fa-plus"></i> Create Poduct
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
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
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
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
        </>
      )}
    </>
  );
};
export default ProductListScreen;
