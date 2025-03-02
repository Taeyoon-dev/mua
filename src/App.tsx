import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../src/components/Sidebar";
import AnimationGrid from "../src/components/AnimationGrid";
import AnimationCreatePage from "../src/pages/AnimationCreatePage";
import AnimationToolPage from "../src/pages/AnimationToolPage"; // AnimationToolPage import 추가
import styled from "styled-components";

const App = () => {
  return (
    <Router>
      <AppContainer>
        <MainContent />
      </AppContainer>
    </Router>
  );
};

const MainContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const queryTab = searchParams.get("tab") || "Drafts"; 

  const [activeTab, setActiveTab] = useState<string>(queryTab);

  useEffect(() => {
    navigate(`?tab=${activeTab}`);
  }, [activeTab, navigate]);

  // 현재 경로가 '/tool'일 경우 Sidebar를 숨깁니다.
  const isToolPage = location.pathname === "/tool";

  return (
    <MainContentContainer>
      {/* ToolPage에서는 Sidebar를 숨깁니다. */}
      {!isToolPage && <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />}
      <ContentArea>
        {activeTab === "NewFile" ? (
          <AnimationCreatePage />
        ) : (
          <Routes>
            <Route path="/" element={<AnimationGrid activeTab={activeTab} />} />
            <Route path="/tool" element={<AnimationToolPage />} /> {/* AnimationToolPage 경로 추가 */}
          </Routes>
        )}
      </ContentArea>
    </MainContentContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #292929;
`;

const MainContentContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const ContentArea = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #292929;
`;

export default App;
