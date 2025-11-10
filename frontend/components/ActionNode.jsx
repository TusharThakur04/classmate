import { Handle, Position } from '@xyflow/react';

export function ActionNode(props) {
  return (
    <div className="text-updater-node flex h-9 w-35 items-center justify-center rounded border border-gray-500 bg-white p-2 shadow-lg">
      <div className="">
        action
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
      </div>
    </div>
  );
}
