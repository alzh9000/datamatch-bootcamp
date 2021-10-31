import React from 'react';

class CardViewer extends React.Component {
	render() {
		return (
			<div>
				<h2>Card Viewer</h2>
				<hr />
				<button onClick={this.props.switchMode}>
					Switch mode to edit the cards
				</button>
			</div>
		);
	}
}

export default CardViewer;
