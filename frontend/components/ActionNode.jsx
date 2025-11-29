import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useReactFlow } from '@xyflow/react';

export function ActionNode({ id, data }) {
  const { setFlowData, setPopup, isConnected } = data;

  const { setNodes } = useReactFlow();
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(null);

  return (
    <div className="relative h-10 w-35 rounded border border-gray-500 bg-white p-2 shadow-lg">
      <div
        className="absolute -top-1 -right-1 m-1 cursor-pointer text-gray-700 hover:text-gray-800"
        onClick={() => {
          setNodes((nodes) =>
            nodes.filter((node) => {
              return node.id !== id;
            })
          );

          setFlowData((prev) => ({
            ...prev,
            action: prev.action.filter((a) => a.nodeId !== id),
          }));
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-x-icon lucide-x h-[0.8rem] w-[0.8rem]"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </div>
      <div className="flex h-full w-full items-center justify-between px-1">
        {action ? (
          <>
            <span className="text-sm font-medium text-gray-800">{action}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-trash-icon lucide-trash cursor-pointer text-gray-500 transition hover:scale-95"
              onClick={() => {
                setAction((prev) => !prev);
                setFlowData((prev) => ({
                  ...prev,
                  action: prev.action.filter((a) => a.nodeId !== id),
                }));
              }}
            >
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </>
        ) : (
          <>
            <span className="text-sm font-medium text-gray-800">Add Action</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={() => {
                if (isConnected) {
                  setOpen((prev) => !prev);
                } else {
                  setPopup(true);
                  setTimeout(() => {
                    setPopup(false);
                  }, 4000);
                }
              }}
              className="h-[20px] w-[30px] cursor-pointer text-gray-500 transition hover:scale-95"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </>
        )}
      </div>

      {open && (
        <div className="absolute -top-3 right-0 z-50 w-30 translate-x-[90%] -translate-y-10 rounded-md border border-gray-300 bg-white p-2 shadow-lg">
          <h3 className="mb-1 text-[0.7rem] font-semibold text-gray-700">Select Trigger</h3>

          <div
            onClick={() => {
              setAction('Set Reminder');
              setOpen(false);
              setFlowData((prev) => ({
                ...prev,
                action: [...prev.action, { availableActionId: 1, nodeId: id }],
              }));
            }}
            className="cursor-pointer rounded p-1 text-[0.6rem] hover:bg-gray-100"
          >
            📅 Set Reminder
          </div>
          <div
            onClick={() => {
              setAction('Save to drive');
              setOpen(false);
              setFlowData((prev) => ({
                ...prev,
                action: [...prev.action, { availableActionId: 2, nodeId: id }],
              }));
            }}
            className="cursor-pointer rounded p-1 text-[0.6rem] hover:bg-gray-100"
          >
            📁 Save to drive
          </div>
        </div>
      )}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
