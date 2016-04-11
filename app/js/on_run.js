function OnRun($rootScope, $state, AppSettings, LoginService) {
    'ngInject';

    // change page title based on state
    $rootScope.$on('$stateChangeSuccess', (event, toState) => {
        $rootScope.pageTitle = '';

        if ( toState.title ) {
            $rootScope.pageTitle += toState.title;
            $rootScope.pageTitle += ' \u2014 ';
        }

        $rootScope.pageTitle += AppSettings.appTitle;
    });

    // prevent restricted states from being triggered while not signed in
    $rootScope.$on('$stateChangeStart', (event, toState) => {
        if(!LoginService.tokenData()) {
            $state.go('Login', null, { notify: false });
        }
    });
}

export default OnRun;
