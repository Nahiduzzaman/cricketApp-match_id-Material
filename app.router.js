(function(angular) {
    angular.module('cricketApp')
        .config(addRoutes);
            addRoutes.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
                function addRoutes($stateProvider, $locationProvider, $urlRouterProvider) {
                    $urlRouterProvider.otherwise('/start');
                    $stateProvider
                    .state('start', {
                        url: '/start',
                        templateUrl: 'views/start.view.html',
                        controller: 'startController',
                        controllerAs: 'vm'
                    })
                    .state('play-history', {
                        url: '/play/:match/:over/:ball',
                        templateUrl: 'views/play.view.html',
                        controller: 'playController',
                        controllerAs: 'vm'
                    });
                    $locationProvider.hashPrefix('');
                }
})(window.angular);