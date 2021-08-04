## Getting Started

### Requirements

- Mac OS X, Windows, or Linux
- [Yarn](https://yarnpkg.com/) package + [Node.js](https://nodejs.org/) v8.16.2 or
  newer
- Text editor or IDE pre-configured with React/JSX/Flow/ESlint
  ([learn more](./how-to-configure-text-editors.md))

### Directory Layout

Before you start, take a moment to see how the project structure looks like:

```
.
├── /public/                    # Static files which are copied into the /build/public folder
├── /src/                       # The source code of the application
│   ├── /components/            # React components
│   ├── /routes/                # Page/screen components along with the routing information
│   ├── /helpers/               # Common helpers for client side code
│   ├── /server/                # server side code
│       ├──/api/                # all the rest apis
│       ├──/config/             # server related config
│       ├──/passport.js/        # authentication related passport script
│       ├──/mongoose.js/        # mongodb connectivity script
│   ├── /client.js              # Client-side startup script - from starter kit with modifications
│   ├── /server.js              # Server-side startup script - from starter kit with modifications
│   └── ...                     # Other core framework modules
├── /tools/                     # this is from starter kit
├── Dockerfile                  # Commands for building a Docker image for production
├── package.json                # The list of 3rd party libraries and utilities
└── yarn.lock                   # Fixed versions of all the dependencies
```

### Quick Start

#### 1. Get the latest version

You can start by cloning the latest version of React Starter Kit (RSK) on your
local machine by running:

```shell
$ git clone https://github.com/harikrishna76/twitter-top-links/ twitter-top-links
$ cd twitter-top-links
```

#### 2. Run `yarn install`

This will install both run-time project dependencies and developer tools listed
in [package.json](../package.json) file.

#### 3. Run `yarn start`

This command will build the app from the source files (`/src`) into the output
`/build` folder. As soon as the initial build completes, it will start the
Node.js server (`node build/server.js`)

> [http://localhost:3000/](http://localhost:3000/) — Node.js server
