import { User } from '../../entities/User';
import { Word } from '../../entities/Word';

export type AddListDto = {
  listTitle: string;
  userId: number;
  words?: Word[];
};
