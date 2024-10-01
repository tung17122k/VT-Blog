import React, { useEffect, useRef, useState } from "react";
import { Pagination } from "../../component/pagination";
import { LabelStatus } from "../../component/label";
import { ActionView, ActionDelete, ActionEdit } from "../../component/action";
import { Table } from "../../component/table";
import styled from "styled-components";
import { Button } from "../../component/button";
import {
  collection,
  deleteDoc,
  endBefore,
  getDoc,
  getDocs,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { categoryStatus } from "../../utils/constants";
import { doc } from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const CategoryManagerStyles = styled.div`
  table th,
  table td {
    padding: 8px;
    text-align: left;
  }

  .button-category {
    padding: 0px 20px;
  }
  .top-category {
    display: flex;
    justify-content: space-between;
  }
`;
const CategoryManager = () => {
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
  const [lastDoc, setLastDoc] = useState(null);
  const [firstDoc, setFirstDoc] = useState(null);
  const [filter, setFilter] = useState("");
  const itemPerPage = 3;
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async (startAfterDoc = null, startAtDoc = null) => {
    const colRef = collection(db, "categories");
    let q;
    if (filter) {
      q = query(
        colRef,
        orderBy("name"),
        limit(itemPerPage),
        where("name", ">=", filter),
        where("name", "<=", filter + "\uf8ff")
      );
    } else q = query(colRef, orderBy("name"), limit(3));
    if (startAfterDoc) {
      q = query(
        colRef,
        orderBy("name"),
        startAfter(startAfterDoc),
        limit(itemPerPage)
      );
    } else if (startAtDoc) {
      q = query(
        colRef,
        orderBy("name"),
        endBefore(startAtDoc),
        limit(itemPerPage)
      );
    }
    const querySnapshot = await getDocs(q);
    let itemList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCategoryList(itemList);
    setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setFirstDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
  };
  useEffect(() => {
    fetchData();
  }, [filter]);
  const handleNextPage = () => {
    if (lastDoc) {
      fetchData(lastDoc);
      console.log(firstDoc.data());
    }
  };
  const handlePrevPage = () => {
    if (firstDoc) {
      fetchData(null, firstDoc);
      console.log(firstDoc.data());
    }
  };

  const handleDeleteCategory = async (docId) => {
    const colRef = doc(db, "categories", docId);
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
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
  }, 500);

  return (
    <CategoryManagerStyles>
      <h1 className="dashboard-heading">Category Manager</h1>
      <div className="top-category">
        <Button height="50px" to="/manage/add-category" className="mb-10 ">
          Add Category
        </Button>
        <input
          type="text"
          className="px-3 py-3 mb-10 border border-gray-400 rounded-lg "
          placeholder="Search category"
          onChange={handleInputFilter}
        />
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
                  {Number(category.status) === categoryStatus.APPROVED && (
                    <LabelStatus type="success">APPROVED</LabelStatus>
                  )}
                  {Number(category.status) === categoryStatus.UNAPPROVED && (
                    <LabelStatus type="danger">UNAPPROVED</LabelStatus>
                  )}
                </td>
                <td>
                  <div className="flex gap-5 text-gray-500">
                    <ActionView></ActionView>
                    <ActionDelete
                      onClick={() => handleDeleteCategory(category.id)}
                    ></ActionDelete>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-category?id=${category.id}`)
                      }
                    ></ActionEdit>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Pagination
        className="mt-10"
        onNextPage={handleNextPage}
        totalPages={totalPages}
        onPrevPage={handlePrevPage}
      ></Pagination>
    </CategoryManagerStyles>
  );
};

export default CategoryManager;
