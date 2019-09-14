import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { userActions } from '../../_actions';

const Header = styled.button`
	background-color: blue;
	width: 100vw;
`;

const Navbar = ({}) => {
	return <Header position='static' className={''}></Header>;
};

function mapStateToProps(state) {
	const { users, authentication } = state;
	const { user } = authentication;
	return {
		user,
		users,
	};
}

export default connect(mapStateToProps)(Navbar);
