import { v4 as uuidv4 } from 'uuid';

export function generateId() {
  const id = uuidv4();
  return id;
}
