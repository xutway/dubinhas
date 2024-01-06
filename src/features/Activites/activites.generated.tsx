import * as Types from '../../gql/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ActivitiesCollectionQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ActivitiesCollectionQuery = { __typename: 'Query', activityCollection?: { __typename: 'activityConnection', edges: Array<{ __typename: 'activityEdge', node: { __typename: 'activity', id: string } }> } | null };


export const ActivitiesCollectionDocument = gql`
    query activitiesCollection {
  __typename
  activityCollection {
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

/**
 * __useActivitiesCollectionQuery__
 *
 * To run a query within a React component, call `useActivitiesCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivitiesCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivitiesCollectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useActivitiesCollectionQuery(baseOptions?: Apollo.QueryHookOptions<ActivitiesCollectionQuery, ActivitiesCollectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivitiesCollectionQuery, ActivitiesCollectionQueryVariables>(ActivitiesCollectionDocument, options);
      }
export function useActivitiesCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivitiesCollectionQuery, ActivitiesCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivitiesCollectionQuery, ActivitiesCollectionQueryVariables>(ActivitiesCollectionDocument, options);
        }
export function useActivitiesCollectionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ActivitiesCollectionQuery, ActivitiesCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ActivitiesCollectionQuery, ActivitiesCollectionQueryVariables>(ActivitiesCollectionDocument, options);
        }
export type ActivitiesCollectionQueryHookResult = ReturnType<typeof useActivitiesCollectionQuery>;
export type ActivitiesCollectionLazyQueryHookResult = ReturnType<typeof useActivitiesCollectionLazyQuery>;
export type ActivitiesCollectionSuspenseQueryHookResult = ReturnType<typeof useActivitiesCollectionSuspenseQuery>;
export type ActivitiesCollectionQueryResult = Apollo.QueryResult<ActivitiesCollectionQuery, ActivitiesCollectionQueryVariables>;