import { Pack } from '../../@types/entities/WordPack';
import { Id } from '../../@types/shared-kernel';
import { baseApi } from './baseApi';

export const wordpackApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllByUserId: builder.query<Pack[], Id>({
      query: userId => ({
        url: `/wordpack/${userId}`,
        method: 'GET',
      }),
    }),
    getWordpackById: builder.query<Pack, Id>({
      query(id) {
        return {
          url: `/wordpack/${id}`,
          method: 'GET',
        };
      },
    }),
  }),
});
