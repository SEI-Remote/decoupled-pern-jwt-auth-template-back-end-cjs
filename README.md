# Decoupled PERN Stack with JWT Auth Template - Back End

This is the back end of a decoupled PERN Stack app that includes JWT Authentication.

When combined with the front end found [here](https://github.com/SEI-Remote/decoupled-pern-jwt-auth-template-front-end-ts), you'll have all you need to build a full stack PERN app!

Use this to go build things! 🚀

## To Use This Template

**Replace `<name-of-your-app-here>` (including the `<` and `>`) in the commands below with the name of your app!**

```bash
git clone https://github.com/SEI-Remote/decoupled-pern-jwt-auth-template-back-end-cjs <name-of-your-app-here>-back-end
cd <name-of-your-app-here>-back-end
code .
```

With the project open in VS Code, open a terminal and run:

```bash
rm -rf .git
```

Here's what your command line output should like after this step (note that the indicator that we are in a git repository is gone!)

<img src="https://i.imgur.com/L47kNOZ.png" alt="The command line before and after running the rm -rf .git command. Before git:(main) is visible indiating that the directory contains a git repository, after the command it is not.">

Re-initialize a git repository:

```bash
git init
```

Create a repo for this project on GitHub and add that remote to your project with (replacing your-repo-URL-here with the URL of the repo you just created):

```bash
git remote add origin your-repo-URL-here
```

Run `npm i` to fetch the template's dependencies:

```bash
npm i
```

touch a `.env` file:

```bash
touch .env
```

Fill it with the following:

```
DATABASE_URL=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
CLOUDINARY_URL=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Replace the `DATABASE_URL`, `SECRET`, and `CLOUDINARY_URL` with values that you provide.

> 🚨 Place secrets in this `.env` file. The contents of this file WILL NOT be exposed to site visitors.

Make your first migration to create the built-in User and Profile tables in your database:

```bash
sequelize-cli db:migrate
```

Confirm the app starts up with:

```bash
nodemon
```

Delete this `README.md`, then make an initial commit:

```bash
git add .
git commit -m "initial commit"
git push origin main
```

Launch the app with:

```bash
nodemon
```

You're done!
