import React from "react";
import styled from "styled-components";
import Layout from "../component/layout/Layout";
import PostImage from "../module/post/PostImage";
import PostCategory from "../module/post/PostCategory";
import Heading from "../component/layout/Heading";
import PostMeta from "../module/post/PostMeta";
import PostItem from "../module/post/PostItem";

const PostDetailPageStyles = styled.div`
  padding-bottom: 50px;
  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
    margin: 40px 0;
  }
  .post-feature {
    width: 100%;
    max-width: 640px;
    height: 466px;
    border-radius: 20px;
  }
  .post-heading {
    font-weight: bold;
    font-size: 36px;
    margin-bottom: 16px;
    color: ${(props) => props.theme.primary};
  }
  .post-info {
    flex: 1;
  }
  .post-content {
    max-width: 700px;
    margin: 80px auto;
  }
  .author {
    margin-top: 40px;
    margin-bottom: 70px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  .entry-content {
    h1,
    h2 {
      color: ${(props) => props.theme.gray6b};
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;

const PostDetailPage = () => {
  return (
    <PostDetailPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
              url="https://plus.unsplash.com/premium_photo-1669050701946-d34455dce075?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategory>Kiến thức</PostCategory>
              <h1 className="post-heading">
                Setup phòng cực chill dành cho người mới toàn tập
              </h1>
              <PostMeta></PostMeta>
            </div>
          </div>
          <div className="entry-content">
            <h1>Giải ngố về blockchain PoA</h1>
            <p>
              Tiếp tục series về Blockchain, bài trước đã hướng dẫn cài đặt mạng
              Ethereum blockchain dùng thuật toán PoW (Proof of Work). Bài viết
              này sẽ hướng dẫn các bạn setup một mạng blockchain Ethereum sử
              dụng thuật toán PoA (Proof of Authority). Tuy nhiên trước khi “lâm
              trận” thực tế thì cũng nên có chút “dạo đầu”. Ít nhất cũng cần
              hiểu PoA với PoW nó là cái gì. PoW và PoA là 2 thuật toán đồng
              thuận(consensus) được sử dụng phổ biến trong mạng blockchain để
              xác nhận các transaction. Nếu Google search 2 từ khóa này sẽ ra
              hàng triệu kết quả, nhưng những cách giải thích về 2 thuật toán
              này quá hàn lâm, đọc xong có thấy gây… ngu người. Mình sẽ giải
              thích 2 thuật toán này bằng một ví dụ đời thường như sau. 2 thanh
              niên đi xin việc làm ở một công ty nhà nước. Để có thể nhận được
              vào làm theo “đúng quy trình”, các ứng viên phải trải qua bài
              test, phỏng vấn chuyên môn với Tech Lead, phỏng vấn công việc với
              Manager.
            </p>

            <p>
              Thanh niên thứ nhất tên là PoW vốn con nhà nông dân, vô danh tiểu
              tốt, để có thể nhận được vào làm, anh ta phải vận dụng hết sức lực
              bản thân để pass các vòng phỏng vấn. Cuối cùng để được nhận vào
              làm phải mất cả tuần.
            </p>
            <p>
              Thuật toán PoW trong blockchain cũng tương tự như ví dụ trên. Anh
              thanh niên PoW hoạt động giống như các thợ mỏ (máy đào) trong mạng
              Blockchain. Các máy đào phải sử dụng sức mạnh tài nguyên tính toán
              (CPU, năng lượng điện) để thực hiện giải mã thuật toán của
              Blockchain. Máy đào nào mạnh thì sẽ giải mã thành công trước tiên
              và được nhận Bitcoin. Nó cũng như đi phỏng vấn anh thanh niên nào
              tài năng, có skill tốt nhất thì được tuyển vào. Việc thực hiện
              giải mã này tốn rất nhiều thời gian, đặc biệt là theo thời gian,
              độ khó (difficulty) của mạng Blockchain được điều chỉnh tăng thì
              thời gian tạo block càng lâu. Mạng Bitcoin mất tầm mười phút, mạng
              Ethereum mất trên 1 phút.
            </p>
            <figure>
              <img
                src="https://images.unsplash.com/photo-1723962807917-ffab0600929c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <figcaption>
                Gastronomy atmosphere set aside. Slice butternut cooking home.
              </figcaption>
            </figure>
            <h2>Javascript cơ bản - Hành trình của một Anh Hùng</h2>
            <p>
              Kiến thức cơ bản về HTML và CSS có thể giúp bạn tạo được website
              đơn giản. Nhưng nếu bạn mong muốn 1 website sinh động và phức tạp
              hơn, bạn cần Javascript. Javascript là ngôn ngữ lập trình đơn
              giản, nhưng cực kì mạnh mẽ và phổ biến cho lập trình web. Các ứng
              dụng thường thấy ở Javascript có thể kể đến như: Tương tác với
              HTML và thay đổi nội dung và định dạng trên website dễ dàng. Tương
              tác với các hành động của người dùng như nhấn chuột, gõ phím… Xử
              lý và kiểm tra các dữ liệu trên form trước khi gửi về server. Tạo
              và truy xuất thông tin lưu trong cookie trên máy người dùng. Đóng
              vai trò như 1 ngôn ngữ lập trình phía server (sử dụng các
              framework như Node.js).
            </p>
          </div>
          <div className="author">
            <div className="author-image">
              <img
                src="https://images.unsplash.com/photo-1720048171209-71f6fc3d7ea4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="author-content">
              <h3 className="author-name">Tung Nguyen</h3>
              <p className="author-desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                repellat impedit suscipit maiores doloribus dolor dicta, ut
                distinctio nam corrupti beatae delectus neque enim est
                explicabo, laborum ex excepturi veritatis.
              </p>
            </div>
          </div>
          <div className="post-related">
            <Heading>Bài viết liên quan</Heading>
            <div className="grid-layout grid-layout--primary">
              <PostItem></PostItem>
              <PostItem></PostItem>
              <PostItem></PostItem>
              <PostItem></PostItem>
            </div>
          </div>
        </div>
      </Layout>
    </PostDetailPageStyles>
  );
};

export default PostDetailPage;
