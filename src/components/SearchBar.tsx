import React from "react";
import styled from "styled-components";

interface SearchBarProps {
  activeTab: string;
}

const SearchBar = ({ activeTab }: SearchBarProps) => {
  return (
    <SearchBarContainer>
      <TabTitle>{activeTab}</TabTitle>
      <SearchInput placeholder="Search projects..." />
    </SearchBarContainer>
  );
};

export default SearchBar;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  background: #1e1e1e;
  border: none;
  padding: 15px;
  color: #d4d4d4;
  font-size: 18px;
  width: 300px; /* 크기 증가 */
  border-radius: 8px;
`;

const TabTitle = styled.span`
  font-size: 30px;
  font-weight: 500;
  color: #d4d4d4;
`;
