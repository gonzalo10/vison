import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { userActions } from '../../_actions';
import Logo from '../../assets/images/vision.svg';

const Header = styled.div`
	color: ${props => props.theme.fontsPrimaryColor};
	width: 100vw;
	height: 60px;
	display: flex;
	justify-content: left;
	align-items: center;
	position: absolute;
	z-index: 1;
`;

const Img = styled.img`
	width: 40px;
	margin: 10px;
`;
const Brand = styled.h1`
	font-size: 20px
	color: ${props => props.theme.white};
	font-weight: 900;
`;

const Navbar = ({ url }) => {
	return (
		<Header url={url}>
			<Img src={Logo} />
			<Brand>Vision</Brand>
		</Header>
	);
};

function mapStateToProps(state) {
	const user = 'Gonzalo';
	return {
		user,
	};
}

export default connect(mapStateToProps)(Navbar);
