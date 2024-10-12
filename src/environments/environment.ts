// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiCrearCategoryUrl: 'http://localhost:9090/stock/category/',
  apiCrearBrandUrl: 'http://localhost:9090/stock/brand/',
  lineColorSuccess: '#00B998',
  textColorSucess: '#00B998',
  srcImageSucess: 'assets/images/Icon-success.png',
  lineColorWarnm: '#FF9500',
  textColorWarnm: '#FF9500',
  srcImageWarnm: 'assets/images/Icon-warn.png',
  lineColorError: '#D51A52',
  textColorError: '#D51A52',
  srcImageError: 'assets/images/Icon-error.png',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
