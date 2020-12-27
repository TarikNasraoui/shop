import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Loader } from "../components/Loader";
import { getUser, deleteUser } from "../redux/actions/userActions";
import ModalConfirm from "../components/ModalConfirm";

const UserListScreen = ({ history }) => {
  const [show, setShow] = useState(false);
  // get Index User
  const [index, setIndex] = useState(null);
  // handle popup confirmation dialog
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUser());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  // launch delete popup
  const deleteHandler = (id) => {
    handleShow();
    setIndex(id);
  };
  // delete Confirmation
  const handleConfim = () => {
    if (index) {
      dispatch(deleteUser(index));
    }
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
      <h1>user List</h1>
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
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
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
export default UserListScreen;
