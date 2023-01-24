## Block Explorer

The app uses our custom Node.js middleware which acts as reverse proxy and support list of multiple nodes.

### Setup

You need to have Docker and Docker Compose set and running.

1. Create `.env` file in a root of a project.

Example:
```
MIDDLEWARE_URL=http://localhost:4000 # middleware URL, by default its http://localhost:4000/rpc
NODE_URLS=http://3.138.177.248:7777/rpc # it can be comma separated list of RPCs
SIDECAR_REST_URL=http://localhost:18888 # sidecar REST url
SIDECAR_EVENTSTREAM_URL=http://localhost:19999 # sidecar event stream url
NETWORK_NAME=integration-test # network name, you can check it in chainspec
PEERS_UPDATE_INTERVAL=60 # interval time for update peer list
```

* when running locally inside a Docker and pointing to NCTL, 127.0.0.1 equals to `host.docker.internal` so this should be used as `localhost` in `.env`

And if desired, change the application logo / name / favicon (this is experimental feature) by adding:

```
ORG_LOGO_URL=https://example.com/your-org-logo
ORG_NAME=Jenkins
ORG_FAVICON_URL=https://example.com/your-favicon
```

Other instances of the word `Casper` appearing on the page can be easily changed through the available [translation feature](https://github.com/casper-network/casper-blockexplorer/blob/dev/frontend/public/locales/en/translation.json). Specifically, you will need to change the reference to [`Casper Node Version`](https://github.com/casper-network/casper-blockexplorer/blob/dev/frontend/public/locales/en/translation.json#L17) and [`Discover the Casper Blockchain`](https://github.com/casper-network/casper-blockexplorer/blob/dev/frontend/public/locales/en/translation.json#L29).

2. Run `make prod-build` or `make dev-build` if you are using the app for development purposes. (HMR and debug modes will be enabled)
3. Run `make prod-start` if you are using the app for production (optimized builds) or `make dev-start` for development. 
4. The frontend will be running at port `3000` and middleware at port `4000`.

### Testing
To run Cypress tests on the frontend:
```
  > cd frontend
  > npm run cy:run
```

To open Cypress
```
  > cd frontend
  > npm run cy:open
```

To run Cypress tests in Docker
```
  > make cy-build
  > make cy-test
```
