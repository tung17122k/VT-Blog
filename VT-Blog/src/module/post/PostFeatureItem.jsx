import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 272px;
  .post-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
  }
  .post-overlay {
    position: absolute;
    inset: 0;
    border-radius: 16px;
    background-color: rgba(0, 0, 0, 0.6);
    mix-blend-mode: multiply;
    opacity: 0.6;
  }
  .post-content {
    position: absolute;
    inset: 0;
    z-index: 10;
    padding: 20px;
    color: white;
  }
  .post-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .post-title {
    color: white;
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-content {
        padding: 15px;
      }
      &-category {
        margin-right: 10px;
      }
    }
  }
`;

const PostFeatureItem = ({ data }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "in", [1, 2, 3]));
      let result = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
        setCategories(result);
      });
    }
    getData();
  }, []);

  const category = categories.find(
    (category) => category.id === data.categoryId
  );
  // console.log(category);

  if (!data.id) return null;
  return (
    <PostFeatureItemStyles>
      <PostImage url={data.image} className="post-image"></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          {category && (
            <PostCategory key={category.id} className="post-category">
              {category.name}
            </PostCategory>
          )}
          <PostMeta color="white" author={data.author}></PostMeta>
        </div>
        <PostTitle className="post-title" size="medium">
          {data.title}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
