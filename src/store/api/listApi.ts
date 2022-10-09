import { List } from '../../@types/entities/List';
import { Id } from '../../@types/shared-kernel';
import { Path } from '../../constants/routes';
import { baseApi } from './baseApi';

const path = Path.LIST;

export const listApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getListsByUserId: builder.query<List[], Id>({
      query: id => ({
        url: `${path}/${id}`,
        method: 'GET',
      }),
      providesTags: result => (result
        ? [
          ...result.map(({ id }) => ({ type: 'List', id } as const)),
          { type: 'List', id: 'LIST' },
        ]
        : [{ type: 'List', id: 'LIST' }]),
    }),

    // getListByListId: builder.query<List[], void>({
    //   query: id => ({
    //     url: `${path}/${id}`,
    //     method: 'GET',
    //   }),
    // }),
    createList: builder.mutation<List, Partial<List>>({
      query: body => ({
        url: path,
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'List', id: 'LIST' },
        { type: 'User', id: 'LIST' },
        { type: 'Word', id: 'LIST' },
      ],
    }),
    updateList: builder.mutation<List, Partial<List> & Pick<List, 'id'>>({
      query(body) {
        return {
          url: `${path}/${body.id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: [
        { type: 'List', id: 'LIST' },
        { type: 'User', id: 'LIST' },
        { type: 'Word', id: 'LIST' },
      ],
    }),
    deleteList: builder.mutation<List, Id>({
      query: id => ({
        url: `${path}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'List', id: 'LIST' },
        { type: 'User', id: 'LIST' },
        { type: 'Word', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useCreateListMutation,
  useDeleteListMutation,
  useUpdateListMutation,
  // useGetListByListIdQuery,
  useGetListsByUserIdQuery,
} = listApi;
