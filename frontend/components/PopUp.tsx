'use client';

import { Panel } from '@xyflow/react';

export default function PopUp() {
  return (
    <Panel position="top-center">
      <div className="rounded-md bg-white p-4 shadow-md">
        <p className="text-sm text-red-600">Please connect the action to flow first.</p>
      </div>
    </Panel>
  );
}
