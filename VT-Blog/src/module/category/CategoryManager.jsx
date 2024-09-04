import React, { useEffect, useState } from "react";
import { LabelStatus } from "../../component/label";
import { ActionView, ActionDelete, ActionEdit } from "../../component/action";
import { Table } from "../../component/table";
import styled from "styled-components";
import { Button } from "../../component/button";
import { collection, deleteDoc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { categoryStatus } from "../../utils/constants";
import { doc } from "firebase/firestore";
import Swal from "sweetalert2";

const CategoryManagerStyles = styled.div`
  table th,
  table td {
    padding: 8px;
    text-align: left;
  }
  table {
  }
  .button-category {
    padding: 0px 20px;
  }
  .top-category {
    display: flex;
    justify-content: flex-end;
    padding-right: 70px;
  }
`;
const CategoryManager = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "categories");
    onSnapshot(colRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setCategoryList(results);
    });
  }, []);
  console.log(categoryList);
  // handle Delete
  const handleDeleteCategory = async (docId) => {
    console.log(docId);
    const colRef = doc(db, "categories", docId);
    // console.log(docData.data());
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
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <CategoryManagerStyles>
      <h1 className="dashboard-heading">Category Manager</h1>
      <div className="top-category">
        <Button
          height="50px"
          to="/manage/add-category"
          className="mb-10 button-category"
        >
          Add Category
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.length > 0 &&
            categoryList.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <em>{category.slug}</em>
                </td>
                <td>
                  {category.status === categoryStatus.APPROVED && (
                    <LabelStatus type="success">APPROVED</LabelStatus>
                  )}
                  {category.status === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="danger">UNAPPROVED</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex gap-5 text-gray-500">
                    <ActionView></ActionView>
                    <ActionDelete
                      onClick={() => handleDeleteCategory(category.id)}
                    ></ActionDelete>
                    <ActionEdit></ActionEdit>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </CategoryManagerStyles>
  );
};

export default CategoryManager;
