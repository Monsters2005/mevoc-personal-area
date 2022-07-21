import { CreateWordDto } from '../../@types/dto/word/create.dto';
import { Word } from '../../@types/entities/Word';
import { Id } from '../../@types/shared-kernel';
import { Path } from '../../constants/routes';
import { baseApi } from './baseApi';

const path = Path.WORD;

export const wordApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getWordById: builder.query<Word, Id>({
      query: id => ({
        url: `${path}/${id}`,
        method: 'GET',
      }),
    }),
    createWord: builder.mutation<Word, CreateWordDto>({
      query: body => ({
        url: path,
        method: 'POST',
        body,
      }),
    }),
    updateWord: builder.mutation<Word, Partial<Word> & Pick<Word, 'id'>>({
      query(body) {
        return {
          url: `${path}/${body.id}`,
          method: 'PUT',
          body,
        };
      },
    }),
  }),
});
