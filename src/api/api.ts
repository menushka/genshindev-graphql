import type { CharacterRaw } from '../models/CharacterModel'
import type { ElementRaw } from '../models/ElementModel'

const Api = {
  Characters: {
    All: () => fetch('https://api.genshin.dev/characters').then(res => res.json()) as Promise<string[]>,
    Specific: (name: string) => fetch(`https://api.genshin.dev/characters/${name}`).then(res => res.json()) as Promise<CharacterRaw>
  },
  Elements: {
    All: () => fetch('https://api.genshin.dev/elements').then(res => res.json()) as Promise<string[]>,
    Specific: (name: string) => fetch(`https://api.genshin.dev/elements/${name}`).then(res => res.json()) as Promise<ElementRaw>
  }
}

type ApiType = typeof Api

export {
  Api,
  ApiType,
}
