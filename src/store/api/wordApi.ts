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
          'Word',
        ]
        : ['Word']),
    }),
    createWord: builder.mutation<Word, CreateWordDto>({
      query: body => ({
        url: path,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Word'],
    }),
    updateWord: builder.mutation<Word, Partial<Word> & Pick<Word, 'id'>>({
      query(body) {
        return {
          url: `${path}/${body.id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Word'],
    }),
  }),
});

export const {
  useCreateWordMutation,
  useGetWordByIdQuery,
  useUpdateWordMutation,
  useGetWordsByListIdQuery,
} = wordApi;
