import { MongoClient, MongoClientOptions } from "mongodb";
import { NextApiResponse } from "next";

export const dbConnect = async () => {
  const options: MongoClientOptions = {
    connectTimeoutMS: 10000,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
  };

  const client = await MongoClient.connect(process.env.DB_CONN_STR as string, options);
  return client;
};

type ErrorBag = {
  error?: string;
  message: string;
};

export const sendApiResponse = (statusCode: number, responseData: any, res: NextApiResponse<any>) => {
  if (statusCode == 200) {
    res.status(statusCode).json(responseData);
  } else {
    let obj: ErrorBag = { message: responseData.message };
    switch (statusCode) {
      case 400:
        obj.error = "Bad Request";
        break;
      case 403:
        obj.error = "Forbidden";
        break;
      case 405:
        obj.error = "Method Not Allowed";
        break;
      case 422:
        obj.error = "Unprocessable";
        break;
      case 429:
        obj.error = "Too Many Requests";
        break;
      case 503:
        obj.error = "Service Unavailable";
        break;
      default:
        obj.error = "Unknown Error";
        break;
    }
    res.status(statusCode).json(obj);
  }
};
