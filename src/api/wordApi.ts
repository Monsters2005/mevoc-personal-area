import { Word } from '../@types/entities/Word';
import { baseApi } from './baseApi';

export const wordApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getWordById: builder.query<Word, number>({
      query: id => ({
        url: `/word/${id}`,
        method: 'GET',
      }),
    }),
    // getAllByListId: builder.query<Word, number>({
    //   query: id => ({
    //     url: `/word/${id}`,
    //     method: 'GET',
    //   }),
    // }),
    createWord: builder.mutation<Word, number>({
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
