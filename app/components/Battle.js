import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerDisplay from './PlayerDisplay';

class PlayerInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: ''
		};
	}

	handleSubmit(event) {
		console.log('Form submitted');
		event.preventDefault();

		this.props.onSubmit(this.props.id, this.state.username);
	}

	handleChange(event) {
		var value = event.target.value;

		this.setState(function() {
			return {
				username: value
			};
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit.bind(this)} className="column">
				<label className="header" htmlFor="username">
					{this.props.label}
				</label>
				<input
					id="username"
					placeholder="github username"
					type="text"
					autoComplete="off"
					value={this.state.username}
					onChange={this.handleChange.bind(this)}
				/>
				<button
					className="button"
					type="submit"
					disabled={!this.state.username}
				>
					Submit
				</button>
			</form>
		);
	}
}

PlayerInput.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
};

class Battle extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			playerOneName: '',
			playerTwoName: '',
			playerOneImage: null,
			playerTwoImage: null
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	handleSubmit(id, username) {
		console.log('On Submit called' + id + username);

		this.setState(() => {
			var newState = {};
			newState[id + 'Name'] = username;
			newState[id + 'Image'] =
				'https://github.com/' + username + '.png?size=200';
			return newState;
		});
	}

	handleReset(id) {
		this.setState(function() {
			var newState = {};
			newState[id + 'Name'] = '';
			newState[id + 'Image'] = null;
			return newState;
		});
	}

	render() {
		var match = this.props.match;

		var {
			playerOneName,
			playerTwoName,
			playerOneImage,
			playerTwoImage
		} = this.state;

		return (
			<div>
				<div className="row">
					{!playerOneName && (
						<PlayerInput
							id="playerOne"
							label="Player One"
							onSubmit={this.handleSubmit}
						/>
					)}

					{playerOneImage !== null && (
						<PlayerDisplay username={playerOneName} avatar={playerOneImage}>
							<button
								className="reset"
								onClick={this.handleReset.bind(this, 'playerOne')}
							>
								Reset
							</button>
						</PlayerDisplay>
					)}

					{!playerTwoName && (
						<PlayerInput
							id="playerTwo"
							label="Player Two"
							onSubmit={this.handleSubmit}
						/>
					)}

					{playerTwoImage !== null && (
						<PlayerDisplay avatar={playerTwoImage} username={playerTwoName}>
							<button
								className="reset"
								onClick={this.handleReset.bind(this, 'playerTwo')}
							>
								Reset
							</button>
						</PlayerDisplay>
					)}
				</div>

				{playerOneImage && playerTwoImage && (
					<Link
						className="button"
						to={{
							pathname: match.url + '/results',
							search:
								`?playerOneName=` +
								playerOneName +
								'&playerTwoName=' +
								playerTwoName
						}}
					>
						Battle
					</Link>
				)}
			</div>
		);
	}
}

export default Battle;
