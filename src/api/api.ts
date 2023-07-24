import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb"

import type { CharacterRaw } from '../models/CharacterModel'
import type { ElementRaw } from '../models/ElementModel'
import type { WeaponRaw } from '../models/WeaponModel'
import type { ArtifactRaw } from '../models/ArtifactModel'
import type { NationRaw } from '../models/NationModel'
import type { DomainRaw } from '../models/DomainModel'
import type { BossRaw } from '../models/BossModel'
import type { ConsumableRaw } from '../models/ConsumableModel'
import type { EnemyRaw } from '../models/EnemyModel'
import type { MaterialRaw } from '../models/MaterialModel'

const db = new DynamoDBClient(process.env.IS_OFFLINE ? {
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  credentials: {
    accessKeyId: 'MockAccessKeyId',
    secretAccessKey: 'MockSecretAccessKey'
  },
} : {})
const TableName = 'cache'

const base = 'https://api.genshin.dev'
const apiFetch = async (url: string) => {
  const getCommand = new GetCommand({ TableName, Key: { url } })
  const cachedResponse = await db.send(getCommand)
  if (cachedResponse?.Item?.response) {
    return cachedResponse.Item.response
  }

  const response = await fetch(`${base}${url}`).then(res => res.json())
  const putCommand = new PutCommand({ TableName, Item: { url, response } })
  await db.send(putCommand)
  return response
}

const resolverPerMaterialType = (type: string) => {
  switch (type) {
    case "boss-material":
      return (response: any) => Object.values(response)
    case "character-ascension":
      return (response: any) => Object.entries(response).flatMap(([element, value]) => Object.values(value).map(item => ({ ...item, element })))
    case "character-experience":
      return (response: any) => response.items
    case "common-ascension":
      return (response: any) => Object.values(response).flatMap(({ items, characters, sources }: any) => items.map(item => ({ ...item, characters, sources })))
    case "cooking-ingredients":
      return (response: any) => Object.values(response)
    case "local-specialties":
      return (response: any) => Object.values(response).flat()
    case "talent-book":
      return (response: any) => Object.values(response).flatMap(({ characters, availability, source, items }: any) => items.map(item => ({ ...item, characters, availability, source })))
    case "talent-boss":
      return (response: any) => Object.values(response)
    case "weapon-ascension":
      return (response: any) => Object.values(response).flatMap(({ weapons, availability, source, items }: any) => items.map(item => ({ ...item, weapons, availability, source })))
    case "weapon-experience":
      return (response: any) => response.items
  }
}

const Api = {
  Artifacts: {
    All: () => apiFetch('/artifacts') as Promise<string[]>,
    Specific: (name: string) => apiFetch(`/artifacts/${name}`) as Promise<ArtifactRaw>
  },
  Bosses: {
    All: () => apiFetch('/boss') as Promise<string[]>,
    AllForType: (type: string) => apiFetch(`/boss%2F${type}`) as Promise<string[]>, // %2F is a workaround for a bug: https://github.com/genshindev/api/issues/142
    Specific: (type: string, name: string) => apiFetch(`/boss%2F${type}/${name}`) as Promise<BossRaw> // %2F is a workaround for a bug: https://github.com/genshindev/api/issues/142
  },
  Consumables: {
    All: () => apiFetch('/consumables') as Promise<string[]>,
    AllForType: (type: string) => apiFetch(`/consumables/${type}`) as Promise<ConsumableRaw[]>,
  },
  Characters: {
    All: () => apiFetch('/characters') as Promise<string[]>,
    Specific: (name: string) => apiFetch(`/characters/${name}`) as Promise<CharacterRaw>
  },
  Domains: {
    All: () => apiFetch('/domains') as Promise<string[]>,
    Specific: (name: string) => apiFetch(`/domains/${name}`) as Promise<DomainRaw>
  },
  Elements: {
    All: () => apiFetch('/elements') as Promise<string[]>,
    Specific: (name: string) => apiFetch(`/elements/${name}`) as Promise<ElementRaw>
  },
  Enemies: {
    All: () => apiFetch('/enemies') as Promise<string[]>,
    Specific: (name: string) => apiFetch(`/enemies/${name}`) as Promise<EnemyRaw>
  },
  Materials: {
    All: () => apiFetch('/materials') as Promise<string[]>,
    AllForType: (type: string) => apiFetch(`/materials/${type}`).then(resolverPerMaterialType(type)) as Promise<MaterialRaw[]>,
  },
  Nations: {
    All: () => apiFetch('/nations') as Promise<string[]>,
    Specific: (name: string) => apiFetch(`/nations/${name}`) as Promise<NationRaw>
  },
  Weapons: {
    All: () => apiFetch('/weapons') as Promise<string[]>,
    Specific: (name: string) => apiFetch(`/weapons/${name}`) as Promise<WeaponRaw>
  },
}

type ApiType = typeof Api

export {
  Api,
  ApiType,
}
