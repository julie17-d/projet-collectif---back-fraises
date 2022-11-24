# projet-collectif---back-fraises


## Anciens Meubles Pour une Nouvelle Vie

![Screenshot of homepage](https://user-images.githubusercontent.com/97305602/203798213-7ef54b07-d23b-44db-82f6-92444039ee24.png)

### Authentification (with admin page only for admin account where you can handle order status)

![Screenshot of admin page](https://user-images.githubusercontent.com/97305602/203798576-f7b37422-dd57-4804-9f20-1142b4feb83e.png)

### Details of every furniture

![Screenshot of furniture's details pop-up](https://user-images.githubusercontent.com/97305602/203798857-ee9a6ec3-2c76-4cb9-9ec7-4fa2b4a5eed4.png)

### Filter furnitures by color, materials, or price. You can even search for a specific furniture with a search field!

![Screenshot of filtered furnitures by yellow](https://user-images.githubusercontent.com/97305602/203799368-0fe4e678-9203-49f5-8e16-aa53353f6cf9.png)

### Add new furnitures to sell

![Screenshot of new furniture form](https://user-images.githubusercontent.com/97305602/203799508-7a58c9a3-27be-48f3-a659-8570b9230b21.png)

---

# Transition for the frontend team :

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
