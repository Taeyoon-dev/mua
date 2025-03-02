import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

// 기본적인 애니메이션 툴 페이지
const AnimationToolPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [frames, setFrames] = useState<any[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0); // 현재 선택된 프레임
  const [playAnimation, setPlayAnimation] = useState(false); // 애니메이션 재생 여부
  const [selectedTool, setSelectedTool] = useState<string>("pen"); // 선택된 그리기 도구
  const [skeletons, setSkeletons] = useState<any[]>([]); // 뼈대 정보

  // 캔버스 초기화
  const initializeCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#292929";
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  // 그리기 시작
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setLastX(e.nativeEvent.offsetX);
    setLastY(e.nativeEvent.offsetY);

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
  };

    // 그리기
const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
  
    // canvasRef.current가 null이 아닌지 확인
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
  
    if (selectedTool === "pen") {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.strokeStyle = "#d4d4d4";
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (selectedTool === "line") {
      // canvasRef.current가 null이 아니므로 ctx를 사용할 수 있음
      if (canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.strokeStyle = "#d4d4d4";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    } else if (selectedTool === "circle") {
      // canvasRef.current가 null이 아니므로 ctx를 사용할 수 있음
      if (canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        const radius = Math.sqrt(
          Math.pow(e.nativeEvent.offsetX - lastX, 2) +
          Math.pow(e.nativeEvent.offsetY - lastY, 2)
        );
        ctx.beginPath();
        ctx.arc(lastX, lastY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "#d4d4d4";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  };
  

  // 그리기 종료
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // 프레임 추가
  const addFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const frame = canvas.toDataURL();
    setFrames((prevFrames) => [...prevFrames, { id: prevFrames.length + 1, image: frame }]);
    setCurrentFrame(frames.length); // 추가된 프레임을 선택
  };

  // 프레임 삭제
  const deleteFrame = (frameId: number) => {
    setFrames(frames.filter((frame) => frame.id !== frameId));
    if (currentFrame === frameId) {
      setCurrentFrame(currentFrame - 1); // 삭제한 프레임이 현재 프레임이라면 이전 프레임 선택
    }
  };

  // 애니메이션 재생
  const playFrames = () => {
    setPlayAnimation(true);
    let frameIndex = 0;
    const interval = setInterval(() => {
      if (frameIndex >= frames.length) {
        clearInterval(interval);
        setPlayAnimation(false); // 애니메이션 끝나면 멈추기
      } else {
        setCurrentFrame(frameIndex);
        frameIndex++;
      }
    }, 100); // 각 프레임 간격 설정
  };

  // 프로젝트 저장
  const saveProject = () => {
    const firstFrame = frames[0];
    const projectName = "My Animation Project";
    const lastModified = new Date().toLocaleString();

    console.log({
      projectName,
      lastModified,
      firstFrame,
    });
  };

  // 뼈대 추가
  const addSkeleton = (x: number, y: number) => {
    setSkeletons((prevSkeletons) => [
      ...prevSkeletons,
      { id: prevSkeletons.length + 1, x, y, connectedTo: null },
    ]);
  };

  // 뼈대 연결
  const connectSkeletons = (skeletonId1: number, skeletonId2: number) => {
    const updatedSkeletons = skeletons.map((skeleton) => {
      if (skeleton.id === skeletonId1) {
        return { ...skeleton, connectedTo: skeletonId2 };
      }
      return skeleton;
    });
    setSkeletons(updatedSkeletons);
  };

  // 그리기 도구 선택
  const selectTool = (tool: string) => {
    setSelectedTool(tool);
  };

  useEffect(() => {
    initializeCanvas();
  }, []);

  return (
    <ToolPageContainer>
      <ToolHeader>
        <h2>Create Animation Tool</h2>
        <p>Design your animation frame by frame</p>
      </ToolHeader>
      <CanvasContainer>
        <Canvas
          ref={canvasRef}
          width={500}
          height={300}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
        ></Canvas>
        <ToolPanel>
          <ToolButton onClick={() => selectTool("pen")}>Pen</ToolButton>
          <ToolButton onClick={() => selectTool("line")}>Line</ToolButton>
          <ToolButton onClick={() => selectTool("circle")}>Circle</ToolButton>
        </ToolPanel>
        <AddFrameButton onClick={addFrame}>Add Frame</AddFrameButton>
        <DeleteFrameButton onClick={() => deleteFrame(frames[currentFrame]?.id)}>
          Delete Frame
        </DeleteFrameButton>
        <PlayButton onClick={playFrames} disabled={playAnimation}>
          {playAnimation ? "Playing..." : "Play Animation"}
        </PlayButton>
        <SaveButton onClick={saveProject}>Save Project</SaveButton>
      </CanvasContainer>

      {/* 타임라인 및 프레임 리스트 */}
      <FramesList>
        {frames.map((frame, index) => (
          <FramePreview
            key={index}
            selected={index === currentFrame}
            onClick={() => setCurrentFrame(index)}
          >
            <h3>Frame {frame.id}</h3>
            <img src={frame.image} alt={`Frame ${frame.id}`} width="100" height="100" />
          </FramePreview>
        ))}
      </FramesList>

      {/* 뼈대 설정 */}
      <SkeletonsContainer>
        <h3>Skeletons</h3>
        {skeletons.map((skeleton) => (
          <Skeleton key={skeleton.id} x={skeleton.x} y={skeleton.y}>
            <SkeletonLabel>Skeleton {skeleton.id}</SkeletonLabel>
          </Skeleton>
        ))}
      </SkeletonsContainer>
    </ToolPageContainer>
  );
};

export default AnimationToolPage;

// 스타일 컴포넌트들
const ToolPageContainer = styled.div`
  padding: 20px;
  background-color: #292929;
  color: #d4d4d4;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ToolHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const CanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Canvas = styled.canvas`
  background-color: #444;
  border: 1px solid #d4d4d4;
  margin-bottom: 20px;
`;

const ToolPanel = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const ToolButton = styled.button`
  background-color: #2196f3;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0b79d0;
  }
`;

const AddFrameButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  padding: 10px 20px;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const DeleteFrameButton = styled.button`
  background-color: #f44336;
  color: #fff;
  padding: 10px 20px;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #e53935;
  }
`;

const PlayButton = styled.button`
  background-color: #ffeb3b;
  color: #000;
  padding: 10px 20px;
  margin-bottom: 20px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #fdd835;
  }
  &:disabled {
    background-color: #bdbdbd;
    cursor: not-allowed;
  }
`;

const SaveButton = styled.button`
  background-color: #3f51b5;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #303f9f;
  }
`;

const FramesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const FramePreview = styled.div<{ selected: boolean }>`
  background-color: ${({ selected }) => (selected ? "#607d8b" : "#444")};
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
`;

const SkeletonsContainer = styled.div`
  margin-top: 30px;
`;

const Skeleton = styled.div<{ x: number; y: number }>`
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 50%;
`;

const SkeletonLabel = styled.div`
  color: #d4d4d4;
  font-size: 12px;
  text-align: center;
`;

