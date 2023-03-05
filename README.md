<!-- https://github.com/mrHoft/middle.messenger.praktikum.yandex -->

<img align="right" width="64" height="64" title="Author logo" src="http://daytec.ru/img/Ranjy-96.svg">

## Practicum frontend: Messenger ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/mrHoft/middle.messenger.praktikum.yandex/tests.yml) [![Netlify Status](https://api.netlify.com/api/v1/badges/fdd7d98d-0b8e-4a26-a36c-87dfe5f27e61/deploy-status)](https://pet-chat.netlify.app)

Description: Web chat messenger.

| Command | Description |
| --- | --- |
| `npm run start` | Start local server at 3000 port |
| `npm build`     | Make a build |
| `npm test`      | Run tests |
| `npm lint`      | Linter checks |

Technology stack:
- PostCSS
- TypeScript
- Jest: Tests
- eslint, stylelint: Custom
- Husky: Starts precommit tests
- WebPack
- Docker
- Express: To start server inside Docker container

137 files • 40 folders • 566kb

```markdown
.
├── src
│   ├── index.html          # Starts from it
│   ├── app.ts              # Prepares global methods and router
│   ├── Router              # Resolves url, handles routes
│   │   ├── routes_data.ts  # Foundation of each page
│   ├── templator           # Prepares page content
│   │   ├── pages           # Contain page parts
│   ├── components
│   │   ├── Forms           # User forms
│   │   ├── Chat            # Chat interface components
│   │   ├── Messages        # Message send/show components
│   │   ├── Users           # Search/add users components
│   ├── services
│   │   ├── Component.ts    # Uses by template to include components
│   │   ├── Store           # Application store
│   │   │   ├── connect.ts  # Makes High Order Component
│   │   ├── api             # XMLHttpRequest, WebSocket api
│   │   │   ├── Manager.ts  # Handles api requests
│   ├── utils               # Logic and visualisation utils
├── static                  # Icons and images
```

[Deployed example (Netlify)](https://pet-chat.netlify.app)
•
[Design template (Figma)](https://www.figma.com/file/YpmQ1mBlTXOh3uZrmnVP44/Chat_tempate)
