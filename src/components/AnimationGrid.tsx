import React, { useState } from "react";
import styled from "styled-components";
import ProjectCard from "./ProjectCard";
import Modal from "./Modal";

interface Project {
  id: number;
  name: string;
  date: string;
}

interface AnimationGridProps {
  activeTab: string;
}

const AnimationGrid = ({ activeTab }: AnimationGridProps) => {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: "Project 1", date: "20 minutes ago" },
    { id: 2, name: "Project 2", date: "1 hour ago" },
    { id: 3, name: "Project 3", date: "2 hours ago" },
    { id: 4, name: "Project 4", date: "1 day ago" },
  ]);

  const [trash, setTrash] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToRestore, setProjectToRestore] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null); // 영구 삭제할 프로젝트 상태

  // 프로젝트를 Trash로 이동
  const moveToTrash = (project: Project) => {
    if (activeTab !== "Trash" && !trash.some((p) => p.id === project.id)) {
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
      setTrash((prev) => [...prev, project]);
    }
  };

  // 복구할 프로젝트를 설정하고 모달을 열기
  const openRestoreModal = (project: Project) => {
    setProjectToRestore(project);
    setIsModalOpen(true);
  };

  // 프로젝트 복구
  const restoreProject = () => {
    if (projectToRestore) {
      setTrash((prev) => prev.filter((p) => p.id !== projectToRestore.id)); // Trash에서 제거
      setProjects((prev) => [...prev, projectToRestore]); // Drafts로 복구
    }
    closeModal();
  };

  // 영구 삭제할 프로젝트 설정하고 모달 열기
  const openDeleteModal = (project: Project) => {
    setProjectToDelete(project);
    setIsModalOpen(true);
  };

  // 영구 삭제
  const deleteProject = () => {
    if (projectToDelete) {
      setTrash((prev) => prev.filter((p) => p.id !== projectToDelete.id)); // Trash에서 영구 삭제
    }
    closeModal();
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setProjectToRestore(null);
    setProjectToDelete(null); // 영구 삭제 프로젝트 상태 초기화
  };

  // 프로젝트를 수정된 시간에 따라 정렬
  const sortProjectsByDate = (projects: Project[]) => {
    return projects.sort((a, b) => {
      const dateA = new Date(a.date); // 날짜를 Date 객체로 변환
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime(); // 최신 날짜가 먼저 오도록 내림차순 정렬
    });
  };

  // activeTab에 따라 보여줄 프로젝트 설정
  const projectsToDisplay =
    activeTab === "Drafts" || activeTab === "Resents" ? sortProjectsByDate(projects) : sortProjectsByDate(trash);

  return (
    <div>
      {isModalOpen && (
        <Modal
          title={projectToRestore ? "프로젝트 복구" : "영구 삭제"}
          message={
            projectToRestore
              ? "이 프로젝트를 복구하시겠습니까?"
              : "이 프로젝트를 영구 삭제하시겠습니까?"
          }
          onConfirm={projectToRestore ? restoreProject : deleteProject}
          onCancel={closeModal}
        />
      )}
      <ProjectGrid>
        {projectsToDisplay.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            activeTab={activeTab}
            moveToTrash={moveToTrash}
            openRestoreModal={openRestoreModal} // 복구 모달을 열기 위한 함수 전달
            openDeleteModal={openDeleteModal} // 영구 삭제 모달을 열기 위한 함수 전달
          />
        ))}
      </ProjectGrid>
    </div>
  );
};

export default AnimationGrid;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 20px;
`;
