(function(angular) {
'use strict';
	
	angular.module('cricketApp')
		.directive('scoreBoard', factory);
		    function factory() {
		    	return {
				    templateUrl: 'views/templates/scoreboard.template.html'
				}
		    }

})(window.angular);