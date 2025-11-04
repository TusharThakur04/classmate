export const Hero = () => {
  return (
    <div className="ease mx-10 mt-10 flex flex-col items-center justify-center rounded-2xl p-5 shadow-xl transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl md:mx-20 lg:mx-40">
      <h1 className="bg-linear-to-r from-blue-950 via-blue-900 to-blue-950 bg-clip-text text-5xl font-bold text-transparent">
        NEVER MISS DEADLINE
      </h1>
      <h2 className="pt-5 text-center text-3xl font-medium text-gray-800 italic">
        Your smart student assistant that reads your classroom emails, finds upcoming assignments,
        and automatically adds reminders to your calendar, so you can focus on learning, not
        remembering.
      </h2>
    </div>
  );
};
