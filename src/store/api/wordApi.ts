import { Word } from '../../@types/entities/Word';
import { Id } from '../../@types/shared-kernel';
import { baseApi } from './baseApi';

export const wordApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getWordById: builder.query<Word, Id>({
      query: id => ({
        url: `/word/${id}`,
        method: 'GET',
      }),
    }),
    createWord: builder.mutation<Word, Id>({
      query: id => ({
        url: '/word',
        method: 'POST',
      }),
    }),
    updateWord: builder.mutation<Word, Partial<Word> & Pick<Word, 'id'>>({
      query(body) {
        return {
          url: `/words/${body.id}`,
          method: 'PUT',
          body,
        };
      },
    }),
  }),
});
