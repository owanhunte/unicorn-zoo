// @ts-ignore
import { parseConnectionString as parse } from "mongodb-core";
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect, sendApiResponse } from "@/utils/server-fns";
import { MongoClient, Db, Collection } from "mongodb";
import { UserRecord } from "@/utils/types";
import Joi from "@hapi/joi";

export default async (req: NextApiRequest, res: NextApiResponse<string>) => {
  if (req.method && (req.method.toLowerCase() === "post")) {
    // Do some simple validation on the POSTed data, specifically the data we care about persisting.
    let schema: Joi.ObjectSchema;
    let result: Joi.ValidationResult;

    schema = Joi.object({
      name: Joi.string().trim().required(),
      email: Joi.string().trim().email({ minDomainSegments: 2 }).required(),
      imageUrl: Joi.string().uri().optional(),
      provider: Joi.string().valid("Google").required()
    });

    result = schema.validate(req.body);
    if (result.error) {
      sendApiResponse(422, { message: "Request to save user details aborted. Reason: Invalid user data." }, res);
    } else {
      let client: MongoClient;
      let db: Db;

      try {
        client = await dbConnect();
        const dbName = parse(process.env.DB_CONN_STR, () => { });
        db = client.db(dbName);

        const collection: Collection<UserRecord> = db.collection("users");

        // Add the user if they're not yet persisted.
        const results = await collection.find({
          email: req.body.email
        }).toArray();

        if (results.length) {
          if (results[0].provider === req.body.provider) {
            sendApiResponse(200, { _id: results[0]._id }, res);
          } else {
            sendApiResponse(422, { message: `Sorry an account for the email address ${req.body.email} already exists for the ${req.body.provider} sign in provider. Please log in with that account.` }, res);
          }
        } else {
          const data: any = {
            name: req.body.name,
            email: req.body.email,
            imageUrl: req.body.imageUrl,
            provider: req.body.provider
          };

          const doc = await collection.insertOne(data, { w: "majority" });
          sendApiResponse(200, { _id: doc.insertedId }, res);
        }
      } catch (error) {
        console.error(error);
        sendApiResponse(503, error, res);
        return;
      }

      // Close DB connection.
      await client.close();
    }
  } else {
    sendApiResponse(405, { message: "Endpoint only supports POST requests." }, res);
  }
};
