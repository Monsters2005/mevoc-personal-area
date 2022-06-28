import { List } from '../../@types/entities/List';
import { Id } from '../../@types/shared-kernel';
import { baseApi } from './baseApi';

export const listApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getListById: builder.query<List, Id>({
      query: id => ({
        url: `/list/${id}`,
        method: 'GET',
      }),
    }),
    getAllLists: builder.query<List[], void>({
      query: () => ({
        url: '/list',
        method: 'GET',
      }),
    }),
    createList: builder.mutation<List, Partial<List>>({
      query: body => ({
        url: '/list',
        method: 'POST',
        body,
      }),
    }),
    updateList: builder.mutation<List, Partial<List> & Pick<List, 'id'>>({
      query(body) {
        return {
          url: `list/${body.id}`,
          method: 'PUT',
          body,
        };
      },
    }),
    deleteList: builder.mutation<List, Id>({
      query: id => ({
        url: `/word/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});
