(function(angular) {
'use strict';
	
	angular.module('cricketApp')
		.service('TeamService', constructor);
		    function constructor() {
		    	var teamList = ['South Africa',	'Australia', 'New Zealand', 'India', 'England',	'Sri Lanka',
		    					'Bangladesh', 'Pakistan', 'West Indies', 'Afghanistan' , 'Zimbabwe', 'Ireland']
				this.getTeams = function(text){
			        return teamList
			    };
		    }//End of constructor

})(window.angular);