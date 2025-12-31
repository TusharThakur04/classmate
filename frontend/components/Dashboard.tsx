'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { Loader } from './Loader';
import { FlowTable } from './FlowTable';
import { FlowData } from '../types/flowData';
import { useRouter } from 'next/navigation';

export const Dashboard = ({ userId }: any) => {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const [flow, setFlow] = useState<FlowData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const getFlowData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/flows/${userId}`);
      console.log('Flow Data:', response.data);
      setFlow(response.data.flowData);
      setIsLoading(false);
    } catch (error: any) {
      console.error('Error fetching flow data:', error.message);
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && userId) {
      console.log('Fetching flow data for userId:', userId);
      getFlowData();
    }
  }, [isLoaded, userId]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <p> {error}</p>
      </div>
    );
  }
  return (
    <>
      {flow && (
        <div className="mt-15">
          <div className="flex justify-between px-10 sm:px-20 md:px-30 lg:px-50 xl:px-70 2xl:px-90">
            <h1 className="mb-4 text-2xl font-bold">Flows</h1>
            <button
              onClick={() => {
                router.push('/createFlow');
              }}
              className="flex h-10 items-center justify-center rounded-lg bg-purple-300 px-2 py-2 transition duration-300 ease-in-out hover:bg-purple-400/90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-plus-icon lucide-plus"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              <span className="ml-2">Create</span>
            </button>
          </div>
          <FlowTable setFlow={setFlow} flowData={flow} />
        </div>
      )}
    </>
  );
};
