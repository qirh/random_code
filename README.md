small random projects.

GH pages will attempt to deploy all the folders in this repo. The link would be https://qirh.github.io/random_code/[FOLDER_NAME]. To deploy a static stie, you only need `index.html` at the root of the folder. To deploy a react app, you need to set the `homepage` in `package.json` to the url of the deployed app. And manually set `PUBLIC_URL=/` before starting a local server.