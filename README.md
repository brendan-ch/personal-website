My personal portfolio website, built using [Next.js](https://nextjs.org/).

[Visit the live site](https://bchen.dev)

# Copyright and Licensing

I, Brendan Chen, reserve full copyright for image assets and copy text in all visible aspects of the website.

The rest of the project, including React components and helpers, is licensed under the MIT license.

# Developing Locally

To start the project locally:
```bash
yarn dev
```

This command compiles Markdown content into an output file before starting the dev server. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses automated testing with Jest. To run tests:

```bash
yarn test  # to run tests in watch mode
yarn test:ci  # for running all tests once
```

Other useful commands:
```bash
yarn lint # check code formatting
yarn typecheck # run tsc
```

# Editing Site Content

All site content is generated from the `content` folder, which is an [Obsidian](https://obsidian.md) vault containing collections of Markdown files. To edit site content, simply open up a Markdown file and edit what's inside.

The folder structure is as follows:
- `doc`: miscellaneous documents such as privacy policies, changelogs, and copyright information
- `templates`: contains Obsidian templates for creating new database items

Relevant images go inside the `public` folder.

Keep in mind that content changes will not be reflected when fast reload is running; you must restart the server for changes to take effect.

# Building for Production

To create and run a production build:
```bash
yarn build  # create a new production build
yarn start
```

[See more information on Next.js deployment.](https://nextjs.org/docs/deployment)
