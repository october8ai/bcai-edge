# Black Crow AI Edge SDK

### Build and use the sdk locally

- `cd packages/edge-sdk`
- `npm run clean && npm run build`
- `npm link`

### How to deploy a Cloudflare Worker using the SDK

- Install [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- `wrangler login`
- `wrangler generate <worker-name>`
- `cd <worker-name>`
- `npm link @bcai/edge-sdk`
- Add `@bcai/edge-sdk : ^0.1.0` to `package.json` dependencies
- Use the SDK in your worker code (see [cf-example-proxy-worker](https://github.com/october8ai/bcai-edge/blob/main/cf-example-proxy-worker/src/index.ts) for an example)
- `wrangler deploy`

### How to deploy the example proxy worker
- `cd cf-example-proxy-worker` * or in any development project
- `npm link @bcai/edge-sdk`
- `wrangler deploy`
