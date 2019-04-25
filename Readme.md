Worked on this during my Netflix and Skill (which means learning through video) as a famous person on Github would call it. Also, I was currently going through Ryan's Florence React Training and could not keep up with a few patterns so just came back to the fundamentals for a refresher. 

# Establishing the fundamentals of React

Webpack is a module bundler. It takes all the modules and intelligently bundles
them so we can reference them from a single file. Tyler Mcginnis created the webpack.config.js file from scratch which was pretty cool to learn. 

The same intuition you have about functions is the same you need to have about
Components.

# 'this' keyword

It allows us to decide which object should be focal
when a function or a method is called. Where is this function invoked? We won't know that the this keyword is
until the function is invoked. In the example below, we won't know what the value of name is until
the function is invoked with a paramter.

```javascript
var sayName = name => {
	console.log('Hello', +name);
};
```

1. Implicit Binding

```javascript
var me = {
	name: 'Gideon',
	age: '25',
	sayName: function() {
		console.log(this.name);
	}
};

//What is the this keyword here

me.sayName(); //this===me
```

2. Explicit Binding

```javascript
var sayName = function() {
	console.log('My Name is' + this.name);
};

var stacey = {
	name: 'Blah',
	age: 34
};

sayName.call(stacey);
```

The this keyword in sayName is going to reference the stacey object.
Bind gives you a new function instead of called sayName with a context. It will give me a new function with a this context which can be invoked later.

3. new Binding

```javascript
var Animal = function(color, name) {
	//this={}
	this.color = color;
	this.name = name;
};

var zebra = new Animal('Black and White', 'Zorro');
```
componentDidMount is going to be invoked when the components mounts into the screen.

# Breaking down the Logic for the Battle component

## Critical Thinking.

1. We need two player input fields which upon submitted will render the User Profiles
   The two players can be treated as components, each with a form.

```javascript
<input
	id="username"
	placeholder="github username"
	type="text"
	autoComplete="off"
	value={this.state.username}
	onChange={this.handleChange}
/>
```

2. Let's think about state. The username and the avatar change when the form is submitted so these could be our states. As we have two players, we can have player1, player2, avatar1, avatar2 as the states. I love how Tyler makes use of the

3. I love how fast React is. For Example:

The user enter the username in the input field, react fetches the image and updates the image state. If the state exists, the player's avatar and name are renndered dynamically. This steps happen way too quickly.

# React Router Passes three props to a component

1. history
2. location
3. match

# Function Composition

Tyler creates functions to fetch each piece of data for our final score, making asycnhronous request through axios.
The formula for the final score is **(followers\*3+totalStars)**.

To fetch the followers, we need to fetch the profile first and to calculate the total stars, we need all the repos and the individual star count.

Here are bits and pieces of the code that do that.

```javascript
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
```

Here is a neat little trick I picked up. You only expose the following function to the Component Results and let functions do all the heavy lifting. This is a great use of promises.

```javascript
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

battle: function(players) {
		return axios
			.all(players.map(getUserData))
			.then(sortPlayers)
			.catch(handleError);
	},


```


# Deploying to Firebase

 ```
 npm install --save-dev firebase-tools


 //In Package.json

 "build": "SET NODE_ENV='production'&& webpack",
 "firebase-init":"firebase login && firebase init",
 "deploy":"npm run build && firebase deploy"

 npm run firebase-init
 Authenticate Firebase

 Choose Hosting--->Choose the Project from the list---->npm run deploy

 ```
