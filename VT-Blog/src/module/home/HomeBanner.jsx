import React from "react";
import styled from "styled-components";
import Button from "@component/button/Button";

const HomeBannerStyles = styled.div`
  min-height: 520px;
  padding: 40px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .banner-content {
    max-width: 600px;
    color: white;
  }
  .banner-heading {
    font-size: 36px;
    margin-bottom: 20px;
  }
  .banner-desc {
    line-height: 1.75;
    margin-bottom: 40px;
  }
`;
const HomeBanner = () => {
  return (
    <HomeBannerStyles className="container">
      <div className="banner">
        <div className="banner-content">
          <h1 className="banner-heading">VT Blog</h1>
          <p className="banner-desc">
            People say “forum is dead”…and it’s understandable With the social
            media boom such as Facebook, Twitter, LinkedIn, I’m not surprised to
            see that forums are not received as much attention as before. Just
            call me old-fashioned, but I find forum is still an interesting
            channel to discuss and get to know each other. In this post today, I
            would like to share with you some good software testing forums (yes,
            still alive) that’s worth your time to visit and join.
          </p>
          <Button type="button" to="/sign-up" kind="secondary">
            Get Started
          </Button>
        </div>
        <div className="banner-image">
          <img srcSet="/img-banner.png" alt="banner" />
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
