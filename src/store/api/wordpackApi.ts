import { Pack } from '../../@types/entities/WordPack';
import { Id } from '../../@types/shared-kernel';
import { Path } from '../../constants/routes';
import { baseApi } from './baseApi';

const path = Path.WORDPACK;

export const wordpackApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllByUserId: builder.query<Pack[], Id>({
      query: userId => ({
        url: `${path}/${userId}`,
        method: 'GET',
      }),
    }),
    getWordpackById: builder.query<Pack, Id>({
      query(id) {
        return {
          url: `${path}/${id}`,
          method: 'GET',
        };
      },
    }),
  }),
});
