This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Pre Requisites

1. Before any setup, make sure yarn is installed. If yarn is not installed please install form [here](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

2. Copy the env variables shared in the email to the `.env` file in the root of the project, those are the api keys and are necessary to make api calls to the data sources. An example of the `.env` file is in the project `.env.example`


App is [deployed on vercel](https://newser-pv6t3kgg3-yasserdarwinhomes-projects.vercel.app/)

Some data sources don't work outside localhost hence won't fetch data on deployed URLs but can be seen on local instance via the dev server or docker.


## Dev Server Setup

1. Install Dependancies

```bash
yarn
```

2. Run the development server:

```bash
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Running with docker

1. Make sure docker daemon is running

2. Docker command is encapsulated to run with yarn

```bash
yarn run docker:run
```

Docker is also configured to run the production server on localhost:3000
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Features

The project is built with the following tech

1. [Tailwind](https://tailwindcss.com/)
2. [react-query](https://tanstack.com/query/latest/docs/framework/react/overview)
3. [Shadcn](https://ui.shadcn.com/)
4. [react-hook-forms](https://react-hook-form.com/)
5. [NextJS](https://nextjs.org/)

