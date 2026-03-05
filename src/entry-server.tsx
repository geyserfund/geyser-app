import './config/i18next'

import { ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { ColorModeScript } from '@chakra-ui/react'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'

import { createServerApolloClient } from './config/apollo-client'
import GlobalStyles from './config/GlobalStyles.tsx'
import { createAppRoutes } from './config/routes/index.ts'

export type ServerRenderOptions = {
  request: Request
  headers?: Record<string, string>
  fetchImplementation?: typeof fetch
}

export type ServerRenderResult =
  | {
      kind: 'redirect'
      status: number
      location: string
    }
  | {
      kind: 'render'
      status: number
      html: string
      headHtml: string
      apolloState: NormalizedCacheObject
    }

export const renderServerApp = async ({
  request,
  headers,
  fetchImplementation,
}: ServerRenderOptions): Promise<ServerRenderResult> => {
  const routes = createAppRoutes()
  const handler = createStaticHandler(routes)

  const context = await handler.query(request)

  if (context instanceof Response) {
    return {
      kind: 'redirect',
      status: context.status,
      location: context.headers.get('Location') || '/',
    }
  }

  const apolloClient = createServerApolloClient({
    headers,
    fetchImplementation,
  })

  const router = createStaticRouter(handler.dataRoutes, context)

  const app = (
    <>
      <ColorModeScript initialColorMode="system" type="localStorage" />
      <GlobalStyles />
      <ApolloProvider client={apolloClient}>
        <StaticRouterProvider router={router} context={context} hydrate={false} />
      </ApolloProvider>
    </>
  )

  await getDataFromTree(app)
  const html = renderToString(app)
  const helmet = Helmet.renderStatic()
  const headHtml = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ]
    .filter(Boolean)
    .join('\n')

  return {
    kind: 'render',
    status: context.statusCode || 200,
    html,
    headHtml,
    apolloState: apolloClient.extract(),
  }
}
