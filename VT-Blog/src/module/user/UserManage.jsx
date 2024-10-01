import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Table } from "../../component/table";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { ActionDelete, ActionEdit } from "../../component/action";
import { useNavigate } from "react-router-dom";
import { userRole, userStatus } from "../../utils/constants";
import { LabelStatus } from "../../component/label";
import { Button } from "../../component/button";
import { deleteUser } from "firebase/auth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const UserManageStyles = styled.div`
  table th,
  table td {
    padding: 8px;
    text-align: left;
  }
`;
const UserManage = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "users");
    let results = [];
    onSnapshot(colRef, (snapshot) => {
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
        setUserList(results);
      });
    });
  }, []);
  console.log(userList);
  const handleDeleteUser = async (user) => {
    const colRef = doc(db, "users", user.id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // xoa trong db
        await deleteDoc(colRef);
        await deleteUser(user);
        toast.success("Delete user successfully!");
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
    // delete trong auth
  };

  const renderRole = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Moderator";
      case userRole.USER:
        return "User";
      default:
        break;
    }
  };

  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">PENDING</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="danger">REJECTED</LabelStatus>;
      default:
        break;
    }
  };
  return (
    <UserManageStyles>
      <h1 className="dashboard-heading whitespace-nowrap">User Manager</h1>
      <div className="flex justify-end mb-10">
        {/* <input
          type="text"
          className="px-3 py-3 mb-10 border border-gray-400 rounded-lg "
          placeholder="Search user"
        /> */}
        <Button height="50px" to="/manage/add-user/">
          Add new user
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Email address</th>
            <th>Infor</th>
            <th>UserName</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((user) => (
              <tr key={user.id}>
                <td title={user.id}>{user.id.slice(0, 3)}</td>
                <td>{user.email}</td>
                <td className="whitespace-nowrap">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={user.avatar}
                      alt=""
                      className="flex-shrink-0 object-cover w-10 h-10 rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{user.fullname}</h3>
                      <time className="text-sm text-gray-400">
                        {new Date(
                          user?.createAt?.seconds * 1000
                        ).toLocaleDateString("vi-VI")}
                      </time>
                    </div>
                  </div>
                </td>
                <td>{user?.userName}</td>
                <td>{renderLabelStatus(user?.status)}</td>
                <td className="font-semibold">{renderRole(user?.role)}</td>
                <td>
                  <div className="flex gap-5 text-gray-500">
                    <ActionDelete
                      onClick={() => handleDeleteUser(user)}
                    ></ActionDelete>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-user?id=${user.id}`)
                      }
                    ></ActionEdit>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </UserManageStyles>
  );
};

export default UserManage;
