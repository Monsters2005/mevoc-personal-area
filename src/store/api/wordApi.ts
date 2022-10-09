import { CreateWordDto } from '../../@types/dto/word/create.dto';
import { Word } from '../../@types/entities/Word';
import { Id } from '../../@types/shared-kernel';
import { Path } from '../../constants/routes';
import { baseApi } from './baseApi';

const path = Path.WORD;

export const wordApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getWordById: builder.query<Word, Id>({
      query: id => ({
        url: `${path}/${id}`,
        method: 'GET',
      }),
    }),
    getWordsByListId: builder.query<Word[], Id>({
      query: listId => ({
        url: `${path}/${listId}`,
        method: 'GET',
      }),
      providesTags: result => (result
        ? [
          ...result.map(({ id }) => ({ type: 'Word' as const, id })),
          { type: 'Word', id: 'LIST' },
        ]
        : [{ type: 'Word', id: 'LIST' }]),
    }),
    createWord: builder.mutation<Word, CreateWordDto>({
      query: body => ({
        url: path,
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'List', id: 'LIST' },
        { type: 'Word', id: 'LIST' },
      ],
    }),
    updateWord: builder.mutation<Word, Partial<Word> & Pick<Word, 'id'>>({
      query(body) {
        return {
          url: `${path}/${body.id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: [
        { type: 'List', id: 'LIST' },
        { type: 'Word', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useCreateWordMutation,
  useGetWordByIdQuery,
  useUpdateWordMutation,
  useGetWordsByListIdQuery,
} = wordApi;
