import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/functions';
import { createStore, combineReducers } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';

const firebaseConfig = {
	apiKey: 'AIzaSyDY8o-53E89Y871P67q5l3vOGlaliUv07Q',
	authDomain: 'datamatch-bootcamp-d2123.firebaseapp.com',
	databaseURL: 'https://datamatch-bootcamp-d2123-default-rtdb.firebaseio.com',
	projectId: 'datamatch-bootcamp-d2123',
	storageBucket: 'datamatch-bootcamp-d2123.appspot.com',
	messagingSenderId: '1095488369345',
	appId: '1:1095488369345:web:8dd00973f8ba81dd9fda40',
};

firebase.initializeApp(firebaseConfig);

// Add firebase to reducers
const rootReducer = combineReducers({
	firebase: firebaseReducer,
	// firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers
const store = createStore(rootReducer, composeWithDevTools());
// react-redux-firebase config
const rrfConfig = {
	userProfile: 'users',
	// useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
	// enableClaims: true // Get custom claims along with the profile
};

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	// createFirestoreInstance // <- needed if using firestore
};

ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById('root')
);
