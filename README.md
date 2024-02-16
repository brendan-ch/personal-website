My personal portfolio website, built using [Next.js](https://nextjs.org/).

[Visit the live site](https://bchen.dev)

# Copyright and Licensing

I, Brendan Chen, reserve full copyright for image assets and copy text in all visible aspects of the website.

The rest of the project, including React components and helpers, is licensed under the MIT license.

# Developing Locally

To start the project locally:
```bash
npm run dev
```

This command compiles Markdown content into an output file before starting the dev server. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses automated testing with Jest. To run tests:

```bash
npm run test  # to run tests in watch mode
npm run test:ci  # for running all tests once
```

Other useful commands:
```bash
npm run lint # check code formatting
npm run typecheck # run tsc
```

# Building for Production

To create and run a production build:
```bash
npm run build  # create a new production build
npm run start
```

[See more information on Next.js deployment.](https://nextjs.org/docs/deployment)
