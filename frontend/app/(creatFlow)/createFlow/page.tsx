'use client';
import { useState, useCallback } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Controls,
  MiniMap,
  Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TriggerNode } from '@/components/TriggerNode';
import { ActionNode } from '@/components/ActionNode';
import CustomEdge from '@/components/NodeEdge';
import { AddActionPanel } from '@/components/AddActionButton';

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
};
const edgeTypes = {
  'custom-edge': CustomEdge,
};
const initialNodes = [
  { id: 'n1', type: 'trigger', position: { x: 0, y: 0 }, data: { label: 'Trigger Node' } },
];

export default function CreatFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params) =>
      setEdges((edgesSnapshot) => addEdge({ ...params, type: 'custom-edge' }, edgesSnapshot)),
    []
  );

  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <AddActionPanel />
        <Controls />
        <MiniMap />
        <Background gap={12} size={1.3} />
      </ReactFlow>
    </div>
  );
}
