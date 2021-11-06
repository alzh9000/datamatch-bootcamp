import React from 'react';
import { Link } from 'react-router-dom';
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
		const card =
			this.props.cards[this.state.index][
				this.state.showFront ? 'front' : 'back'
			];
		return (
			<div>
				<h2>Card Viewer</h2>
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
				<Link to='/editor'>Switch mode to edit the cards</Link>
			</div>
		);
	}
}

export default CardViewer;
