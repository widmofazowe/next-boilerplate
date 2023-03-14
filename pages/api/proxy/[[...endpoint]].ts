import debugFactory from 'debug';
import httpProxyMiddleware from 'next-http-proxy-middleware';

import appConfig from '@config';

const debug = debugFactory('typer:api:proxy');

export default function handler(req, res) {
  const { endpoint } = req.query;
  debug(`Passing request to ${appConfig.api.url}, path: /${endpoint.join('/')}`);
  return httpProxyMiddleware(req, res, {
    // You can use the `http-proxy` option
    target: appConfig.api.url,
    // In addition, you can use the `pathRewrite` option provided by `next-http-proxy-middleware`
    pathRewrite: [
      {
        patternStr: '^/api/proxy',
        replaceStr: '/',
      },
    ],
  });
}

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};
