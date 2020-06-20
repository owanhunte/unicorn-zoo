# Unicorn Zoo Web Application

> This Next.js web application, named _Unicorn Zoo_, was developed by me, [Owan Hunte](https://owanhunte.com), as part of my Code Fellows Instructor Technical Qualifying Interview.

## Demo

https://unicorn-zoo.vercel.app (you'll need to login with a Google account)

## The TL;DR

The web app has been built using the following stack (highlighting what I consider worthy of mention here):

- [React](https://reactjs.org) and of course the [Next.js](https://nextjs.org) framework
- [TypeScript](https://www.typescriptlang.org)
- [pwa-auth web component](https://github.com/pwa-builder/pwa-auth)
- [Recoil](https://recoiljs.org) lib from [Facebook](https://opensource.facebook.com)
- [Tailwind CSS](https://tailwindcss.com)
- [React-toastify](https://fkhadra.github.io/react-toastify) lib for an easy-to-drop-in React Toast component
- [MongoDB](https://www.mongodb.com)

## Local Development

**NOTE**: I prefer Yarn over NPM as my package manager of choice so this project uses Yarn.

1. Make sure you have [NodeJS](https://nodejs.org) (>= 12.0.0) and [Yarn](https://yarnpkg.com/en) (>= 1.17.3) installed.
2. Fork and clone this repository to your local environment.
3. Install the dependencies:

   ```
   cd path/to/app
   yarn
   ```

4. Create a file named **.env.local** in the root of the project and add the following local environment variable entries to the file:

   ```
   NEXT_PUBLIC_APP_BUILD_TARGET=local
   NEXT_PUBLIC_GOOGLE_KEY="a-google-key"
   DB_CONN_STR="your-mongodb-connection-string"
   ```

   The `NEXT_PUBLIC_APP_BUILD_TARGET` entry should be set to a value other than production, i.e. _local_ or _development_.

   To keep the authentication side of things agile the web app uses the [pwa-auth](https://github.com/pwa-builder/pwa-auth) web component. Specifically it allows anyone to log in to it using their Google account. The `NEXT_PUBLIC_GOOGLE_KEY` entry therefore needs to be set to a valid Google key. Details on creating a Google key can be found [here](https://github.com/pwa-builder/pwa-auth/blob/master/creating-google-key.md).

   I'm using MongoDB to persist data storage. I recommend using any MongoDB version from 4.0.x up. Set _DB_CONN_STR_ to a valid connection string for your MongoDB instance.

   There are two collections, **locations** and **unicorns** that the application needs to have some initial data in so it can function properly. I've included 2 JSON files in the `db-init/json` folder, which contain a complete initial dataset you can start with.

5. Start the Next.js server in development mode, specifiying the port to run the NodeJS process on. For example, if you want to run the application on port 3002 your command would be:

   ```
   PORT=3002 yarn dev
   ```

**NOTE**: You _MUST_ explicitly pass a port number to Next.js when starting the server in development mode, as shown in the above command. Alternatively you can make the PORT environment variable available to the application any other way you deem fit.

## Credits

- Favicon and site manifest logos by [Gordon Johnson](https://pixabay.com/users/GDJ-1086657/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5184453) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5184453)

## Licence

MIT License

Copyright (c) 2020 [Owan Hunte](https://github.com/owanhunte)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

- **Barn** image by [lumix2004](https://pixabay.com/users/lumix2004-3890388/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1873025) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1873025)

- **West Pasture image** by [Pexels](https://pixabay.com/users/Pexels-2286921/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1850690) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1850690)

- **East Pasture image** by [pasja1000](https://pixabay.com/users/pasja1000-6355831/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5206204) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5206204)

- **On the Trails** image by [pasja1000](https://pixabay.com/users/pasja1000-6355831/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5240018) from [Pixabay](https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=5240018)
