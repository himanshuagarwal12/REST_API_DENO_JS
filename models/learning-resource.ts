import { ObjectId } from 'https://deno.land/x/mongo@v0.7.0/mod.ts';

import getDatabase from '../helpers/db.ts';

interface Resource {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

export class LearningResource {
  static async create(data: Resource) {
    const id = await getDatabase().collection('resources').insertOne(data);
    return { id: id.$oid }; // { $oid: "abc" }
  }

  static async findAll() {
    const resources = await getDatabase().collection('resources').find();
    return resources.map(
      (resource: {
        _id: ObjectId;
        title: string;
        description: string;
        imageUrl: string;
        url: string;
      }) => ({
        ...resource,
        id: resource._id.$oid,
      })
    );
  }

  static async update(id: string, data: Resource) {
    await getDatabase()
      .collection('resources')
      .updateOne({ _id: ObjectId(id) }, { $set: data });
  }

  static async delete(id: string) {
    await getDatabase()
      .collection('resources')
      .deleteOne({ _id: ObjectId(id) });
  }
}
