import type { Character } from '@/models/CharacterModel'
import type { Element } from '@/models/ElementModel'

const Api = {
  Characters: {
    All: () => fetch('https://api.genshin.dev/characters').then(res => res.json()) as Promise<string[]>,
    Specific: (name: string) => fetch(`https://api.genshin.dev/characters/${name}`).then(res => res.json()) as Promise<Character>
  },
  Elements: {
    All: () => fetch('https://api.genshin.dev/elements').then(res => res.json()) as Promise<string[]>,
    Specific: (name: string) => fetch(`https://api.genshin.dev/elements/${name}`).then(res => res.json()) as Promise<Element>
  }
}

type ApiType = typeof Api

export {
  Api,
  ApiType,
}
