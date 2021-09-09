# Create Accessible App (CAA)

## Getting Started
```sh
npx create-accessible-app new-app
cd new-app
npm run start
```
Finally, you can see your accessible app!

## Testing
test for cli
```sh
npm run start '<directory-name>'
```

test for created app by CAA in development mode
```sh
npm run dev
```

test for created app by CAA in production mode
```sh
npm run build
```

## Packages
### cally-builder
Builds a new app and install dependencies in it. <br>
Supports HMR(Hot Module Replacement), You can test your app immediately <br>
When you run a command in the app, use scripts of cally-builder 

### cally-auditor
Audits accessibility score using [dequelabs/axe-core](https://github.com/dequelabs/axe-core) <br>
Scoring rule refers to [GoogleChrome/lighthouse](https://github.com/GoogleChrome/lighthouse) <br>
Provides webpackHotDevClient to show score overlay

## Contributing

### Commit style
use Conventional Commit

### Versioning
use Semver