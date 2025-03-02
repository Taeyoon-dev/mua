// AnimationCreatePage.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 추가

const AnimationCreatePage = () => {
  const [animationName, setAnimationName] = useState("");
  const navigate = useNavigate(); // navigate 함수 사용

  const handleCreateAnimation = () => {
    // 애니메이션 이름이 비어 있지 않다면 툴 페이지로 이동
    if (animationName.trim()) {
      navigate(`/tool?name=${encodeURIComponent(animationName)}`); // 이름을 URL 파라미터로 전달
    }
  };

  return (
    <CreatePageContainer>
      <PageTitle>Create Animation</PageTitle>
      <CreateForm>
        <Label>Animation Name:</Label>
        <Input
          type="text"
          placeholder="Enter animation name"
          value={animationName}
          onChange={(e) => setAnimationName(e.target.value)} // 애니메이션 이름 입력 처리
        />
        <CreateButton type="button" onClick={handleCreateAnimation}>
          Create Animation
        </CreateButton>
      </CreateForm>
    </CreatePageContainer>
  );
};

export default AnimationCreatePage;

const CreatePageContainer = styled.div`
  padding: 20px;
  background-color: #292929;
  color: #d4d4d4;
  height: 100vh;
`;

const PageTitle = styled.h1`
  color: #ffffff;
  font-size: 32px;
  text-align: center;
`;

const CreateForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin: 0 auto;
`;

const Label = styled.label`
  font-size: 16px;
  color: #d4d4d4;
`;

const Input = styled.input`
  padding: 10px;
  background-color: #333;
  border: 1px solid #d4d4d4;
  color: #d4d4d4;
  font-size: 16px;
`;

const CreateButton = styled.button`
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  font-size: 18px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;
