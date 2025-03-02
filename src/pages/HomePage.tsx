import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import AnimationGrid from "../components/AnimationGrid";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Drafts");

  return (
    <Container>
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <Content>
        <SearchBar activeTab={activeTab} />
        <AnimationGrid activeTab={activeTab} />
      </Content>
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #292929;
  color: #d4d4d4;
  font-family: Pretendard, sans-serif;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
