import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import './CardViewer.css';

class CardViewer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			showFront: true,
		};
	}
	nextCard = () => {
		if (this.state.index < this.props.cards.length - 1) {
			this.setState({
				index: this.state.index + 1,
				showFront: true,
			});
		}
	};
	prevCard = () => {
		if (this.state.index > 0) {
			this.setState({
				index: this.state.index - 1,
				showFront: true,
			});
		}
	};
	flip = () => {
		this.setState({ showFront: !this.state.showFront });
	};
	render() {
		if (!isLoaded(this.props.cards)) {
			return <div>Loading...</div>;
		}

		if (isEmpty(this.props.cards)) {
			return <div>Page not found!</div>;
		}

		const card =
			this.props.cards[this.state.index][
				this.state.showFront ? 'front' : 'back'
			];
		return (
			<div>
				<h2>{this.props.name}</h2>
				Card {this.state.index + 1}/{this.props.cards.length}
				<hr />
				<div onClick={this.flip} className='card'>
					{card}
				</div>
				<br />
				<button
					disabled={this.state.index >= this.props.cards.length - 1}
					onClick={this.nextCard}
				>
					Next Card
				</button>
				<button disabled={this.state.index <= 0} onClick={this.prevCard}>
					Previous Card
				</button>
				<hr />
				<Link to='/editor'>Go to Home</Link>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	const deck = state.firebase.data[props.match.params.deckId];
	const name = deck && deck.name;
	const cards = deck && deck.cards;
	return { cards: cards, name: name };
};

export default compose(
	withRouter,
	firebaseConnect((props) => {
		const deckId = props.match.params.deckId;
		return [{ path: `/decks/${deckId}`, storeAs: deckId }];
	}),
	connect(mapStateToProps)
)(CardViewer);
