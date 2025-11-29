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

  const nodeTypes = {
    trigger: TriggerNode,
    action: ActionNode,
  };
  const [popup, setPopup] = useState(false);

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => {
      let nextEdges = applyEdgeChanges(changes, eds);

      // Check if any edge was removed
      const removedEdges = changes.filter((c) => c.type === 'remove');

      if (removedEdges.length > 0) {
        setNodes((nodes) =>
          nodes.map((node) => {
            // If this node was a target in the removed edge → disconnect it
            const wasTarget = removedEdges.some(
              (edge) => edge.id && eds.find((e) => e.id === edge.id)?.target === node.id
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
    (params) => {
      setEdges((prevEdges) => {
        const newEdges = addEdge({ ...params, type: 'custom-edge' }, prevEdges);

        // Update the target node's data when connected
        setNodes((nodes) =>
          nodes.map((node) => {
            if (node.id === params.target) {
              return {
                ...node,
                data: {
                  ...node.data,
                  // ❗ ADD ANYTHING YOU NEED HERE
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
        {popup && <PopUp />}

        <AddActionPanel setPopup={setPopup} setFlowData={setFlowData} />
        <Controls />
        <MiniMap />
        <Background gap={12} size={1.3} />
      </ReactFlow>
    </div>
  );
}
