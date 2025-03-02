import React from "react";
import styled from "styled-components";

interface SidebarProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
}

const Sidebar = ({ setActiveTab, activeTab }: SidebarProps) => {
  const handleTabClick = (tab: string) => {
    setActiveTab(tab); // tab 값을 string으로 전달
  };

  return (
    <SidebarContainer>
      <NewFileBox>
        <NewFile onClick={() => handleTabClick("NewFile")}>New File</NewFile>
      </NewFileBox>
      <NavItem onClick={() => handleTabClick("Drafts")} active={activeTab === "Drafts"}>Drafts</NavItem>
      <NavItem onClick={() => handleTabClick("Resents")} active={activeTab === "Resents"}>Resents</NavItem>
      <NavItem onClick={() => handleTabClick("Trash")} active={activeTab === "Trash"}>Trash</NavItem>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  width: 250px;
  border-right: 1px solid #d4d4d4;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const NewFileBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #d4d4d4;
`;

const NewFile = styled.div`
  font-size: 18px;
  font-weight: bolder;
  color: #d4d4d4;
  cursor: pointer;
  padding: 10px 0;
  text-align: center;
  width: 100%;
  &:hover {
    color: white;
  }
`;

const NavItem = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  color: ${({ active }) => (active ? "white" : "#d4d4d4")};
  font-size: 18px;
  padding: 10px 0;
  text-align: left;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;
