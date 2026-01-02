import * as chrono from "chrono-node";

export default async function extractDeadline(
  message: string
): Promise<string | null> {
  const referenceDate = new Date();

  const results = chrono.parse(message, referenceDate, {
    forwardDate: true,
  });

  if (!results.length) return null;

  const deadline = results[results.length - 1].start.date();

  const dealineForIST = toIST(deadline.toISOString());

  return dealineForIST;
}

function toIST(utcISOString: string) {
  const date = new Date(utcISOString);

  date.setMinutes(date.getMinutes() - 330); //330 for ist

  console.log(date.toISOString());

  return date.toISOString();
}
