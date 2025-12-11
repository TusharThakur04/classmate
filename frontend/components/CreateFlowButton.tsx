'use client';

import { Panel, useReactFlow } from '@xyflow/react';
import { useEffect, useState } from 'react';

export function CreateFlowPanel({ setNameFieldOpen, flowData, setPopup }: any) {
  const [dataStatus, setDataStatus] = useState('');

  useEffect(() => {
    if (
      flowData.action.length !== 0 &&
      flowData.trigger.availableTriggerId &&
      flowData.trigger.from !== ''
    ) {
      setDataStatus('ready');
    } else {
      setDataStatus('not ready');
    }
  }, [flowData]);

  const handleCreateFlow = () => {
    if (!flowData.trigger.availableTriggerId) {
      setPopup({ open: true, message: 'Select a trigger for the flow' });
      setTimeout(() => setPopup({ open: false, message: '' }), 4000);
    } else if (flowData.action.length === 0) {
      setPopup({ open: true, message: 'Add actions to flow' });
      setTimeout(() => setPopup({ open: false, message: '' }), 4000);
    } else if (flowData.trigger.from == '') {
      setPopup({ open: true, message: 'Provide email detail' });
      setTimeout(() => setPopup({ open: false, message: '' }), 4000);
    } else {
      setNameFieldOpen(true);
    }
  };

  return (
    <Panel position="center-right">
      <button
        onClick={handleCreateFlow}
        className={`rounded-md ${dataStatus === 'ready' && 'bg-orange-400 hover:bg-orange-500'} bg-gray-400 px-3 py-2 text-sm font-medium text-white shadow-md transition hover:bg-gray-500 active:scale-95`}
      >
        Create Flow
      </button>
    </Panel>
  );
}
