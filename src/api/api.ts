import type { CharacterRaw } from '../models/CharacterModel'
import type { ElementRaw } from '../models/ElementModel'
import type { WeaponRaw } from '../models/WeaponModel'
import type { ArtifactRaw } from '../models/ArtifactModel'

const base = 'https://api.genshin.dev'
const apiFetch = (url: string) => fetch(`${base}${url}`).then(res => res.json())

const Api = {
  Characters: {
    All: () => apiFetch('/characters') as Promise<string[]>,
    Specific: (name: string) => apiFetch(`/characters/${name}`) as Promise<CharacterRaw>
  },
  Elements: {
    All: () => apiFetch('/elements') as Promise<string[]>,
    Specific: (name: string) => apiFetch(`/elements/${name}`) as Promise<ElementRaw>
  },
  Weapons: {
    All: () => apiFetch('/weapons') as Promise<string[]>,
    Specific: (name: string) => apiFetch(`/weapons/${name}`) as Promise<WeaponRaw>
  },
  Artifacts: {
    All: () => apiFetch('/artifacts') as Promise<string[]>,
    Specific: (name: string) => apiFetch(`/artifacts/${name}`) as Promise<ArtifactRaw>
  },
}

type ApiType = typeof Api

export {
  Api,
  ApiType,
}
