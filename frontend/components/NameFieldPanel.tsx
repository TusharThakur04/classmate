'use client';

import { Panel } from '@xyflow/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export function NameFieldPanel({ setPopup, setNameFieldOpen, flowData, setFlowData }: any) {
  const router = useRouter();
  const sendData = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/flows/`, flowData);
      console.log('Flow created successfully:', res.data);
      router.push('/');
    } catch (error) {
      console.error('Error creating flow:', error);
    }
  };
  return (
    <Panel position="top-center">
      <div className="flex w-[20rem] items-center justify-between gap-2 rounded-md bg-white p-4 shadow-md">
        <input
          type="text"
          placeholder="Enter Flow Name"
          className="flex-1 rounded-md border border-gray-300 p-2"
          onChange={(e) =>
            setFlowData((prevData: any) => ({ ...prevData, flowName: e.target.value }))
          }
        />
        <div className="group flex aspect-square w-[14%] items-center justify-center rounded-full bg-gray-400/70 transition hover:scale-95">
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
            className="lucide lucide-arrow-right-icon lucide-arrow-right w-[90%] text-neutral-700 transition group-hover:text-neutral-900"
            onClick={() => {
              setPopup({ open: true, message: 'Redirecting to Dashboard' });
              setTimeout(() => {
                setPopup((prev: any) => ({
                  ...prev,
                  open: false,
                }));
              }, 5000);
              sendData();
              setNameFieldOpen(false);
            }}
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </Panel>
  );
}
