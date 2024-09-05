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
  table {
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
  const [lastDoc, setLastDoc] = useState();
  const [firstDoc, setFirstDoc] = useState();
  const [filter, setFilter] = useState("");
  const itemPerPage = 3;
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "categories");
      onSnapshot(colRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) =>
          results.push({
            id: doc.id,
            ...doc.data(),
          })
        );
        setTotalPages(Math.ceil(results.length / itemPerPage));
      });
      const initialQuery = query(colRef, limit(3));

      // lay lastDoc
      const first = query(colRef, limit(3));
      const documentSnapshots = await getDocs(first);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      setLastDoc(lastVisible);
      onSnapshot(initialQuery, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setCategoryList(results);
      });
      // query lai de filter toan bo trong db
      const initialFilter = query(colRef);
      onSnapshot(initialFilter, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        if (filter) {
          results = results.filter((item) =>
            item.name.toLowerCase().includes(filter.toLowerCase())
          );
          setCategoryList(results);
        }
      });
    }
    fetchData();
  }, [filter]);

  const handleNextPage = async () => {
    const colRef = collection(db, "categories");
    const nextQuery = filter
      ? query(colRef, startAfter(lastDoc), limit(itemPerPage))
      : query(colRef, startAfter(lastDoc), limit(itemPerPage));
    const documentSnapshots = await getDocs(nextQuery);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    const firstVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    if (!documentSnapshots.empty) {
      let results = [];
      documentSnapshots.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      console.log(results);

      setCategoryList(results);
      setLastDoc(lastVisible);
      setFirstDoc(firstVisible);
    } else console.log("no more documents");
  };

  const handlePrevPage = async (currentPage) => {
    if (currentPage <= 1) return;
    const colRef = collection(db, "categories");
    const prevQuery = filter
      ? query(
          colRef,
          orderBy("name"),
          endBefore(firstDoc),
          limitToLast(itemPerPage)
        )
      : query(
          colRef,
          orderBy("name"),
          endBefore(firstDoc),
          limitToLast(itemPerPage)
        );
    const documentSnapshots = await getDocs(prevQuery);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    const firstVisible = documentSnapshots.docs[0];
    if (!documentSnapshots.empty) {
      let results = [];
      documentSnapshots.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      console.log(results);
      setCategoryList(results);
      setLastDoc(lastVisible);
      setFirstDoc(firstVisible);
    } else console.log("no more documents");
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
