import type { CharacterRaw } from '../models/CharacterModel'
import type { ElementRaw } from '../models/ElementModel'
import type { WeaponRaw } from '../models/WeaponModel'
import type { ArtifactRaw } from '../models/ArtifactModel'
import type { NationRaw } from '../models/NationModel'
import type { DomainRaw } from '../models/DomainModel'
import { BossRaw } from '../models/BossModel'

const base = 'https://api.genshin.dev'
const apiFetch = (url: string) => fetch(`${base}${url}`).then(res => res.json())

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
