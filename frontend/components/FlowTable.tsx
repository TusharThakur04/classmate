import { FlowData } from '@/types/flowData';

export const FlowTable = ({ flowData }: { flowData: FlowData[] }) => {
  return (
    <div className="mx-auto mt-8 w-md overflow-x-auto rounded-lg border border-gray-300/50 bg-white shadow-sm sm:w-lg md:w-2xl lg:w-3xl xl:w-5xl">
      <table className="w-full table-auto border-collapse text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Name</th>
            <th className="px-4 py-3 text-left font-medium">Apps</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
          </tr>
        </thead>

        <tbody>
          {flowData.map((flow, index) => (
            <tr
              key={flow.id}
              className="border-t border-gray-200 transition-colors hover:bg-gray-50"
            >
              <td className="px-4 py-3 font-medium text-gray-800">{flow.name}</td>

              <td className="px-2 py-3">
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

              <td className="px-4 py-3">
                <label
                  htmlFor={`toggle-${index}`}
                  className="relative inline-flex h-6 w-10 cursor-pointer rounded-full border-3 border-gray-500/45 bg-gray-400/70 has-[input:checked]:bg-gray-500/95"
                >
                  <input type="checkbox" id={`toggle-${index}`} className="peer sr-only"></input>
                  <span className="absolute top-1/40 h-[99%] w-[55%] rounded-full border border-gray-950 bg-white transition-all duration-350 peer-checked:translate-x-4"></span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
