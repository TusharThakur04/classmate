'use client';
import { useState, useCallback, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Controls,
  MiniMap,
  Background,
  Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TriggerNode } from '@/components/TriggerNode';
import { ActionNode } from '@/components/ActionNode';
import CustomEdge from '@/components/NodeEdge';
import { AddActionPanel } from '@/components/AddActionButton';
import { useUser } from '@clerk/nextjs';
import PopUp from '@/components/PopUp';
import { CreateFlowPanel } from '@/components/CreateFlowButton';
import { NameFieldPanel } from '@/components/NameFieldPanel';

export default function CreatFlow() {
  const { user } = useUser();
  const userId = user ? user.id : '';

  const initialFlowData = {
    userId,
    flowName: null,
    trigger: { availableTriggerId: null, from: '' },
    action: [],
  };

  const [flowData, setFlowData] = useState(initialFlowData);

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
  const [edges, setEdges] = useState<Edge[]>([]);

  const nodeTypes = {
    trigger: TriggerNode,
    action: ActionNode,
  };
  const [popup, setPopup] = useState({ open: false, message: '' });
  const [nameFieldOpen, setNameFieldOpen] = useState(false);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback((changes: any) => {
    setEdges((eds) => {
      let nextEdges = applyEdgeChanges(changes, eds);

      const removedEdges = changes.filter((c: any) => c.type === 'remove');

      if (removedEdges.length > 0) {
        setNodes((nodes) =>
          nodes.map((node) => {
            const wasTarget = removedEdges.some(
              (edge: any) => edge.id && eds.find((e) => e.id === edge.id)?.target === node.id
            );

            if (wasTarget) {
              return {
                ...node,
                data: {
                  ...node.data,
                  isConnected: false,
                  parentId: null,
                },
              };
            }
            return node;
          })
        );
      }

      return nextEdges;
    });
  }, []);

  const onConnect = useCallback(
    (params: any) => {
      setEdges((prevEdges) => {
        const newEdges = addEdge({ ...params, type: 'custom-edge' }, prevEdges);

        setNodes((nodes) =>
          nodes.map((node) => {
            if (node.id === params.target) {
              return {
                ...node,
                data: {
                  ...node.data,
                  isConnected: true,
                  parentId: params.source,
                  incomingEdge: params,
                },
              };
            }
            return node;
          })
        );

        return newEdges;
      });
    },
    [setNodes]
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
        {popup.open && <PopUp message={popup.message} />}
        {nameFieldOpen && (
          <NameFieldPanel
            setPopup={setPopup}
            flowData={flowData}
            setNameFieldOpen={setNameFieldOpen}
            setFlowData={setFlowData}
          />
        )}

        <AddActionPanel setPopup={setPopup} setFlowData={setFlowData} />
        <CreateFlowPanel
          setNameFieldOpen={setNameFieldOpen}
          setPopup={setPopup}
          flowData={flowData}
        />
        <Controls />
        <MiniMap />
        <Background gap={12} size={1.3} />
      </ReactFlow>
    </div>
  );
}
