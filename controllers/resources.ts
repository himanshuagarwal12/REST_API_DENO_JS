import { RouterContext } from 'https://deno.land/x/oak/mod.ts';

import { LearningResource } from '../models/learning-resource.ts';

type RContext = RouterContext<
  Record<string | number, string | undefined>,
  Record<string, any>
>;

export async function getResources(ctx: RContext) {
  const resources = await LearningResource.findAll();
  ctx.response.body = { resources: resources };
}

export async function addResource(ctx: RContext) {
  const body = await ctx.request.body();
  const title = body.value.title;
  const desc = body.value.description;
  const imageUrl = body.value.imageUrl;
  const resourceUrl = body.value.url;

  const id = await LearningResource.create({
    title: title,
    description: desc,
    imageUrl: imageUrl,
    url: resourceUrl,
  });
  ctx.response.body = { insertedResource: id };
}

export async function updateResource(ctx: RContext) {
  const body = await ctx.request.body();
  const title = body.value.title;
  const desc = body.value.description;
  const imageUrl = body.value.imageUrl;
  const resourceUrl = body.value.url;
  const id = ctx.params.resourceId!;

  await LearningResource.update(id, {
    title: title,
    description: desc,
    imageUrl: imageUrl,
    url: resourceUrl,
  });
  ctx.response.body = {
    message: 'Updated resource!',
    updatedResource: {
      title: title,
      description: desc,
      imageUrl: imageUrl,
      url: resourceUrl,
      id: id,
    },
  };
}

export async function deleteResource(ctx: RContext) {
  const id = ctx.params.resourceId!;
  await LearningResource.delete(id);
  ctx.response.body = { message: 'Deleted resource!' };
}
