angular.module('poll1', [])
.controller('PollController', function($scope, $http){
		/*
		this.songs = [
			{title: 'Song 1', artist: 'Artist 1', link: 'http://song1.com', votes: 0},
			{title: 'Song 2', artist: 'Artist 2', link: 'http://song2.com', votes: 0},
			{title: 'Song 3', artist: 'Artist 3', link: 'http://song3.com', votes: 0}
		];
		*/


		$scope.songs = [];




		$http.get('poll/songs')
		.success(function(data, status, headers, config){
				// Do something successful
				$scope.songs = data;
				console.log(data);
			}).error(function(data, status, headers, config){
				// Handle the error
				console.log('$http error');
			});

		// $scope.options = [,1,2,3];

		
		$scope.newSong = {
			title:"",
			artist:"",
			link:"",
			username: "",
			userVote:0,
			totalVotes:0
		};
		
		$scope.votesSubmitted = false;

		
		$scope.addSong = function addSong(){
			if($scope.songs.length<11){
				$http.post('poll/songs', $scope.newSong)
				.success(function(data, status, headers, config){
					// Do something successful
					$scope.songs = data;
					console.log(data);
				}).error(function(data, status, headers, config){
					// Handle the error
					console.log('$http error');
				});
			}
			else{

			}
		};

		$scope.submitVote = function submitVote(){
			$http.post('poll/votes', $scope.songs)
			.success(function(data, status, headers, config){
					// Do something successful
					$scope.songs = data;
					$scope.votesSubmitted = true;
					console.log(data);
				}).error(function(data, status, headers, config){
					// Handle the error
					console.log('$http error');
				});
			};

		/* deprecated
		this.check = function check(option, select){
			for(var i in this.options){
				if(this.options[i] == option){
					this.options.splice(i,1);
					break;
				}
			}
			console.log('removed '+option);
		};
		*/

	});