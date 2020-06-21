// @ts-ignore
import { parseConnectionString as parse } from "mongodb-core";
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect, sendApiResponse } from "@/utils/server-fns";
import { MongoClient, Db, Collection, ObjectId } from "mongodb";
import { Unicorn, LocationRecord, UnicornUpdateResultType } from "@/utils/types";

/*
 * Typically post/update/patch/delete routes require authentication as they are
 * typically user/role/permissions restricted. However, in the case of this web app,
 * any user can move around the unicorns so access to this API route is unrestricted.
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
