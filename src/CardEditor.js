import React from 'react';
import './CardViewer.css';
import { Link } from 'react-router-dom';

class CardEditor extends React.Component {
	constructor(props) {
		super(props);
		this.state = { front: '', back: '' };
	}
	addCard = () => {
		if (!this.state.front.trim() || !this.state.back.trim()) {
			alert('We disallow cards with empty fronts or empty backs.');
			return;
		}
		this.props.addCard(this.state);
		this.setState({ front: '', back: '' });
	};
	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	deleteCard = (index) => {
		this.props.deleteCard(index);
	};
	render() {
		const cards = this.props.cards.map((card, index) => {
			return (
				<tr key={index}>
					<td>{card.front}</td>
					<td>{card.back}</td>
					<td>
						<button onClick={() => this.deleteCard(index)}>Delete card</button>
					</td>
				</tr>
			);
		});
		return (
			<div>
				<h2>Card Editor</h2>
				<table>
					<thead>
						<tr>
							<th>Front</th>
							<th>Back</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>{cards}</tbody>
				</table>
				<br />
				<input
					name='front'
					onChange={this.handleChange}
					placeholder='Front of card'
					value={this.state.front}
				/>
				<input
					name='back'
					onChange={this.handleChange}
					placeholder='Back of card'
					value={this.state.back}
				/>
				<button onClick={this.addCard}>Add card</button>
				<hr />
				<Link to='/viewer'>Switch mode to view the cards</Link>
			</div>
		);
	}
}

export default CardEditor;
