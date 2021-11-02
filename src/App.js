import React from 'react';
import CardEditor from './CardEditor';
import CardViewer from './CardViewer';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: [
				{ front: 'front1', back: 'back1' },
				{ front: 'front2', back: 'back2' },
			],
			editor: true,
		};
	}

	addCard = (card) => {
		const cards = this.state.cards.slice().concat(card);
		this.setState({ cards });
	};

	deleteCard = (index) => {
		const cards = this.state.cards.slice();
		cards.splice(index, 1);
		this.setState({ cards: cards });
	};

	switchMode = () => {
		this.setState({ editor: !this.state.editor });
		console.log('Editor state changed');
	};

	render() {
		if (this.state.editor) {
			return (
				<CardEditor
					addCard={this.addCard}
					deleteCard={this.deleteCard}
					cards={this.state.cards}
					switchMode={this.switchMode}
				/>
			);
		} else {
			return (
				<CardViewer switchMode={this.switchMode} cards={this.state.cards} />
			);
		}
	}
}
export default App;
