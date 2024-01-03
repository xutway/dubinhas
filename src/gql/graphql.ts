/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A high precision floating point value represented as a string */
  BigFloat: { input: string; output: string; }
  /** An arbitrary size integer represented as a string */
  BigInt: { input: string; output: string; }
  /** An opaque string using for tracking a position in results during pagination */
  Cursor: { input: any; output: any; }
  /** A date wihout time information */
  Date: { input: string; output: string; }
  /** A date and time */
  Datetime: { input: string; output: string; }
  /** A Javascript Object Notation value serialized as a string */
  JSON: { input: string; output: string; }
  /** Any type not handled by the type system */
  Opaque: { input: any; output: any; }
  /** A time without date information */
  Time: { input: string; output: string; }
  /** A universally unique identifier */
  UUID: { input: string; output: string; }
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']['input']>;
  gt?: InputMaybe<Scalars['BigFloat']['input']>;
  gte?: InputMaybe<Scalars['BigFloat']['input']>;
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigFloat']['input']>;
  lte?: InputMaybe<Scalars['BigFloat']['input']>;
  neq?: InputMaybe<Scalars['BigFloat']['input']>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  neq?: InputMaybe<Scalars['BigInt']['input']>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']['input']>;
  gt?: InputMaybe<Scalars['Datetime']['input']>;
  gte?: InputMaybe<Scalars['Datetime']['input']>;
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']['input']>;
  lte?: InputMaybe<Scalars['Datetime']['input']>;
  neq?: InputMaybe<Scalars['Datetime']['input']>;
};

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL'
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the `activity` collection */
  deleteFromactivityCollection: ActivityDeleteResponse;
  /** Deletes zero or more records from the `activity_media` collection */
  deleteFromactivity_mediaCollection: Activity_MediaDeleteResponse;
  /** Deletes zero or more records from the `media` collection */
  deleteFrommediaCollection: MediaDeleteResponse;
  /** Adds one or more `activity` records to the collection */
  insertIntoactivityCollection?: Maybe<ActivityInsertResponse>;
  /** Adds one or more `activity_media` records to the collection */
  insertIntoactivity_mediaCollection?: Maybe<Activity_MediaInsertResponse>;
  /** Adds one or more `media` records to the collection */
  insertIntomediaCollection?: Maybe<MediaInsertResponse>;
  insert_activity?: Maybe<ActivityConnection>;
  /** Updates zero or more records in the `activity` collection */
  updateactivityCollection: ActivityUpdateResponse;
  /** Updates zero or more records in the `activity_media` collection */
  updateactivity_mediaCollection: Activity_MediaUpdateResponse;
  /** Updates zero or more records in the `media` collection */
  updatemediaCollection: MediaUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromactivityCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ActivityFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromactivity_MediaCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Activity_MediaFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFrommediaCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<MediaFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoactivityCollectionArgs = {
  objects: Array<ActivityInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoactivity_MediaCollectionArgs = {
  objects: Array<Activity_MediaInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntomediaCollectionArgs = {
  objects: Array<MediaInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsert_ActivityArgs = {
  activity_description?: InputMaybe<Scalars['String']['input']>;
  activity_name?: InputMaybe<Scalars['String']['input']>;
  activity_shift?: InputMaybe<Scalars['String']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ActivityFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  image_name?: InputMaybe<Scalars['String']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ActivityOrderBy>>;
  video_name?: InputMaybe<Scalars['String']['input']>;
  video_url?: InputMaybe<Scalars['String']['input']>;
};


/** The root type for creating and mutating data */
export type MutationUpdateactivityCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ActivityFilter>;
  set: ActivityUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateactivity_MediaCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Activity_MediaFilter>;
  set: Activity_MediaUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatemediaCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<MediaFilter>;
  set: MediaUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output'];
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `activity` */
  activityCollection?: Maybe<ActivityConnection>;
  /** A pagable collection of type `activity_media` */
  activity_mediaCollection?: Maybe<Activity_MediaConnection>;
  /** A pagable collection of type `media` */
  mediaCollection?: Maybe<MediaConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
};


/** The root type for querying data */
export type QueryActivityCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ActivityFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ActivityOrderBy>>;
};


/** The root type for querying data */
export type QueryActivity_MediaCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Activity_MediaFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Activity_MediaOrderBy>>;
};


/** The root type for querying data */
export type QueryMediaCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<MediaFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MediaOrderBy>>;
};


/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  iregex?: InputMaybe<Scalars['String']['input']>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  neq?: InputMaybe<Scalars['Time']['input']>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
};

