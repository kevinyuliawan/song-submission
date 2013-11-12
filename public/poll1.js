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

		$(".alert").alert(); // for bootstrap




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
		$scope.submitDisabled = false;

		
		$scope.addSong = function addSong(){
			if($scope.newSong.title == "" || $scope.newSong.artist == "" || $scope.newSong.link == ""){
				$scope.blankError = true;
				$linkError = false;
			}
			else if($scope.newSong.link.indexOf('http://') == -1){
				$scope.blankError = false;
				$scope.linkError = true;
			}
			else{
				$scope.blankError = $scope.linkError = false;
				$scope.submitDisabled = true;
				$('#myModal').modal('hide');
				$http.post('poll/songs', $scope.newSong)
				.success(function(data, status, headers, config){
					// Do something successful
					$scope.songs = data;
					console.log(data);
				}).error(function(data, status, headers, config){
					// Handle the error
					console.log('$http error');
				});
			};
		};

		$scope.submitVote = function submitVote(){
			if(checkVotes()){
				$scope.voteError = false;
				
				$http.post('poll/votes', $scope.songs)
				.success(function(data, status, headers, config){
					// Do something successful
					$scope.songs = data;
					$scope.votesSubmitted = true;
					document.getElementById('voteAlertSuccess').scrollIntoView();
					console.log(data);
				}).error(function(data, status, headers, config){
					// Handle the error
					console.log('$http error');
				});
			}
			else{
				$scope.voteError = true;
			}
		};

		function checkVotes(){
			var total, vote1, vote2, vote3, other;
			total = vote1 = vote2 = vote3 = other = 0;
			var songs = $scope.songs;
			for(var i=0;i<songs.length;i++){
				switch(songs[i].userVote){
					case 0:
					total++;
					break;
					case 1:
					vote1++;
					break;
					case 2:
					vote2++;
					break;
					case 3:
					vote3++;
					break;
					default:
					other++;
					break;
				}
			};
			if(total != 8 || vote1 > 1 || vote2 > 1 || vote3 > 1 || other > 0){
				return false;
			}else { return true; }
		}

	});