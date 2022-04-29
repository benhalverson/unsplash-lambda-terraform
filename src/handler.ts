import axios from "axios";
import { APIGatewayProxyHandler } from "aws-lambda";
import { config } from "dotenv";
config();

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
    },
    params: {
      query: `${event?.body?.search}`,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      results: response.data.results,
    }),
  };
};
