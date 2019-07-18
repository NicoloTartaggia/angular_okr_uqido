// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  config: {
    apiKey: 'AIzaSyC-4wigg58el_UqZ3kJ_YGZmLHHsxcD0JI',
    authDomain: 'okr-platform.firebaseapp.com',
    // databaseURL: 'https://okr-platform.firebaseio.com',
    databaseURL: 'http://localhost:5001',
    projectId: 'okr-platform',
    storageBucket: 'okr-platform.appspot.com',
    messagingSenderId: '331935303484',
    appId: '1:331935303484:web:7e38cd831da5d3cd'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
