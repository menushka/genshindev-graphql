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

export type Boss = BossWeekly;

export type BossWeekly = {
  __typename?: 'BossWeekly';
  artifacts?: Maybe<Array<Maybe<Artifact>>>;
  description?: Maybe<Scalars['String']['output']>;
  drops?: Maybe<Array<Maybe<BossWeeklyDrop>>>;
  name?: Maybe<Scalars['String']['output']>;
};

export type BossWeeklyDrop = {
  __typename?: 'BossWeeklyDrop';
  name?: Maybe<Scalars['String']['output']>;
  rarity?: Maybe<Scalars['Int']['output']>;
  source?: Maybe<Scalars['String']['output']>;
};

export type Character = {
  __typename?: 'Character';
  name?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  vision?: Maybe<Element>;
};

export type Consumable = ConsumableFood | ConsumablePotion;

export type ConsumableFood = {
  __typename?: 'ConsumableFood';
  description?: Maybe<Scalars['String']['output']>;
  effect?: Maybe<Scalars['String']['output']>;
  hasRecipe?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  proficiency?: Maybe<Scalars['Int']['output']>;
  rarity?: Maybe<Scalars['Int']['output']>;
  recipe?: Maybe<Array<Maybe<ConsumableFoodRecipe>>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type ConsumableFoodRecipe = {
  __typename?: 'ConsumableFoodRecipe';
  item?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
};

export type ConsumablePotion = {
  __typename?: 'ConsumablePotion';
  crafting?: Maybe<Array<Maybe<ConsumablePotionCraft>>>;
  effect?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rarity?: Maybe<Scalars['Int']['output']>;
};

export type ConsumablePotionCraft = {
  __typename?: 'ConsumablePotionCraft';
  item?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
};

export type Domain = {
  __typename?: 'Domain';
  description?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nation?: Maybe<Nation>;
  recommendedElements?: Maybe<Array<Maybe<Element>>>;
  requirements?: Maybe<Array<Maybe<DomainRequirement>>>;
  rewards?: Maybe<Array<Maybe<DomainReward>>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type DomainRequirement = {
  __typename?: 'DomainRequirement';
  adventureRank?: Maybe<Scalars['Int']['output']>;
  level?: Maybe<Scalars['Int']['output']>;
  leyLineDisorder?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  recommendedLevel?: Maybe<Scalars['Int']['output']>;
};

export type DomainReward = {
  __typename?: 'DomainReward';
  day?: Maybe<Scalars['String']['output']>;
  details?: Maybe<Array<Maybe<DomainRewardDetail>>>;
};

export type DomainRewardDetail = {
  __typename?: 'DomainRewardDetail';
  adventureExperience?: Maybe<Scalars['Int']['output']>;
  companionshipExperience?: Maybe<Scalars['Int']['output']>;
  drops?: Maybe<Array<Maybe<DomainRewardDetailDrop>>>;
  level?: Maybe<Scalars['Int']['output']>;
  mora?: Maybe<Scalars['Int']['output']>;
};

export type DomainRewardDetailDrop = {
  __typename?: 'DomainRewardDetailDrop';
  dropMax?: Maybe<Scalars['Int']['output']>;
  dropMin?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Element = {
  __typename?: 'Element';
  key?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  reactions?: Maybe<Array<Maybe<ElementReaction>>>;
};

export type ElementReaction = {
  __typename?: 'ElementReaction';
  description?: Maybe<Scalars['String']['output']>;
  elements?: Maybe<Array<Maybe<Element>>>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Enemy = {
  __typename?: 'Enemy';
  artifacts?: Maybe<Array<Maybe<Artifact>>>;
  description?: Maybe<Scalars['String']['output']>;
  drops?: Maybe<Array<Maybe<EnemyDrop>>>;
  elementalDescription?: Maybe<Array<Maybe<EnemyDescription>>>;
  elements?: Maybe<Array<Maybe<Element>>>;
  faction?: Maybe<Scalars['String']['output']>;
  family?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  moraGained?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type EnemyDescription = {
  __typename?: 'EnemyDescription';
  description?: Maybe<Scalars['String']['output']>;
  element?: Maybe<Element>;
};

export type EnemyDrop = {
  __typename?: 'EnemyDrop';
  minimumLevel?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rarity?: Maybe<Scalars['Int']['output']>;
};

export type Material = MaterialBossMaterial | MaterialCharacterAscension | MaterialCharacterExperience | MaterialCommonAscension | MaterialCookingIngredients | MaterialLocalSpecialties | MaterialTalentBook | MaterialTalentBoss | MaterialWeaponAscension | MaterialWeaponExperience;

export type MaterialBossMaterial = {
  __typename?: 'MaterialBossMaterial';
  characters?: Maybe<Array<Maybe<Character>>>;
  name?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
};

export type MaterialCharacterAscension = {
  __typename?: 'MaterialCharacterAscension';
  element?: Maybe<Element>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rarity?: Maybe<Scalars['Int']['output']>;
  sources?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type MaterialCharacterExperience = {
  __typename?: 'MaterialCharacterExperience';
  experience?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rarity?: Maybe<Scalars['Int']['output']>;
};

export type MaterialCommonAscension = {
  __typename?: 'MaterialCommonAscension';
  characters?: Maybe<Array<Maybe<Character>>>;
  enemy?: Maybe<Array<Maybe<Enemy>>>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rarity?: Maybe<Scalars['Int']['output']>;
};

export type MaterialCookingIngredients = {
  __typename?: 'MaterialCookingIngredients';
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  sources?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type MaterialLocalSpecialties = {
  __typename?: 'MaterialLocalSpecialties';
  characters?: Maybe<Array<Maybe<Character>>>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nation?: Maybe<Nation>;
};

export type MaterialTalentBook = {
  __typename?: 'MaterialTalentBook';
  availability?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  characters?: Maybe<Array<Maybe<Character>>>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rarity?: Maybe<Scalars['Int']['output']>;
  source?: Maybe<Domain>;
};

export type MaterialTalentBoss = {
  __typename?: 'MaterialTalentBoss';
  characters?: Maybe<Array<Maybe<Character>>>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type MaterialWeaponAscension = {
  __typename?: 'MaterialWeaponAscension';
  availability?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rarity?: Maybe<Scalars['Int']['output']>;
  source?: Maybe<Domain>;
  weapons?: Maybe<Array<Maybe<Weapon>>>;
};

export type MaterialWeaponExperience = {
  __typename?: 'MaterialWeaponExperience';
  experience?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  rarity?: Maybe<Scalars['Int']['output']>;
  source?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type Nation = {
  __typename?: 'Nation';
  archon?: Maybe<Scalars['String']['output']>;
  controllingEntity?: Maybe<Scalars['String']['output']>;
  element?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  artifact?: Maybe<Artifact>;
  artifacts?: Maybe<Array<Maybe<Artifact>>>;
  boss?: Maybe<Boss>;
  bosses?: Maybe<Array<Maybe<Boss>>>;
  character?: Maybe<Character>;
  characters?: Maybe<Array<Maybe<Character>>>;
  consumable?: Maybe<Consumable>;
  consumables?: Maybe<Array<Maybe<Consumable>>>;
  domain?: Maybe<Domain>;
  domains?: Maybe<Array<Maybe<Domain>>>;
  element?: Maybe<Element>;
  elements?: Maybe<Array<Maybe<Element>>>;
  enemies?: Maybe<Array<Maybe<Enemy>>>;
  enemy?: Maybe<Enemy>;
  material?: Maybe<Material>;
  materials?: Maybe<Array<Maybe<Material>>>;
  nation?: Maybe<Nation>;
  nations?: Maybe<Array<Maybe<Nation>>>;
  weapon?: Maybe<Weapon>;
  weapons?: Maybe<Array<Maybe<Weapon>>>;
};


export type QueryArtifactArgs = {
  name: Scalars['String']['input'];
};


export type QueryBossArgs = {
  name: Scalars['String']['input'];
};


export type QueryCharacterArgs = {
  name: Scalars['String']['input'];
};


export type QueryConsumableArgs = {
  name: Scalars['String']['input'];
};


export type QueryDomainArgs = {
  name: Scalars['String']['input'];
};


export type QueryElementArgs = {
  name: Scalars['String']['input'];
};


export type QueryEnemyArgs = {
  name: Scalars['String']['input'];
};


export type QueryMaterialArgs = {
  name: Scalars['String']['input'];
};


export type QueryNationArgs = {
  name: Scalars['String']['input'];
};


export type QueryWeaponArgs = {
  name: Scalars['String']['input'];
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

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = ResolversObject<{
  Boss: ( BossWeekly );
  Consumable: ( ConsumableFood ) | ( ConsumablePotion );
  Material: ( MaterialBossMaterial ) | ( MaterialCharacterAscension ) | ( MaterialCharacterExperience ) | ( MaterialCommonAscension ) | ( MaterialCookingIngredients ) | ( MaterialLocalSpecialties ) | ( MaterialTalentBook ) | ( MaterialTalentBoss ) | ( MaterialWeaponAscension ) | ( MaterialWeaponExperience );
}>;


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Artifact: ResolverTypeWrapper<Artifact>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Boss: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['Boss']>;
  BossWeekly: ResolverTypeWrapper<BossWeekly>;
  BossWeeklyDrop: ResolverTypeWrapper<BossWeeklyDrop>;
  Character: ResolverTypeWrapper<Character>;
  Consumable: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['Consumable']>;
  ConsumableFood: ResolverTypeWrapper<ConsumableFood>;
  ConsumableFoodRecipe: ResolverTypeWrapper<ConsumableFoodRecipe>;
  ConsumablePotion: ResolverTypeWrapper<ConsumablePotion>;
  ConsumablePotionCraft: ResolverTypeWrapper<ConsumablePotionCraft>;
  Domain: ResolverTypeWrapper<Domain>;
  DomainRequirement: ResolverTypeWrapper<DomainRequirement>;
  DomainReward: ResolverTypeWrapper<DomainReward>;
  DomainRewardDetail: ResolverTypeWrapper<DomainRewardDetail>;
  DomainRewardDetailDrop: ResolverTypeWrapper<DomainRewardDetailDrop>;
  Element: ResolverTypeWrapper<Element>;
  ElementReaction: ResolverTypeWrapper<ElementReaction>;
  Enemy: ResolverTypeWrapper<Enemy>;
  EnemyDescription: ResolverTypeWrapper<EnemyDescription>;
  EnemyDrop: ResolverTypeWrapper<EnemyDrop>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Material: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['Material']>;
  MaterialBossMaterial: ResolverTypeWrapper<MaterialBossMaterial>;
  MaterialCharacterAscension: ResolverTypeWrapper<MaterialCharacterAscension>;
  MaterialCharacterExperience: ResolverTypeWrapper<MaterialCharacterExperience>;
  MaterialCommonAscension: ResolverTypeWrapper<MaterialCommonAscension>;
  MaterialCookingIngredients: ResolverTypeWrapper<MaterialCookingIngredients>;
  MaterialLocalSpecialties: ResolverTypeWrapper<MaterialLocalSpecialties>;
  MaterialTalentBook: ResolverTypeWrapper<MaterialTalentBook>;
  MaterialTalentBoss: ResolverTypeWrapper<MaterialTalentBoss>;
  MaterialWeaponAscension: ResolverTypeWrapper<MaterialWeaponAscension>;
  MaterialWeaponExperience: ResolverTypeWrapper<MaterialWeaponExperience>;
  Nation: ResolverTypeWrapper<Nation>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Weapon: ResolverTypeWrapper<Weapon>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Artifact: Artifact;
  Boolean: Scalars['Boolean']['output'];
  Boss: ResolversUnionTypes<ResolversParentTypes>['Boss'];
  BossWeekly: BossWeekly;
  BossWeeklyDrop: BossWeeklyDrop;
  Character: Character;
  Consumable: ResolversUnionTypes<ResolversParentTypes>['Consumable'];
  ConsumableFood: ConsumableFood;
  ConsumableFoodRecipe: ConsumableFoodRecipe;
  ConsumablePotion: ConsumablePotion;
  ConsumablePotionCraft: ConsumablePotionCraft;
  Domain: Domain;
  DomainRequirement: DomainRequirement;
  DomainReward: DomainReward;
  DomainRewardDetail: DomainRewardDetail;
  DomainRewardDetailDrop: DomainRewardDetailDrop;
  Element: Element;
  ElementReaction: ElementReaction;
  Enemy: Enemy;
  EnemyDescription: EnemyDescription;
  EnemyDrop: EnemyDrop;
  Int: Scalars['Int']['output'];
  Material: ResolversUnionTypes<ResolversParentTypes>['Material'];
  MaterialBossMaterial: MaterialBossMaterial;
  MaterialCharacterAscension: MaterialCharacterAscension;
  MaterialCharacterExperience: MaterialCharacterExperience;
  MaterialCommonAscension: MaterialCommonAscension;
  MaterialCookingIngredients: MaterialCookingIngredients;
  MaterialLocalSpecialties: MaterialLocalSpecialties;
  MaterialTalentBook: MaterialTalentBook;
  MaterialTalentBoss: MaterialTalentBoss;
  MaterialWeaponAscension: MaterialWeaponAscension;
  MaterialWeaponExperience: MaterialWeaponExperience;
  Nation: Nation;
  Query: {};
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

export type BossResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Boss'] = ResolversParentTypes['Boss']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BossWeekly', ParentType, ContextType>;
}>;

export type BossWeeklyResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BossWeekly'] = ResolversParentTypes['BossWeekly']> = ResolversObject<{
  artifacts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Artifact']>>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  drops?: Resolver<Maybe<Array<Maybe<ResolversTypes['BossWeeklyDrop']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BossWeeklyDropResolvers<ContextType = Context, ParentType extends ResolversParentTypes['BossWeeklyDrop'] = ResolversParentTypes['BossWeeklyDrop']> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rarity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CharacterResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Character'] = ResolversParentTypes['Character']> = ResolversObject<{
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  vision?: Resolver<Maybe<ResolversTypes['Element']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConsumableResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Consumable'] = ResolversParentTypes['Consumable']> = ResolversObject<{
  __resolveType: TypeResolveFn<'ConsumableFood' | 'ConsumablePotion', ParentType, ContextType>;
}>;

export type ConsumableFoodResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ConsumableFood'] = ResolversParentTypes['ConsumableFood']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  effect?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasRecipe?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  proficiency?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  rarity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  recipe?: Resolver<Maybe<Array<Maybe<ResolversTypes['ConsumableFoodRecipe']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConsumableFoodRecipeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ConsumableFoodRecipe'] = ResolversParentTypes['ConsumableFoodRecipe']> = ResolversObject<{
  item?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConsumablePotionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ConsumablePotion'] = ResolversParentTypes['ConsumablePotion']> = ResolversObject<{
  crafting?: Resolver<Maybe<Array<Maybe<ResolversTypes['ConsumablePotionCraft']>>>, ParentType, ContextType>;
  effect?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rarity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ConsumablePotionCraftResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ConsumablePotionCraft'] = ResolversParentTypes['ConsumablePotionCraft']> = ResolversObject<{
  item?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DomainResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Domain'] = ResolversParentTypes['Domain']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nation?: Resolver<Maybe<ResolversTypes['Nation']>, ParentType, ContextType>;
  recommendedElements?: Resolver<Maybe<Array<Maybe<ResolversTypes['Element']>>>, ParentType, ContextType>;
  requirements?: Resolver<Maybe<Array<Maybe<ResolversTypes['DomainRequirement']>>>, ParentType, ContextType>;
  rewards?: Resolver<Maybe<Array<Maybe<ResolversTypes['DomainReward']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DomainRequirementResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DomainRequirement'] = ResolversParentTypes['DomainRequirement']> = ResolversObject<{
  adventureRank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  leyLineDisorder?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  recommendedLevel?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DomainRewardResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DomainReward'] = ResolversParentTypes['DomainReward']> = ResolversObject<{
  day?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  details?: Resolver<Maybe<Array<Maybe<ResolversTypes['DomainRewardDetail']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DomainRewardDetailResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DomainRewardDetail'] = ResolversParentTypes['DomainRewardDetail']> = ResolversObject<{
  adventureExperience?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  companionshipExperience?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  drops?: Resolver<Maybe<Array<Maybe<ResolversTypes['DomainRewardDetailDrop']>>>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  mora?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DomainRewardDetailDropResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DomainRewardDetailDrop'] = ResolversParentTypes['DomainRewardDetailDrop']> = ResolversObject<{
  dropMax?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  dropMin?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ElementResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Element'] = ResolversParentTypes['Element']> = ResolversObject<{
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reactions?: Resolver<Maybe<Array<Maybe<ResolversTypes['ElementReaction']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ElementReactionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ElementReaction'] = ResolversParentTypes['ElementReaction']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  elements?: Resolver<Maybe<Array<Maybe<ResolversTypes['Element']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnemyResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Enemy'] = ResolversParentTypes['Enemy']> = ResolversObject<{
  artifacts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Artifact']>>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  drops?: Resolver<Maybe<Array<Maybe<ResolversTypes['EnemyDrop']>>>, ParentType, ContextType>;
  elementalDescription?: Resolver<Maybe<Array<Maybe<ResolversTypes['EnemyDescription']>>>, ParentType, ContextType>;
  elements?: Resolver<Maybe<Array<Maybe<ResolversTypes['Element']>>>, ParentType, ContextType>;
  faction?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  family?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  moraGained?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  region?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnemyDescriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['EnemyDescription'] = ResolversParentTypes['EnemyDescription']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  element?: Resolver<Maybe<ResolversTypes['Element']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EnemyDropResolvers<ContextType = Context, ParentType extends ResolversParentTypes['EnemyDrop'] = ResolversParentTypes['EnemyDrop']> = ResolversObject<{
  minimumLevel?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rarity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MaterialResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Material'] = ResolversParentTypes['Material']> = ResolversObject<{
  __resolveType: TypeResolveFn<'MaterialBossMaterial' | 'MaterialCharacterAscension' | 'MaterialCharacterExperience' | 'MaterialCommonAscension' | 'MaterialCookingIngredients' | 'MaterialLocalSpecialties' | 'MaterialTalentBook' | 'MaterialTalentBoss' | 'MaterialWeaponAscension' | 'MaterialWeaponExperience', ParentType, ContextType>;
}>;

export type MaterialBossMaterialResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MaterialBossMaterial'] = ResolversParentTypes['MaterialBossMaterial']> = ResolversObject<{
  characters?: Resolver<Maybe<Array<Maybe<ResolversTypes['Character']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MaterialCharacterAscensionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MaterialCharacterAscension'] = ResolversParentTypes['MaterialCharacterAscension']> = ResolversObject<{
  element?: Resolver<Maybe<ResolversTypes['Element']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rarity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sources?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MaterialCharacterExperienceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MaterialCharacterExperience'] = ResolversParentTypes['MaterialCharacterExperience']> = ResolversObject<{
  experience?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rarity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MaterialCommonAscensionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MaterialCommonAscension'] = ResolversParentTypes['MaterialCommonAscension']> = ResolversObject<{
  characters?: Resolver<Maybe<Array<Maybe<ResolversTypes['Character']>>>, ParentType, ContextType>;
  enemy?: Resolver<Maybe<Array<Maybe<ResolversTypes['Enemy']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rarity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MaterialCookingIngredientsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MaterialCookingIngredients'] = ResolversParentTypes['MaterialCookingIngredients']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sources?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MaterialLocalSpecialtiesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MaterialLocalSpecialties'] = ResolversParentTypes['MaterialLocalSpecialties']> = ResolversObject<{
  characters?: Resolver<Maybe<Array<Maybe<ResolversTypes['Character']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nation?: Resolver<Maybe<ResolversTypes['Nation']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MaterialTalentBookResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MaterialTalentBook'] = ResolversParentTypes['MaterialTalentBook']> = ResolversObject<{
  availability?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  characters?: Resolver<Maybe<Array<Maybe<ResolversTypes['Character']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rarity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['Domain']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MaterialTalentBossResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MaterialTalentBoss'] = ResolversParentTypes['MaterialTalentBoss']> = ResolversObject<{
  characters?: Resolver<Maybe<Array<Maybe<ResolversTypes['Character']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MaterialWeaponAscensionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MaterialWeaponAscension'] = ResolversParentTypes['MaterialWeaponAscension']> = ResolversObject<{
  availability?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rarity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  source?: Resolver<Maybe<ResolversTypes['Domain']>, ParentType, ContextType>;
  weapons?: Resolver<Maybe<Array<Maybe<ResolversTypes['Weapon']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MaterialWeaponExperienceResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MaterialWeaponExperience'] = ResolversParentTypes['MaterialWeaponExperience']> = ResolversObject<{
  experience?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rarity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  source?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Nation'] = ResolversParentTypes['Nation']> = ResolversObject<{
  archon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  controllingEntity?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  element?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  artifact?: Resolver<Maybe<ResolversTypes['Artifact']>, ParentType, ContextType, RequireFields<QueryArtifactArgs, 'name'>>;
  artifacts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Artifact']>>>, ParentType, ContextType>;
  boss?: Resolver<Maybe<ResolversTypes['Boss']>, ParentType, ContextType, RequireFields<QueryBossArgs, 'name'>>;
  bosses?: Resolver<Maybe<Array<Maybe<ResolversTypes['Boss']>>>, ParentType, ContextType>;
  character?: Resolver<Maybe<ResolversTypes['Character']>, ParentType, ContextType, RequireFields<QueryCharacterArgs, 'name'>>;
  characters?: Resolver<Maybe<Array<Maybe<ResolversTypes['Character']>>>, ParentType, ContextType>;
  consumable?: Resolver<Maybe<ResolversTypes['Consumable']>, ParentType, ContextType, RequireFields<QueryConsumableArgs, 'name'>>;
  consumables?: Resolver<Maybe<Array<Maybe<ResolversTypes['Consumable']>>>, ParentType, ContextType>;
  domain?: Resolver<Maybe<ResolversTypes['Domain']>, ParentType, ContextType, RequireFields<QueryDomainArgs, 'name'>>;
  domains?: Resolver<Maybe<Array<Maybe<ResolversTypes['Domain']>>>, ParentType, ContextType>;
  element?: Resolver<Maybe<ResolversTypes['Element']>, ParentType, ContextType, RequireFields<QueryElementArgs, 'name'>>;
  elements?: Resolver<Maybe<Array<Maybe<ResolversTypes['Element']>>>, ParentType, ContextType>;
  enemies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Enemy']>>>, ParentType, ContextType>;
  enemy?: Resolver<Maybe<ResolversTypes['Enemy']>, ParentType, ContextType, RequireFields<QueryEnemyArgs, 'name'>>;
  material?: Resolver<Maybe<ResolversTypes['Material']>, ParentType, ContextType, RequireFields<QueryMaterialArgs, 'name'>>;
  materials?: Resolver<Maybe<Array<Maybe<ResolversTypes['Material']>>>, ParentType, ContextType>;
  nation?: Resolver<Maybe<ResolversTypes['Nation']>, ParentType, ContextType, RequireFields<QueryNationArgs, 'name'>>;
  nations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Nation']>>>, ParentType, ContextType>;
  weapon?: Resolver<Maybe<ResolversTypes['Weapon']>, ParentType, ContextType, RequireFields<QueryWeaponArgs, 'name'>>;
  weapons?: Resolver<Maybe<Array<Maybe<ResolversTypes['Weapon']>>>, ParentType, ContextType>;
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
  Boss?: BossResolvers<ContextType>;
  BossWeekly?: BossWeeklyResolvers<ContextType>;
  BossWeeklyDrop?: BossWeeklyDropResolvers<ContextType>;
  Character?: CharacterResolvers<ContextType>;
  Consumable?: ConsumableResolvers<ContextType>;
  ConsumableFood?: ConsumableFoodResolvers<ContextType>;
  ConsumableFoodRecipe?: ConsumableFoodRecipeResolvers<ContextType>;
  ConsumablePotion?: ConsumablePotionResolvers<ContextType>;
  ConsumablePotionCraft?: ConsumablePotionCraftResolvers<ContextType>;
  Domain?: DomainResolvers<ContextType>;
  DomainRequirement?: DomainRequirementResolvers<ContextType>;
  DomainReward?: DomainRewardResolvers<ContextType>;
  DomainRewardDetail?: DomainRewardDetailResolvers<ContextType>;
  DomainRewardDetailDrop?: DomainRewardDetailDropResolvers<ContextType>;
  Element?: ElementResolvers<ContextType>;
  ElementReaction?: ElementReactionResolvers<ContextType>;
  Enemy?: EnemyResolvers<ContextType>;
  EnemyDescription?: EnemyDescriptionResolvers<ContextType>;
  EnemyDrop?: EnemyDropResolvers<ContextType>;
  Material?: MaterialResolvers<ContextType>;
  MaterialBossMaterial?: MaterialBossMaterialResolvers<ContextType>;
  MaterialCharacterAscension?: MaterialCharacterAscensionResolvers<ContextType>;
  MaterialCharacterExperience?: MaterialCharacterExperienceResolvers<ContextType>;
  MaterialCommonAscension?: MaterialCommonAscensionResolvers<ContextType>;
  MaterialCookingIngredients?: MaterialCookingIngredientsResolvers<ContextType>;
  MaterialLocalSpecialties?: MaterialLocalSpecialtiesResolvers<ContextType>;
  MaterialTalentBook?: MaterialTalentBookResolvers<ContextType>;
  MaterialTalentBoss?: MaterialTalentBossResolvers<ContextType>;
  MaterialWeaponAscension?: MaterialWeaponAscensionResolvers<ContextType>;
  MaterialWeaponExperience?: MaterialWeaponExperienceResolvers<ContextType>;
  Nation?: NationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Weapon?: WeaponResolvers<ContextType>;
}>;

