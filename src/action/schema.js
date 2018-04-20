import { schema } from 'normalizr';

const user = new schema.Entity('users');
const photo = new schema.Entity('photos', {
  user,
});

export const photos = [photo];
