import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';

export function TriggerNode({ data }: { data: any }) {
  const { flowData, setFlowData } = data;
  const [open, setOpen] = useState(false);
  const [trigger, setTrigger] = useState(false);

  return (
    <div className="relative h-10 w-35 rounded border border-gray-500 bg-white p-2 shadow-lg">
      <div className="flex h-full w-full items-center justify-between px-1">
        {trigger ? (
          <>
            <span className="text-sm font-medium text-gray-800">Gmail Trigger</span>
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
                setTrigger((prev) => !prev);
                setFlowData((prev: any) => {
                  return {
                    ...prev,
                    availableTriggerId: null,
                  };
                });
              }}
            >
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </>
        ) : (
          <>
            <span className="text-sm font-medium text-gray-800">Add Trigger</span>
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
              onClick={() => setOpen((prev) => !prev)}
              className="h-[20px] w-[30px] cursor-pointer text-gray-500 transition hover:scale-95"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </>
        )}
      </div>

      {open && (
        <div className="absolute -top-3 right-0 z-50 w-28 translate-x-[90%] -translate-y-10 rounded-md border border-gray-300 bg-white p-2 shadow-lg">
          <h3 className="mb-1 text-[0.7rem] font-semibold text-gray-700">Select Trigger</h3>

          <div
            onClick={() => {
              setTrigger((prev) => !prev);
              setOpen(false);
              setFlowData((prev: any) => {
                return {
                  ...prev,
                  availableTriggerId: 1,
                };
              });
            }}
            className="cursor-pointer rounded px-1 text-[0.6rem] hover:bg-gray-100"
          >
            📧 Gmail
          </div>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
