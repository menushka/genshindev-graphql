# GenshinDev GraphQL

GenshinDev GraphQL is a GraphQL app that serves the data from [genshin.dev](https://genshin.dev/) in a convenient GraphQL interface. This project aims to provide an easy-to-use, interactive and flexible interface to retrieve Genshin Impact game data.

[![Deploy](https://github.com/menushka/genshindev-graphql/actions/workflows/deploy.yml/badge.svg)](https://github.com/menushka/genshindev-graphql/actions/workflows/deploy.yml)

## Try It Out Live

[https://genshindev-graphql.menushka.ca/](https://genshindev-graphql.menushka.ca/)

## Run It Locally

```bash
pnpm install
pnpm dev
```

## Todo List
- [ ] Improve data typing - some endpoints still return raw values instead of hydrated data
- [ ] Add support for fetching images urls

## Built With
- Amazon Web Services (AWS) (Lambda) - [https://aws.amazon.com/](https://aws.amazon.com/)
- Serverless- [https://www.serverless.com/](https://www.serverless.com/)
- Serverless-Offline - [https://www.serverless.com/plugins/serverless-offline](https://www.serverless.com/plugins/serverless-offline)
- Apollo Server - [https://www.apollographql.com/](https://www.apollographql.com/)
- Webpack - [https://webpack.js.org/](https://webpack.js.org/)
- genshin.dev - [https://genshin.dev/](https://genshin.dev/)

## License

GenshinDev GraphQL is released under the [MIT License](LICENSE).
