import { List } from '../../@types/entities/List';
import { Id } from '../../@types/shared-kernel';
import { Path } from '../../constants/routes';
import { baseApi } from './baseApi';

const path = Path.LIST;

export const listApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getListById: builder.query<List, Id>({
      query: id => ({
        url: `${path}/${id}`,
        method: 'GET',
      }),
    }),
    getAllLists: builder.query<List[], void>({
      query: () => ({
        url: path,
        method: 'GET',
      }),
    }),
    createList: builder.mutation<List, Partial<List>>({
      query: body => ({
        url: path,
        method: 'POST',
        body,
      }),
    }),
    updateList: builder.mutation<List, Partial<List> & Pick<List, 'id'>>({
      query(body) {
        return {
          url: `${path}/${body.id}`,
          method: 'PUT',
          body,
        };
      },
    }),
    deleteList: builder.mutation<List, Id>({
      query: id => ({
        url: `${path}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateListMutation,
  useDeleteListMutation,
  useGetAllListsQuery,
  useGetListByIdQuery,
  useUpdateListMutation,
} = listApi;
