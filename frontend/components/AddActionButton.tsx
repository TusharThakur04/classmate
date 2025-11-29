'use client';

import { Panel, useReactFlow } from '@xyflow/react';

export function AddActionPanel({ setFlowData, setPopup }: any) {
  const { setNodes } = useReactFlow();

  const handleAddAction = () => {
    setNodes((nodes) => {
      const id = `n${nodes.length + 1}`;
      const newNode = {
        id,
        type: 'action',
        position: { x: 0, y: nodes[nodes.length - 1].position.y + 100 || 100 },
        data: { label: `Action ${nodes.length + 1}`, setPopup, setFlowData },
      };
      return [...nodes, newNode];
    });
  };

  return (
    <Panel position="center-left">
      <button
        onClick={handleAddAction}
        className="rounded-md bg-orange-400 px-3 py-2 text-sm font-medium text-white shadow-md transition hover:bg-orange-500 active:scale-95"
      >
        + Add Action
      </button>
    </Panel>
  );
}
