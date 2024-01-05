import { CreateUserDto } from '../../@types/dto/user/create.dto';
import { User } from '../../@types/entities/User';
import { Id, UniqueId } from '../../@types/shared-kernel';
import { Path } from '../../constants/routes';
import { baseApi } from './baseApi';

const path = Path.USER;

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: `${path}/me`,
        method: 'GET',
      }),
      providesTags: [{ type: 'User' }, 'Mfa'],
    }),
    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: `${path}`,
        method: 'GET',
      }),
    }),
    getUserById: builder.query<User, Id>({
      query: (id: number) => ({
        url: `${path}/${id}`,
        method: 'GET',
      }),
    }),
    createUser: builder.mutation<void, CreateUserDto>({
      query: () => ({
        url: `${path}`,
        method: 'POST',
      }),
    }),
    deleteUser: builder.mutation<User, UniqueId>({
      query: id => ({
        url: `${path}/${id}`,
        method: 'DELETE',
      }),
    }),
    updateUser: builder.mutation<User, Partial<User> & Pick<User, 'id'>>({
      query(body) {
        return {
          url: `${path}/${body.id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['User'],
    }),
    toggleMfa: builder.mutation<void, { code: string }>({
      query: body => ({
        url: `${path}/me/mfa`,
        method: 'PUT',
        body: {
          code: body.code,
        },
      }),
      invalidatesTags: ['Mfa'],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useGetAllUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useToggleMfaMutation,
} = userApi;
