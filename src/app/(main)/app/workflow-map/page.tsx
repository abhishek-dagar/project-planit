"use client";
import CustomEdge from "@/components/common/reactflow.tsx/custom-edges";
import CustomNode from "@/components/common/reactflow.tsx/custom-node";
import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Node,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useMemo } from "react";

const nodes: Node[] = [
  {
    id: "1",
    type: "Action",
    data: {
      title: "Work space",
      icon: "workspace",
      description:
        "Efficient workspaces designed to inspire productivity, foster collaboration, and accommodate your professional needs.",
    },
    position: { x: 150, y: -205 },
  },
  {
    id: "2",
    type: "Action",
    data: {
      title: "Teams",
      icon: "team",
      description:
        "Empowering teams to collaborate seamlessly, innovate together, and achieve exceptional results",
    },
    position: { x: 0, y: 305 },
  },
  {
    id: "3",
    type: "Action",
    data: {
      title: "Projects",
      icon: "project",
      description:
        "Streamlining project management for seamless collaboration and efficient outcomes.",
    },
    position: { x: 550, y: 605 },
  },
  {
    id: "4",
    type: "Action",
    data: {
      title: "Tasks",
      icon: "task",
      description:
        "Simplifying task execution to enhance focus and ensure timely completion.",
    },
    position: { x: 550, y: 855 },
  },
  {
    id: "5",
    type: "Action",
    data: {
      title: "Members",
      icon: "member",
      description:
        "Add members to your workspace, teams and collaborate with them in real-time.",
    },
    position: { x: -800, y: 405 },
  },
];

export interface CustomEdgeType extends Edge {
  desc: string;
}

const edges: CustomEdgeType[] = [
  { id: "e1-2", type: "Action", source: "1", target: "2", desc: "You can add multiple teams to workspace" },
  { id: "e1-3", type: "Action", source: "1", target: "3", desc: "You can add multiple projects to workspace" },
  { id: "e2-3", type: "Action", source: "2", target: "3", desc: "You can assign single team to the project" },
  { id: "e3-4", type: "Action", source: "3", target: "4", desc: "You create tasks under projects" },
  { id: "e1-5", type: "Action", source: "1", target: "5", desc: "You can add multiple members to workspace" },
  { id: "e2-5", type: "Action", source: "2", target: "5", desc: "You can add multiple members to teams" },
];

const WorkflowMap = () => {
  const nodeTypes = useMemo(
    () => ({
      Action: CustomNode,
    }),
    []
  );
  const edgeTypes = useMemo(
    () => ({
      Action: CustomEdge,
    }),
    []
  );
  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Background variant={BackgroundVariant.Dots} />
        <Controls
          className="[&_button]:bg-background [&_button]:hover:bg-muted rounded-md overflow-hidden border border-border [&_button]:border-border"
          showInteractive={false}
          showZoom={false}
        />
      </ReactFlow>
    </div>
  );
};

export default WorkflowMap;
