import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../../component/layout/Heading";
import PostFeatureItem from "../post/PostFeatureItem";
import { collection, where, onSnapshot, limit } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { query, getDocs } from "firebase/firestore";

const HomeFeatureStyles = styled.div``;

const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("feature", "==", true),
      limit(3)
    );
    // c1 su dung nhu o ben PostAddNew
    // cach2 su dung onSnapshot
    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      setPosts(results);
    });
  }, []);
  if (posts.length <= 0) return null;
  return (
    <HomeFeatureStyles>
      <div className="container">
        <Heading>Bài Viết Nổi Bật</Heading>
        <div className="grid-layout">
          {posts.map((post) => (
            <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
          ))}
          {/* <PostFeatureItem></PostFeatureItem> */}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
