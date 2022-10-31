# projet-collectif---back-fraises

# Backend part with Mehmet Gunduz, Julie Baret, Juanita Afonador, Clementine Chasles and Delhia Gbelidji

Transition for the frontend team :

1. Install Nodejs (https://nodejs.org/en/download/)
2. Clone the repo git
3. run "npm install" to install all dependencies
4. Install nodemon, pretty useful if you don't want to relaunch you server, it will refresh it automatically
   npx install nodemon
   npx nodemon server

What we did for the setup (you don't have to do it again):

- Master to main: (short version, else see : https://pythonforundergradengineers.com/how-to-change-a-github-repo-from-master-to-main.html)

Clone the repo
git clone git@github.com:adatechschool/projet-collectif---back-fraises.git
git branch -m master main
git push -u origin main
git symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/main

# change default branch on GitHub

git push origin --delete master

- Next we install: node's modules and dependencies, mongoDB, express, CORS, dotenv...
  Prerequisites:
  Install NPM packages
  npm init -y
  npm install mongodb express cors dotenv
  You'll have the node_modules repo and two files, package-lock.json and package.json.
  Create a .gitignore file because you don't want all the node_modules files in git. This is the .gitignore template we used : https://github.com/github/gitignore/blob/main/Node.gitignore

- Creation of the server : server.js and app.js files
  You can check every GET and POST request with Postman
