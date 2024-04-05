import { v4 as uuidv4 } from "uuid";

export default function getNewId(): string {
  return `${uuidv4()}_${Date.now().toString()}`;
}
