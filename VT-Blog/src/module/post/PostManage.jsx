import React from "react";
import { Table } from "../../component/table";
import styled from "styled-components";
import { Pagination } from "../../component/pagination";
import { ActionView, ActionDelete, ActionEdit } from "../../component/action";

const PostManageStyles = styled.div`
  table th,
  table td {
    padding: 8px;
    text-align: left;
  }
`;
const PostManage = () => {
  return (
    <PostManageStyles>
      <h1 className="dashboard-heading">Manage Post</h1>
      <div className="flex justify-end mb-10">
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            placeholder="Search post..."
            className="w-full p-4 border border-gray-300 border-solid rounded-lg"
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>
              <div className="flex items-center gap-x-3">
                <img
                  src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
                  alt=""
                  className="w-[66px] h-[55px] rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">One Special 4K Camera</h3>
                  <time className="text-sm text-gray-500">
                    Date: 25 Oct 2021
                  </time>
                </div>
              </div>
            </td>
            <td>
              <span className="text-gray-500">Camera Gear</span>
            </td>
            <td>
              <span className="text-gray-500">Tung Nguyen</span>
            </td>
            <td>
              <div className="flex items-center text-gray-500 gap-x-3">
                <ActionDelete></ActionDelete>
                <ActionView></ActionView>
                <ActionEdit></ActionEdit>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
      <Pagination></Pagination>
    </PostManageStyles>
  );
};

export default PostManage;
