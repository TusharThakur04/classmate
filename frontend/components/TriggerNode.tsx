import { Handle, Position } from '@xyflow/react';
import { useCallback } from 'react';

export function TriggerNode(props) {
  return (
    <div className="text-updater-node flex h-9 w-35 items-center justify-center rounded border border-gray-500 bg-white p-2 shadow-lg">
      <div className="">
        trigger
        <Handle type="source" position={Position.Bottom} />
      </div>
    </div>
  );
}
