import React from "react";
import styled from "styled-components";
const PaginationStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0 10px;
  .pagination-list {
    display: flex;
    align-items: center;
    gap: 0 10px;
  }
  .pagination-prev,
  .pagination-next,
  .pagination-text,
  .pagination-item {
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    &:hover {
      color: white;
      background-color: ${(props) => props.theme.secondary};
    }
    .pagination-item--active {
      color: white;
      background-color: ${(props) => props.theme.primary};
    }
  }
`;

// can phai truyen vao page hien tai, tong so page, su kien change page
const Pagination = ({
  className,
  currentPage = 1,
  totalPages,
  onNextPage,
  onPrevPage,
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return (
    <PaginationStyles className={className}>
      <span className="pagination-prev" onClick={onPrevPage}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </span>
      <ul className="pagination-list">
        {pages.map((page) => (
          <li
            className={`pagination-item ${
              page === currentPage ? "pagination-item--active" : ""
            }`}
            key={page}
          >
            {page}
          </li>
        ))}
      </ul>
      <span
        className="pagination-next"
        onClick={() => onNextPage(currentPage + 1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </PaginationStyles>
  );
};

export default Pagination;
