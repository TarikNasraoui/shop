import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Loader } from "../components/Loader";
import { getUserDetails, updateUser } from "../redux/actions/userActions";
import { USER_UPDATE_RESET } from "../redux/constants/userConstants";
import FormContainer from "../components/FormContainer";
import ModalConfirm from "../components/ModalConfirm";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // handle popup confirmation dialog
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, history, user, successUpdate, userId, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    handleShow();
  };
  const handleConfim = () => {
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    setShow(false);
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
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <FormContainer>
          <h1>Edit User</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default UserEditScreen;
