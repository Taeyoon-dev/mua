import React from "react";
import styled from "styled-components";

interface Project {
  id: number;
  name: string;
  date: string;
}

interface ProjectCardProps {
  project: Project;
  moveToTrash: (project: Project) => void;
  permanentDelete?: (project: Project) => void; // ✅ 선택적 속성으로 변경
  openRestoreModal: (project: Project) => void;
  activeTab: string;
  openModal?: (project: Project) => void;
  openDeleteModal?: (project: Project) => void;
}

const ProjectCard = ({
  project,
  moveToTrash,
  activeTab,
  openRestoreModal,
  permanentDelete, // ✅ 선택적 속성으로 변경됨
  openDeleteModal,
}: ProjectCardProps) => {
  const handleTrashClick = () => {
    if (activeTab === "Trash") {
      if (openDeleteModal) {
        openDeleteModal(project); // Trash에서는 영구 삭제 모달 열기
      } else if (permanentDelete) {
        permanentDelete(project); // ✅ permanentDelete가 존재할 때만 실행
      }
    } else {
      moveToTrash(project); // Drafts, Resents에서는 Trash로 이동
    }
  };

  const handleRestoreClick = () => {
    openRestoreModal(project);
  };

  return (
    <Card>
      {/* Trash 버튼 */}
      <TrashButton onClick={handleTrashClick}>
        <img
          src={require("../assets/icon/trash.png")}
          alt={activeTab === "Trash" ? "Permanent Delete" : "Move to Trash"}
          style={{ width: "20px", height: "20px" }}
        />
      </TrashButton>

      <ProjectName>{project.name}</ProjectName>
      <ProjectDate>{project.date}</ProjectDate>

      {/* Trash 탭에서만 복구 버튼 표시 */}
      {activeTab === "Trash" && (
        <RestoreButton onClick={handleRestoreClick}>
          <img
            src={require("../assets/icon/restore.png")}
            alt="Restore"
            style={{ width: "20px", height: "20px" }}
          />
        </RestoreButton>
      )}
    </Card>
  );
};

export default ProjectCard;

const Card = styled.div`
  background-color: #1e1e1e;
  color: #d4d4d4;
  padding: 20px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

const TrashButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const RestoreButton = styled.div`
  position: absolute;
  top: 10px;
  right: 40px;
  cursor: pointer;
`;

const ProjectName = styled.h3`
  font-size: 18px;
  font-weight: 500;
`;

const ProjectDate = styled.p`
  font-size: 14px;
  color: #a4a4a4;
`;
