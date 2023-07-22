import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../server';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Artifact = {
  __typename?: 'Artifact';
  fourPieceBonus?: Maybe<Scalars['String']['output']>;
  maxRarity?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  twoPieceBonus?: Maybe<Scalars['String']['output']>;
};

export type Character = {
  __typename?: 'Character';
  name?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  vision?: Maybe<Element>;
};

export type Element = {
  __typename?: 'Element';
  key?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  reactions?: Maybe<Array<Maybe<Reaction>>>;
};

export type Query = {
  __typename?: 'Query';
  artifact?: Maybe<Artifact>;
  artifacts?: Maybe<Array<Maybe<Artifact>>>;
  character?: Maybe<Character>;
  characters?: Maybe<Array<Maybe<Character>>>;
  element?: Maybe<Element>;
  elements?: Maybe<Array<Maybe<Element>>>;
  weapon?: Maybe<Weapon>;
  weapons?: Maybe<Array<Maybe<Weapon>>>;
};


export type QueryArtifactArgs = {
  name: Scalars['String']['input'];
};


export type QueryCharacterArgs = {
  name: Scalars['String']['input'];
};


export type QueryElementArgs = {
  name: Scalars['String']['input'];
};


export type QueryWeaponArgs = {
  name: Scalars['String']['input'];
};

export type Reaction = {
  __typename?: 'Reaction';
  description?: Maybe<Scalars['String']['output']>;
  elements?: Maybe<Array<Maybe<Element>>>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Weapon = {
  __typename?: 'Weapon';
  ascensionMaterial?: Maybe<Scalars['String']['output']>;
  baseAttack?: Maybe<Scalars['Int']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  passiveDesc?: Maybe<Scalars['String']['output']>;
  passiveName?: Maybe<Scalars['String']['output']>;
  rarity?: Maybe<Scalars['Int']['output']>;
  subStat?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Artifact: ResolverTypeWrapper<Artifact>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Character: ResolverTypeWrapper<Character>;
  Element: ResolverTypeWrapper<Element>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Query: ResolverTypeWrapper<{}>;
  Reaction: ResolverTypeWrapper<Reaction>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Weapon: ResolverTypeWrapper<Weapon>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Artifact: Artifact;
  Boolean: Scalars['Boolean']['output'];
  Character: Character;
  Element: Element;
  Int: Scalars['Int']['output'];
  Query: {};
  Reaction: Reaction;
  String: Scalars['String']['output'];
  Weapon: Weapon;
}>;

export type ArtifactResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Artifact'] = ResolversParentTypes['Artifact']> = ResolversObject<{
  fourPieceBonus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  maxRarity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twoPieceBonus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CharacterResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Character'] = ResolversParentTypes['Character']> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vision?: Resolver<Maybe<ResolversTypes['Element']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ElementResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Element'] = ResolversParentTypes['Element']> = ResolversObject<{
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reactions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Reaction']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  artifact?: Resolver<Maybe<ResolversTypes['Artifact']>, ParentType, ContextType, RequireFields<QueryArtifactArgs, 'name'>>;
  artifacts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Artifact']>>>, ParentType, ContextType>;
  character?: Resolver<Maybe<ResolversTypes['Character']>, ParentType, ContextType, RequireFields<QueryCharacterArgs, 'name'>>;
  characters?: Resolver<Maybe<Array<Maybe<ResolversTypes['Character']>>>, ParentType, ContextType>;
  element?: Resolver<Maybe<ResolversTypes['Element']>, ParentType, ContextType, RequireFields<QueryElementArgs, 'name'>>;
  elements?: Resolver<Maybe<Array<Maybe<ResolversTypes['Element']>>>, ParentType, ContextType>;
  weapon?: Resolver<Maybe<ResolversTypes['Weapon']>, ParentType, ContextType, RequireFields<QueryWeaponArgs, 'name'>>;
  weapons?: Resolver<Maybe<Array<Maybe<ResolversTypes['Weapon']>>>, ParentType, ContextType>;
}>;

export type ReactionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Reaction'] = ResolversParentTypes['Reaction']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  elements?: Resolver<Maybe<Array<Maybe<ResolversTypes['Element']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WeaponResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Weapon'] = ResolversParentTypes['Weapon']> = ResolversObject<{
  ascensionMaterial?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  baseAttack?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  passiveDesc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  passiveName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rarity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  subStat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Artifact?: ArtifactResolvers<ContextType>;
  Character?: CharacterResolvers<ContextType>;
  Element?: ElementResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reaction?: ReactionResolvers<ContextType>;
  Weapon?: WeaponResolvers<ContextType>;
}>;

