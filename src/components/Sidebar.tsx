import React from "react";
import styled from "styled-components";

interface SidebarProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
}

const Sidebar = ({ setActiveTab, activeTab }: SidebarProps) => {
  return (
    <SidebarContainer>
      <NavItem onClick={() => setActiveTab("Drafts")} active={activeTab === "Drafts"}>Drafts</NavItem>
      <NavItem onClick={() => setActiveTab("Resents")} active={activeTab === "Resents"}>Resents</NavItem>
      <NavItem onClick={() => setActiveTab("Trash")} active={activeTab === "Trash"}>Trash</NavItem>
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
