import { use, useEffect, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export function TriggerNode({ data }: { data: any }) {
  const router = useRouter();
  const { setFlowData } = data;
  const [open, setOpen] = useState({ triggerOptions: false, emailFromInput: false });
  const [trigger, setTrigger] = useState(false);
  const [isGmailConnected, setIsGmailConnected] = useState(false);

  useEffect(() => {
    async function checkGmailConnection() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/gmail`, {
          withCredentials: true,
        });

        if (response.data.connected) {
          setIsGmailConnected(true);
        } else {
          setIsGmailConnected(false);
        }
        console.log('Gmail connection status:', isGmailConnected);
      } catch (error) {
        console.error('Error checking Gmail connection:', error);
        setIsGmailConnected(false);
      }
    }

    checkGmailConnection();
  }, [data.userId]);

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
                    trigger: { ...prev.trigger, availableTriggerId: null, from: null },
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
              onClick={() => setOpen((prev) => ({ ...prev, triggerOptions: !prev.triggerOptions }))}
              className="h-[20px] w-[30px] cursor-pointer text-gray-500 transition hover:scale-95"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </>
        )}
      </div>

      {open.triggerOptions && (
        <div className="absolute -top-3 right-0 z-50 w-28 translate-x-[90%] -translate-y-10 rounded-md border border-gray-300 bg-white p-2 shadow-lg">
          <h3 className="mb-1 text-[0.7rem] font-semibold text-gray-700">Select Trigger</h3>

          <div
            onClick={() => {
              if (!isGmailConnected) {
                router.push(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`);
                return;
              }
              setTrigger((prev) => !prev);
              setOpen({ triggerOptions: false, emailFromInput: true });
              setFlowData((prev: any) => {
                return {
                  ...prev,
                  trigger: { ...prev.trigger, availableTriggerId: 1 },
                };
              });
            }}
            className="cursor-pointer rounded px-1 text-[0.6rem] hover:bg-gray-100"
          >
            📧 Gmail
          </div>
        </div>
      )}
      {open.emailFromInput && (
        <div className="absolute -top-20 left-20 w-[10rem] rounded border bg-white px-2 py-1 shadow-lg">
          <div className="text-left text-[0.6rem] font-semibold">From:</div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="example@gmail.com"
              className="w-full rounded border px-1 py-1 text-xs text-[0.5rem]"
              onChange={(e) => {
                const value = e.target.value;
                setFlowData((prev: any) => ({
                  ...prev,
                  trigger: { ...prev.trigger, from: value },
                }));
              }}
            />

            <button
              onClick={() => {
                setOpen({ triggerOptions: false, emailFromInput: false });
              }}
              className="rounded bg-gray-700 px-2 py-1 text-xs text-white hover:bg-gray-800"
            >
              ➜
            </button>
          </div>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
