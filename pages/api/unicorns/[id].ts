// @ts-ignore
import { parseConnectionString as parse } from "mongodb-core";
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect, sendApiResponse } from "@/utils/server-fns";
import { MongoClient, Db, Collection, ObjectId } from "mongodb";
import { Unicorn, LocationRecord, UnicornUpdateResultType } from "@/utils/types";
import Pusher from "pusher";

/*
 * TODO: Add authentication check in this API route. The user making the request to this route
 * should be a logged in user.
 */
export default async (req: NextApiRequest, res: NextApiResponse<UnicornUpdateResultType>) => {
  if (req.method && (req.method.toLowerCase() === "patch")) {
    if (!(req.body.location)) {
      sendApiResponse(422, { message: "Unicorn update request aborted: Location ID missing or malformed." }, res);
    } else {
      const id = req.query.id as string;
      let client: MongoClient;
      let db: Db;

      try {
        client = await dbConnect();
        const dbName = parse(process.env.DB_CONN_STR, () => { });
        db = client.db(dbName);

        // Validate unicorn ID.
        const unicornCol: Collection<Unicorn> = db.collection(process.env.UNICORN_TYPE as string);
        let uoId: any = new ObjectId(id);
        let results: Unicorn[] | LocationRecord[] = await unicornCol.find({ _id: uoId }).toArray();

        if (!results.length) {
          sendApiResponse(422, { message: `Invalid Unicorn ID: ${id}` }, res);
        } else {
          // Validate location ID.
          const locationCol: Collection<LocationRecord> = db.collection(process.env.LOCATION_TYPE as string);
          let loId: any = new ObjectId(req.body.location);
          results = await locationCol.find({ _id: loId }).toArray();

          if (!results.length) {
            sendApiResponse(422, { message: `Invalid Location ID: ${req.body.location}` }, res);
          } else {
            const r = await unicornCol.updateOne({ _id: uoId }, { $set: { location: req.body.location } });

            // Unicorn moved, publish a 'unicorn-moved' event to the unicorns channel.
            let options: Pusher.Options = {
              appId: process.env.PUSHER_APP_ID as string,
              key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
              secret: process.env.PUSHER_APP_SECRET as string,
              cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,
            };

            if (process.env.NEXT_PUBLIC_APP_BUILD_TARGET === "production") {
              options.useTLS = true;
            } else {
              options.encrypted = true;
            }
            const pusher = new Pusher(options);

            pusher.trigger(
              process.env.NEXT_PUBLIC_PUSHER_CHANNEL_UNICORNS as string,
              process.env.NEXT_PUBLIC_PUSHER_EVENT_UNICORN_MOVED as string,
              {
                unicorn_id: id,
                location_id: req.body.location
              },
              req.body.socket_id || undefined
            );

            // Send success response back to route caller.
            sendApiResponse(200, { matchedCount: r.matchedCount, modifiedCount: r.modifiedCount }, res);
          }
        }
      } catch (error) {
        sendApiResponse(503, error, res);
        return;
      }

      // Close DB connection.
      await client.close();
    }
  } else {
    sendApiResponse(405, { message: "Endpoint only supports PATCH requests." }, res);
  }
};
