My personal portfolio website, built using [Next.js](https://nextjs.org/).

[Visit the live site](https://bchen.dev)

# Copyright and Licensing

I, Brendan Chen, reserve full copyright for content under the `/content` and `/public` folders of this repository. This includes, but is not limited to, Markdown (.md) pages, images, and PDF files (e.g. my resume).

The rest of the project is licensed under the MIT license.

Visit the open source licenses page for information about projects used on this website.

# Developing Locally

To start the project locally:
```bash
yarn dev
```

This command compiles Markdown content into an output file, and copies images to the `public/` folder before starting the dev server. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
- `static`: all images go inside this folder
- `templates`: contains Obsidian templates for creating new database items
- `work`: contains projects that are displayed under the "My Work" page

Keep in mind that content changes will not be reflected when fast reload is running; you must restart the server for changes to take effect.

# Building for Production

To create and run a production build:
```bash
yarn build  # create a new production build
yarn start
```

[See more information on Next.js deployment.](https://nextjs.org/docs/deployment)
