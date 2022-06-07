import { CreateUserDto } from '../../@types/dto/user/create.dto';
import { User } from '../../@types/entities/User';
import { baseApi } from './baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
    }),
    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    }),
    getUserById: builder.query<User, number>({
      query: (id: number) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),
    createUser: builder.mutation<void, CreateUserDto>({
      query: () => ({
        url: '/users',
        method: 'POST',
      }),
    }),
    deleteUser: builder.mutation<User, string>({
      query: id => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
    updateUser: builder.mutation<User, Partial<User> & Pick<User, 'id'>>({
      query(body) {
        return {
          url: `/users/${body.id}`,
          method: 'PUT',
          body,
        };
      },
    }),
  }),
});