export type Activity = Node & {
  __typename?: 'activity';
  activity_mediaCollection?: Maybe<Activity_MediaConnection>;
  created_at: Scalars['Datetime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  shift?: Maybe<Scalars['String']['output']>;
};


export type ActivityActivity_MediaCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Activity_MediaFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Activity_MediaOrderBy>>;
};

export type ActivityConnection = {
  __typename?: 'activityConnection';
  edges: Array<ActivityEdge>;
  pageInfo: PageInfo;
};

export type ActivityDeleteResponse = {
  __typename?: 'activityDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Activity>;
};

export type ActivityEdge = {
  __typename?: 'activityEdge';
  cursor: Scalars['String']['output'];
  node: Activity;
};

export type ActivityFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ActivityFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<ActivityFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<ActivityFilter>>;
  shift?: InputMaybe<StringFilter>;
};

export type ActivityInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  shift?: InputMaybe<Scalars['String']['input']>;
};

export type ActivityInsertResponse = {
  __typename?: 'activityInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Activity>;
};

export type ActivityOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  shift?: InputMaybe<OrderByDirection>;
};

export type ActivityUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  shift?: InputMaybe<Scalars['String']['input']>;
};

export type ActivityUpdateResponse = {
  __typename?: 'activityUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Activity>;
};

export type Activity_Media = Node & {
  __typename?: 'activity_media';
  activity: Activity;
  activity_id: Scalars['UUID']['output'];
  media: Media;
  media_id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
};

export type Activity_MediaConnection = {
  __typename?: 'activity_mediaConnection';
  edges: Array<Activity_MediaEdge>;
  pageInfo: PageInfo;
};

export type Activity_MediaDeleteResponse = {
  __typename?: 'activity_mediaDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Activity_Media>;
};

export type Activity_MediaEdge = {
  __typename?: 'activity_mediaEdge';
  cursor: Scalars['String']['output'];
  node: Activity_Media;
};

export type Activity_MediaFilter = {
  activity_id?: InputMaybe<UuidFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Activity_MediaFilter>>;
  media_id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Activity_MediaFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Activity_MediaFilter>>;
};

export type Activity_MediaInsertInput = {
  activity_id?: InputMaybe<Scalars['UUID']['input']>;
  media_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Activity_MediaInsertResponse = {
  __typename?: 'activity_mediaInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Activity_Media>;
};

export type Activity_MediaOrderBy = {
  activity_id?: InputMaybe<OrderByDirection>;
  media_id?: InputMaybe<OrderByDirection>;
};

export type Activity_MediaUpdateInput = {
  activity_id?: InputMaybe<Scalars['UUID']['input']>;
  media_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type Activity_MediaUpdateResponse = {
  __typename?: 'activity_mediaUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Activity_Media>;
};

export type Media = Node & {
  __typename?: 'media';
  activity_mediaCollection?: Maybe<Activity_MediaConnection>;
  created_at: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  media_url: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  type: Scalars['String']['output'];
};


export type MediaActivity_MediaCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Activity_MediaFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Activity_MediaOrderBy>>;
};

export type MediaConnection = {
  __typename?: 'mediaConnection';
  edges: Array<MediaEdge>;
  pageInfo: PageInfo;
};

export type MediaDeleteResponse = {
  __typename?: 'mediaDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Media>;
};

export type MediaEdge = {
  __typename?: 'mediaEdge';
  cursor: Scalars['String']['output'];
  node: Media;
};

export type MediaFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<MediaFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  media_url?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<MediaFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<MediaFilter>>;
  type?: InputMaybe<StringFilter>;
};

export type MediaInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  media_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type MediaInsertResponse = {
  __typename?: 'mediaInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Media>;
};

export type MediaOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  media_url?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  type?: InputMaybe<OrderByDirection>;
};

export type MediaUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  media_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type MediaUpdateResponse = {
  __typename?: 'mediaUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Media>;
};

export enum Media_Type {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

/** Boolean expression comparing fields on type "media_type" */
export type Media_TypeFilter = {
  eq?: InputMaybe<Media_Type>;
  in?: InputMaybe<Array<Media_Type>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Media_Type>;
};

export enum Shift {
  Manha = 'MANHA',
  Noite = 'NOITE',
  Tarde = 'TARDE'
}

/** Boolean expression comparing fields on type "shift" */
export type ShiftFilter = {
  eq?: InputMaybe<Shift>;
  in?: InputMaybe<Array<Shift>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Shift>;
};
