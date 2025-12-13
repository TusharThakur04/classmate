import { FlowData } from '@/types/flowData';
import axios from 'axios';

export const FlowTable = ({ setFlow, flowData }: { flowData: FlowData[]; setFlow: any }) => {
  return (
    <div className="mx-auto mt-8 w-md overflow-x-auto rounded-lg border border-gray-300/50 bg-white shadow-sm sm:w-lg md:w-2xl lg:w-3xl xl:w-5xl">
      <table className="w-full table-fixed border-collapse text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-center font-medium">Name</th>
            <th className="px-4 py-3 text-center font-medium">Apps</th>
            <th className="px-4 py-3 text-center font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {flowData.map((flow, index) => (
            <tr
              key={flow.id}
              className="border-t border-gray-200 transition-colors hover:bg-gray-50"
            >
              <td className="px-4 py-3 text-center font-medium text-gray-800">{flow.name}</td>

              <td className="flex justify-center px-2 py-3">
                {flow.actions.map((action, index) => (
                  <div
                    key={action.availableAction.actionName + index}
                    className="flex items-center gap-1"
                  >
                    <img alt="gmail" className="h-6 w-6 object-contain" />
                    <img
                      src={
                        action.availableAction.actionName === 'save to drive'
                          ? '/icons/drive.svg'
                          : '/icons/calendar.svg'
                      }
                      alt={
                        action.availableAction.actionName === 'save to drive' ? 'Drive' : 'Calendar'
                      }
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                ))}
              </td>

              <td className="px-2 py-3">
                <div className="flex w-full justify-center">
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-trash text-2xl"
                      viewBox="0 0 16 16"
                      onClick={async () => {
                        setFlow((prev: FlowData[]) => prev.filter((a, i) => i !== index));
                        await axios.delete(
                          `${process.env.NEXT_PUBLIC_BACKEND_URL}/flows/${flow.id}`
                        );
                      }}
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
