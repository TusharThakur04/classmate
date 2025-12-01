'use client';

import { Panel, useReactFlow } from '@xyflow/react';

export function CreateFlowPanel({ flowData, setPopup }: any) {
  const handleCreateFlow = () => {
    if (flowData.action.length === 0) {
      setPopup({ open: true, message: 'Add actions to flow' });
      setTimeout(() => setPopup({ open: false, message: '' }), 4000);
      return;
    }
  };

  return (
    <Panel position="center-right">
      <button
        onClick={handleCreateFlow}
        className="rounded-md bg-orange-400 px-3 py-2 text-sm font-medium text-white shadow-md transition hover:bg-orange-500 active:scale-95"
      >
        Create Flow
      </button>
    </Panel>
  );
}
