import angular from 'angular';
import jQuery  from 'jquery';
// import toastr  from 'toastr';

// angular modules
import constants from './constants';
import onConfig  from './on_config';
import onRun     from './on_run';
import ngResource from 'angular-resource';
import 'angular-ui-router';
import './templates';
import './filters';
import './controllers';
import './services';
import './directives';

// create and bootstrap application
const requires = [
  'ngResource',
  'ui.router',
  'templates',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.directives'
];

// mount on window for testing
window.app = angular.module('app', requires);
window.jQuery = jQuery;

require('bootstrap');
// window.toastr = toastr;

angular.module('app').constant('AppSettings', constants);

angular.module('app').config(onConfig);

angular.module('app').run(onRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
