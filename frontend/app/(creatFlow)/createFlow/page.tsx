'use client';
import { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Controls,
  MiniMap,
  Background,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TriggerNode } from '@/components/TriggerNode';
import { ActionNode } from '@/components/ActionNode';
import CustomEdge from '@/components/NodeEdge';
import { AddActionPanel } from '@/components/AddActionButton';
import { useUser } from '@clerk/nextjs';
import PopUp from '@/components/PopUp';

export default function CreatFlow() {
  const { user } = useUser();
  const userId = user ? user.id : '';

  const initialFlowData = {
    userId,
    flowName: null,
    availableTriggerId: null,
    action: [],
  };

  const [flowData, setFlowData] = useState(initialFlowData);

  const nodeTypes = {
    trigger: TriggerNode,
    action: (nodeProps) => <ActionNode {...nodeProps} edges={edges} setPopup={setPopup} />,
  };
  const edgeTypes = {
    'custom-edge': CustomEdge,
  };
  const initialNodes = [
    {
      id: 'n1',
      type: 'trigger',
      position: { x: 0, y: 0 },
      data: { label: 'Trigger Node', setFlowData },
    },
  ];

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);

  const [popup, setPopup] = useState(false);

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
    [edges]
  );

  useEffect(() => {
    console.log(flowData);
  }, [flowData]);

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
        {popup && <PopUp />}

        <AddActionPanel setFlowData={setFlowData} />
        <Controls />
        <MiniMap />
        <Background gap={12} size={1.3} />
      </ReactFlow>
    </div>
  );
}
