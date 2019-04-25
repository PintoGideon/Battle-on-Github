import React from 'react';
import PropTypes from 'prop-types';
import api from './utils.js/api';
import Loading from './Loading';

const RepoGrid = props => {
	return (
		<ul className="popular-list">
			{props.repos.map((repo, index) => {
				return (
					<li key={repo.name} className="popular-item">
						<div className="popular-rank">#{index + 1}</div>

						<ul className="space-list-items">
							<li>
								<img
									src={repo.owner.avatar_url}
									alt={'Avatar for ' + repo.owner.login}
								/>
							</li>
							<li>
								<a href={repo.html_url}>{repo.name}</a>
							</li>
							<li>@{repo.owner.login}</li>
							<li>{repo.stargazers_count} stars</li>
						</ul>
					</li>
				);
			})}
		</ul>
	);
};

RepoGrid.proptypes = {
	repos: PropTypes.array.isRequired
};

const SelectLanguage = props => {
	var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
	return (
		<ul className="languages">
			{languages.map(lang => {
				console.log(props.selectedLanguage);
				return (
					<li
						style={
							lang === props.selectedLanguage ? { color: '#d0021b' } : null
						}
						onClick={props.onSelect.bind(this, lang)}
						key={lang}
					>
						{lang}
					</li>
				);
			})}
		</ul>
	);
};

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
};

class Popular extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLanguage: 'All',
			repos: ''
		};
		this.updateLanguage = this.updateLanguage.bind(this);
	}

	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage(lang) {
		this.setState(function() {
			return {
				selectedLanguage: lang,
				repos: null
			};
		});
		api.fetchPopularRepos(lang).then(repos => {
			this.setState(() => {
				return {
					repos: repos
				};
			});
		});
	}

	render() {
		return (
			<div>
				<SelectLanguage
					onSelect={this.updateLanguage}
					selectedLanguage={this.state.selectedLanguage}
				/>
				{!this.state.repos ? (
					<Loading />
				) : (
					<RepoGrid repos={this.state.repos} />
				)}
			</div>
		);
	}
}
export default Popular;
