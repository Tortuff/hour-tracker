import { Document } from 'mongoose';

export function documentToTaskResposeDto(doc) {
  if (!(doc instanceof Document)) {
    throw new InternalServerError('Invalid document');
  }

  return {
    id: doc._id.toString(),
    name: doc.name,
    code: doc.code,
    description: doc.description,
  };
}
