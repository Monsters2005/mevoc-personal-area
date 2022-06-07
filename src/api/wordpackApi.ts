import { Pack } from '../@types/entities/WordPack';
import { baseApi } from './baseApi';

export const wordpackApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllForUser: builder.query<Pack[], number>({
      query: userId => ({
        url: `/wordpack/${userId}`,
        method: 'GET',
      }),
    }),
    getWordpack: builder.query<Pack, number>({
      query(id) {
        return {
          url: `/wordpack/${id}`,
          method: 'GET',
        };
      },
    }),
  }),
});
