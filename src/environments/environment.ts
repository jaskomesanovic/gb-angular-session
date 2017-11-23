// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyD4Ut04T4P_BPricfhXFwX18XBrXv2hxug",
    authDomain: "gb-angular-workshop.firebaseapp.com",
    databaseURL: "https://gb-angular-workshop.firebaseio.com",
    projectId: "gb-angular-workshop",
    storageBucket: "gb-angular-workshop.appspot.com",
    messagingSenderId: "405317161945"
  }
};
