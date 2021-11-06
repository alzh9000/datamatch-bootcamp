import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => (
	<div>
		<Link to='/editor'>Go to the Card Editor</Link>
        <br/>
		<Link to='/viewer'>Go to the Card Viewer</Link>
	</div>
);

export default Homepage;
