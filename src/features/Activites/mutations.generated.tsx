import * as Types from '../../gql/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InsertNewActivityMutationVariables = Types.Exact<{
  activity_name?: Types.InputMaybe<Types.Scalars['String']['input']>;
  activity_description?: Types.InputMaybe<Types.Scalars['String']['input']>;
  activity_shift?: Types.InputMaybe<Types.Scalars['String']['input']>;
  video_name?: Types.InputMaybe<Types.Scalars['String']['input']>;
  image_name?: Types.InputMaybe<Types.Scalars['String']['input']>;
  video_url?: Types.InputMaybe<Types.Scalars['String']['input']>;
  image_url?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type InsertNewActivityMutation = { __typename: 'Mutation', insert_activity?: { __typename: 'activityConnection', edges: Array<{ __typename: 'activityEdge', node: { __typename: 'activity', id: string } }> } | null };


export const InsertNewActivityDocument = gql`
    mutation insertNewActivity($activity_name: String, $activity_description: String, $activity_shift: String, $video_name: String, $image_name: String, $video_url: String, $image_url: String) {
  __typename
  insert_activity(
    activity_name: $activity_name
    activity_description: $activity_description
    activity_shift: $activity_shift
    video_name: $video_name
    image_name: $image_name
    video_url: $video_url
    image_url: $image_url
  ) {
    __typename
    edges {
      __typename
      node {
        __typename
        id
      }
    }
  }
}
    `;
export type InsertNewActivityMutationFn = Apollo.MutationFunction<InsertNewActivityMutation, InsertNewActivityMutationVariables>;

/**
 * __useInsertNewActivityMutation__
 *
 * To run a mutation, you first call `useInsertNewActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertNewActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertNewActivityMutation, { data, loading, error }] = useInsertNewActivityMutation({
 *   variables: {
 *      activity_name: // value for 'activity_name'
 *      activity_description: // value for 'activity_description'
 *      activity_shift: // value for 'activity_shift'
 *      video_name: // value for 'video_name'
 *      image_name: // value for 'image_name'
 *      video_url: // value for 'video_url'
 *      image_url: // value for 'image_url'
 *   },
 * });
 */
export function useInsertNewActivityMutation(baseOptions?: Apollo.MutationHookOptions<InsertNewActivityMutation, InsertNewActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertNewActivityMutation, InsertNewActivityMutationVariables>(InsertNewActivityDocument, options);
      }
export type InsertNewActivityMutationHookResult = ReturnType<typeof useInsertNewActivityMutation>;
export type InsertNewActivityMutationResult = Apollo.MutationResult<InsertNewActivityMutation>;
export type InsertNewActivityMutationOptions = Apollo.BaseMutationOptions<InsertNewActivityMutation, InsertNewActivityMutationVariables>;