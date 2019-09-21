import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { userActions } from '../../../_actions';

export const LoginSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 400px;
`;

const SignupPage = ({ dispatch }) => {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

	const handleLogin = () => {
		dispatch(userActions.register(username, password));
	};

	return (
		<LoginSection>
			<h1>Signup</h1>
			<input
				type='text'
				onChange={e => setUsername(e.target.value)}
				value={username || ''}
			/>
			<input
				onChange={e => setPassword(e.target.value)}
				value={password || ''}
			/>
			<button onClick={handleLogin}>Login</button>
		</LoginSection>
	);
};

function mapStateToProps(state) {
	console.log(state);
	return {};
}

const connectedLoginPage = connect(mapStateToProps)(SignupPage);
export { connectedLoginPage as SignupPage };
