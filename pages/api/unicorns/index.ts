// @ts-ignore
import { parseConnectionString as parse } from "mongodb-core";
import { MongoClient, Db, Collection } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect, sendApiResponse } from "@/utils/server-fns";
import { Unicorn } from "@/utils/types";

export default async (req: NextApiRequest, res: NextApiResponse<Unicorn[]>) => {
  let client: MongoClient;
  let db: Db;

  try {
    client = await dbConnect();
    const dbName = parse(process.env.DB_CONN_STR, () => { });
    db = client.db(dbName);

    const collection: Collection<Unicorn> = db.collection(process.env.UNICORN_TYPE as string);
    const results = await collection.find({}).sort([["name", 1]]).toArray();
    sendApiResponse(200, results, res);
  } catch (error) {
    sendApiResponse(503, error, res);
    return;
  }

  // Close DB connection.
  await client.close();
};
