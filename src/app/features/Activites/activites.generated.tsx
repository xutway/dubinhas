import * as Types from '../../../types';

export type Unnamed_1_QueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = { __typename?: 'Query', activitiesCollection?: { __typename?: 'activitiesConnection', edges: Array<{ __typename?: 'activitiesEdge', node: { __typename?: 'activities', id: any } }> } | null };
