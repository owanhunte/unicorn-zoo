# Unicorn Zoo Web Application Prototype

> This web application implements a Unicorn Zoo Code Project for my Code Fellows Instructor Technical Qualifying Interview.

## Local Development

**NOTE**: I prefer Yarn over NPM as my package manager of choice so this project uses Yarn.

1. Make sure you have [NodeJS](https://nodejs.org) (>= 12.0.0) and [Yarn](https://yarnpkg.com/en) (>= 1.17.3) installed.
2. Fork and clone this repository to your local environment.
3. Install the dependencies:

   ```
   cd path/to/app
   yarn
   ```

4. Start the Next.js server in development mode, specifiying the port to run the NodeJS process on. For example, if you want to run the application on port 3002 your command would be:

   ```
   PORT=3002 yarn dev
   ```

**NOTE**: You _MUST_ explicitly pass a port number to Next.js when starting the server in development mode, as shown in the above command. Alternatively you can make the PORT environment variable available to the application any other way you deem fit.
