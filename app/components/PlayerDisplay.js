import React from 'react';
import PropTypes from 'prop-types';

function PlayerDisplay(props) {
	return (
		<div>
			<div className="column">
				<img
					className="avatar"
					src={props.avatar}
					alt={'Avatar for ' + props.username}
				/>
				<h2 className="username">@{props.username}</h2>
			</div>
			{props.children}
		</div>
	);
}

PlayerDisplay.propTypes = {
	avatar: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired
};

export default PlayerDisplay;
