import { cars } from "../seed/cars.js";

const getRelevantCars = (userPrompt) => {
  const query = userPrompt.toLowerCase();

  let filteredCars = cars.filter(
    (car) =>
      query.includes(car.location.toLowerCase()) ||
      query.includes(car.category.toLowerCase()) ||
      query.includes(car.brand.toLowerCase()) ||
      query.includes(car.model.toLowerCase()) ||
      query.includes(car.fuel.toLowerCase()),
  );

  if (filteredCars.length === 0) {
    filteredCars = cars.slice(0, 8);
  }

  return filteredCars.map(
    ({ image, description, ...essentialData }) => essentialData,
  );
};

const buildPrompt = (userPrompt) => {
  const relevantCars = getRelevantCars(userPrompt);

  return `
You are an AI assistant for RentRide, a car rental platform.

Available Cars matching user request:
${JSON.stringify(relevantCars, null, 2)}

Answer the user's question clearly and briefly based on the car data above.

User:
${userPrompt}
`;
};

export const askAI = async (userPrompt) => {
  const prompt = buildPrompt(userPrompt);

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    },
  );

  const data = await response.json();
  return data.choices[0].message.content;
};
