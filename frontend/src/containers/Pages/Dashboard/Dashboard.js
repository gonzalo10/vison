import React from 'react';
import styled from 'styled-components';

import visionLogo from '../../../assets/images/vision.svg';

const LateralMenu = styled.div`
	width: 100px;
	height: 100vh;
	position: absolute;
	justify-content: space-between;
	flex-direction: column;
	display: flex;
	background-color: ${props => props.theme.color.dark};
`;
const TopMenu = styled.div`
	margin-top: 50px;
`;
const BottomMenu = styled.div`
	margin-bottom: 50px;
`;
const MenuItem = styled.div`
	margin-left: 20px;
	color: ${props => props.theme.white};
`;

const Container = styled.div`
	display: flex;
	margin-left: 100px;
	flex-direction: column;
`;
const Header = styled.div`
	height: 100px;
	display: flex;
	align-items: center;
`;

const Logo = styled.img`
	width: 40px;
	margin: 20px;
`;

const TitleHeader = styled.h1`
	font-size: 30px;
	font-weight: 600;
`;

const Models = styled.div`
	display: flex;
`;
const CardMenu = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	height: 85vh;
	overflow: scroll;
`;

const Card = styled.div`
	cursor: pointer;
	margin: 15px;
	position: relative;
	display: flex;
	text-align: center;
	flex-direction: column;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
		0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
	transition-property: color, background-color, box-shadow, transform;
	transition-duration: 0.15s;
	&:hover {
		box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
			0 18px 36px -18px rgba(0, 0, 0, 0.3),
			0 -12px 36px -8px rgba(0, 0, 0, 0.025);
	}
`;

const CardIcon = styled.h1``;
const CardText = styled.h3``;
const CardDescription = styled.p``;
const CardCallToAction = styled.button``;

export const Dashboard = () => {
	return (
		<>
			<LateralMenu>
				<TopMenu>
					<MenuItem>Discover</MenuItem>
					<MenuItem>Explore</MenuItem>
				</TopMenu>
				<BottomMenu>
					<MenuItem>Profile</MenuItem>
					<MenuItem>Log out</MenuItem>
				</BottomMenu>
			</LateralMenu>
			<Container>
				<Header>
					<Logo src={visionLogo} />
					<TitleHeader>Models</TitleHeader>
				</Header>
				<Models>
					<CardMenu>
						<Card>
							<CardIcon>😍/😡</CardIcon>
							<CardText>Sentiment Analysis</CardText>
							<CardDescription>
								Detect sentiment in texts (positive, negative or neutral).
							</CardDescription>
							<CardCallToAction>Start</CardCallToAction>
						</Card>
						<Card />
						<Card />
						<Card>
							<CardIcon>😍/😡</CardIcon>
							<CardText>Sentiment Analysis</CardText>
							<CardDescription>
								Detect sentiment in texts (positive, negative or neutral).
							</CardDescription>
							<CardCallToAction>Start</CardCallToAction>
						</Card>
					</CardMenu>
				</Models>
			</Container>
		</>
	);
};
