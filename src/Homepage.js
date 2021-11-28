import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

const Homepage = (props) => {
	if (!isLoaded(props.homepage)) {
		return <div>Loading...</div>;
	}
	const decks = Object.keys(props.homepage).map((deckId) => {
		return (
			<div key={deckId}>
				<Link to={`/viewer/${deckId}`}>{props.homepage[deckId].name}</Link>
			</div>
		);
	});

	return (
		<div>
			<h1>Homepage</h1>
			<h2>Card Editor/Creator</h2>
			<Link to='/editor'>Go to the Card Editor and Creator</Link>
			<h2>Flashcards List</h2>
			<h3>Click a link to go to its Card Viewer</h3>
			{decks}
		</div>
	);
};

const mapStateToProps = (state) => {
	return { homepage: state.firebase.data.homepage };
};

export default compose(
	firebaseConnect(['/homepage']),
	connect(mapStateToProps)
)(Homepage);
