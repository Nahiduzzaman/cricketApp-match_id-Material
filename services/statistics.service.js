(function(angular) {
'use strict';
	
	angular.module('cricketApp')
		.service('StatisticService', constructor);
		    constructor.$inject = ['$filter'];
		    function constructor($filter,$window) {

		    	if(JSON.parse(localStorage.getItem("matchData")) == null){
		    		var matches = [];
				    var match_id = 1;
		    	}else{
		    		var matches = JSON.parse(localStorage.getItem("matchData"));
		    		console.log('matches',matches);
		    		var lastGameData = matches[matches.length-1].gameData;
		    		console.log('lastGameData',lastGameData);
		    		var match_id = lastGameData[lastGameData.length-1].match_id+1;
		    	}

		        var scoreArray = [0,1,2,3,4,6,'W','WD','NB'];
		        var gameData = {
		        	match_id: null,
		            ball: null,
		            over: null,
		            score: null,
		            run_per_ball: null,
		            total_run: null,
		            wicket: null
		        };

		        if(JSON.parse(localStorage.getItem("gameData")) == null){
		            var statistics = [];
		            var number_of_ball = 0;
		            var wicket = 0;
		            var run = 0;
		            var total_run = 0;
		            var score = 0;
		            var over = 0;
		            var comments = '';
		        }
		        else{
		            var statistics = JSON.parse(localStorage.getItem("gameData"));
		            var number_of_ball = statistics[statistics.length-1].ball;
		            var wicket = statistics[statistics.length-1].wicket;
		            var run = statistics[statistics.length-1].run_per_ball;
		            var total_run = statistics[statistics.length-1].total_run;
		            var score = statistics[statistics.length-1].score;
		            var over = statistics[statistics.length-1].over;
		            var comments = statistics[statistics.length-1].comments;
		        }

		        function allcomments(score){
		            switch (score) {
		                case 0:
		                    comments = 'No run! dot ball';
		                    break;
		                case 1:
		                    comments = 'Single on the offside.';
		                    break;
		                case 2:
		                    comments = 'Good running between the wicket! 2 runs.';
		                    break;
		                case 3:
		                    comments = 'They have taken 3 runs! excellent running';
		                    break;
		                case 4:
		                    comments = 'Four! great shot!';
		                    break;
		                case 6:
		                    comments = 'Six! Thats a huge six!';
		                    break;
		                case 'WD':
		                    comments = 'Wide delivery way outside off stamp!';
		                    break;
		                case 'NB':
		                    comments = 'No Ball! extra run added to the scoreboard';
		                    break;
		                case 'W':
		                    comments = 'Out! a wicket fall';
		                    break;
		                default: 
		                    comments = 'Its raining';
		            }
		            return comments;
		        }


		        return {
		        	setMatch_id: function(){
				    	
		            	console.log('match_id',match_id);
		            },

		            newgame: function(){
		            	match_id++;
		            	console.log(matches);
		                var teamData_for_match = JSON.parse(localStorage.getItem("teamData"));
		                var gameData_for_match = JSON.parse(localStorage.getItem("gameData"));
		                var matchData = {
		                	teamData:teamData_for_match,
		                	gameData: gameData_for_match
		                }
		                matches.push(matchData);
		                console.log('matches',matches);
		                return matches;		                
		            },

		            play: function(){
		                number_of_ball++;
		             
		                score = scoreArray[Math.floor(Math.random() * scoreArray.length)];
		                if(number_of_ball == 6){
		                    number_of_ball = 0;
		                    over++;
		                }

		                //console.log('initial','Overs: '+over+'.'+number_of_ball,'Score: '+score);
		                switch (score) {
		                    case 'WD':
		                       run = 1;
		                       number_of_ball = number_of_ball - 1;
		                       comments: allcomments('WD');
		                       break;
		                    case 'NB':
		                       run = 1;
		                       number_of_ball = number_of_ball - 1;
		                       comments: allcomments('NB');
		                       break;
		                    case 'W':
		                       run = 0;
		                       wicket = wicket + 1;
		                       comments: allcomments('W');
		                       break;
		                    default: 
		                       run = score;
		                       comments: allcomments(run);
		                }
		                total_run = total_run + run;

		                //console.log('final','Overs: '+over+'.'+number_of_ball,'Score: '+score, 'RPB: '+run, 'Total: '+total_run,'Wicket:'+wicket, 'Comments:'+comments );
		                //console.log(number_of_ball)
		                gameData = {
		                	match_id: match_id,
		                    ball: number_of_ball<0 ? 5:number_of_ball,
		                    over: number_of_ball<0 ? ((over-1)<1 ? 0:(over-1)):over,
		                    score: score,
		                    run_per_ball: run,
		                    total_run: total_run,
		                    wicket: wicket,
		                    comments: comments
		                }
		                statistics.push(gameData);
		                //console.log('statistics',statistics);
		                return statistics;
		            },

		            get: function(match,ball,over,matchdata,gamedata) {
		                console.log('match',match);
		                console.log('ball',ball);
		                console.log('over',over);
		                console.log('matchdata',matchdata);
		                console.log('gamedata',gamedata);
		                if(gamedata){		                	
			                if(gamedata[0].match_id == match){
			                	var data = gamedata;
			                }
			                else{
			                	var data = []; 
			                	var match_history = matchdata[match-1];
			                	data = match_history.gameData;
			                }		              
		                	console.log('data',data);
		                    var scoresbyball = $filter('filter')(data, {'match_id':match,'ball':ball,'over':over});
		                    console.log('scoresbyballArray',scoresbyball);
		                    //var indexOfScore = data.indexOf(scoresbyball[scoresbyball.length-1]);
		                    scoresbyball.forEach(function(item){
		                        item.indexOfScore = data.indexOf(item);
		                        console.log('item',item);     
		                    })
		                   console.log('scoresbyball',scoresbyball[scoresbyball.length-1]);
		                   return scoresbyball[scoresbyball.length-1];
		                }
		            }
		        } 
		    }//End of constructor

})(window.angular);