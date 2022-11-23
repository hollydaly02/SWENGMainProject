This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## About this Next.js Project
This is the template for software engineering group 15 project. It consists of a home page with a welcome message and a dropdown button.

## Getting Started
You may first need to install yarn on your machine if you don't have it already. Use homebrew to install yarn if that is the case.
(https://formulae.brew.sh/formula/yarn#default).

This project is run with yarn, not npm.

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Error Fixes
If you try to run the dashboard and receive this error: 
warn  - Attempted to load @next/swc-darwin-x64, but it was not installed
error - Failed to load SWC binary for darwin/x64, see more info here: (https://nextjs.org/docs/messages/failed-loading-swc)
error Command failed with exit code 1.

You will need to use the command 'yarn install --force' from this page: (https://nextjs.org/docs/messages/failed-loading-swc).
The application should compile successfully after this, and you will be able to view the dashboard by going to the link given by the compiler:
$ next dev
ready - started server on 0.0.0.0:3000, url: http://localhost:3000

Go to this url at localhost:3000 to view the application at port 3000.

## Exiting the Application
When or if you close the tab with the dashboard in your web browser, you then need to exit the application from within where you ran the project, e.g. Visual Studio Code.

To check if the program is still running on port 3000, enter 'lsof -i :3000' into the terminal/command line. 
If the program is still running on the port, you will see something like this:
lsof -i :3000
COMMAND   PID          USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
Google    508 jamesoconnell   42u  IPv6 0x4fa51da45928f843      0t0  TCP localhost:52999->localhost:hbci (CLOSE_WAIT)
Google    508 jamesoconnell   43u  IPv6 0x4fa51da45927e623      0t0  TCP localhost:53000->localhost:hbci (CLOSE_WAIT)
Google    508 jamesoconnell   47u  IPv6 0x4fa51da45927fac3      0t0  TCP localhost:53001->localhost:hbci (CLOSE_WAIT)
Google    508 jamesoconnell   48u  IPv6 0x4fa51da45927d863      0t0  TCP localhost:53002->localhost:hbci (CLOSE_WAIT)
Google    508 jamesoconnell   49u  IPv6 0x4fa51da45927ed03      0t0  TCP localhost:53003->localhost:hbci (CLOSE_WAIT)
To stop the program running, you need to use the 'kill' command, and use it as 'kill -9 PID'. 
So, in the example above, I would use 'kill -9 508', and the program would stop running.
To check that the program is not running, or if you are unsure, you can use 'lsof -i :3000', and if you can see 
lsof -i :3000 alone in the output, it means the program is not running on port 3000.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
