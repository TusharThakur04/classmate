'use client';

import { Panel } from '@xyflow/react';

export default function PopUp({ message }: { message: string }) {
  return (
    <Panel position="top-center">
      <div className="rounded-md bg-white p-4 shadow-md">
        <p className="text-sm text-red-600">{message}</p>
      </div>
    </Panel>
  );
}
