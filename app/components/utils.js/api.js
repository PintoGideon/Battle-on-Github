var axios = require('axios');

var id = '9e1d35b6a0674ad2d4f8';
var secret = 'f4cef08979fbc07ad49289b139678a53c5f54b3f';

var params = '?client_id=' + id + '&client_secret=' + secret;

function getProfile(username) {
	return axios
		.get('https://api.github.com/users/' + username + params)
		.then(user => {
			return user.data;
		});
}

function getRepos(username) {
	return axios.get(
		'https://api.github.com/users/' +
			username +
			'/repos' +
			params +
			'&per_page=100'
	);
}

function getStarCount(repos) {
	return repos.data.reduce((count, repo) => {
		return count + repo.stargazers_count;
	}, 0);
}

function calculateScore(profile, repos) {
	var followers = profile.followers;

	var totalStars = getStarCount(repos);
	return followers * 3 + totalStars;
}

function handleError(error) {
	console.warn(error);
	return null;
}

function getUserData(player) {
	return axios.all([getProfile(player), getRepos(player)]).then(data => {
		var profile = data[0];
		var repos = data[1];
		return {
			profile: profile,
			score: calculateScore(profile, repos)
		};
	});
}

function sortPlayers(players) {
	return players.sort((a, b) => {
		return b.score - a.score;
	});
}

module.exports = {
	battle: function(players) {
		return axios
			.all(players.map(getUserData))
			.then(sortPlayers)
			.catch(handleError);
	},

	fetchPopularRepos: function(language) {
		//Formatting the URL

		var encodedURI = window.encodeURI(
			'https://api.github.com/search/repositories?q=stars:>1+language:' +
				language +
				'&sort=stars&order=desc&type=Repositories'
		);

		return axios.get(encodedURI).then(response => {
			return response.data.items;
		});
	}
};
