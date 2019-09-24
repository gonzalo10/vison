import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { entityActions } from '../../../_actions';

import { Sidebar } from '../../Layout/Sidebar';

const Container = styled.div`
	margin: auto;
	width: 60%
	display: flex;
	flex-direction: column;
`;
const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	margin: 15px;
	position: relative;
	text-align: center;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
		0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
`;
const Icon = styled.span`
	font-size: 40px;
`;
const Title = styled.h3`
	display: flex;
	flex-direction: column;
`;
const Description = styled.h5`
	max-width: 40vw;
	color: ${props => props.theme.color.lightGrey};
`;
const BadgeGroup = styled.div`
	display: flex;
	justify-content: space-around;
	margin: 10px;
`;
const Badge = styled.div`
	background-color: ${props => props.theme.color.dark};
	font-size: 14px;
	border-radius: 20px;
	padding: 4px 10px;
	color: ${props => props.theme.white};
`;
const Body = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	margin: 15px;
	position: relative;
	text-align: center;
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25),
		0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
`;
const Left = styled.div`
	border-right: 1px solid grey;
	width: 100%;
	justify-content: center;
	display: flex;
	flex-direction: column;
	padding: 10px 30px;
`;
const Right = styled.div`
	width: 100%;
	justify-content: space-around;
	display: flex;
	flex-direction: column;
`;

const BodyTitle = styled.h3``;
const TextArea = styled.textarea`
	min-height: 100px;
	border-radius: 10px;
`;
const Ouput = styled.div``;
const OutputTitle = styled.h5``;
const OutputStats = styled.div`
	display: flex;
	justify-content: space-evenly;
`;
const Col = styled.div``;
const StatTitle = styled.div`
	margin-bottom: 10px;
	border-bottom: 1px solid blue;
`;
const StatResult = styled.div``;

const BusinessAnalysis = ({ dispatch, entities, isLoading }) => {
	const [text, setText] = useState('');
	const handleChange = e => {
		setText(e.target.value);
	};
	const execute = () => {
		dispatch(entityActions.execute(text));
	};

	// const StatTable = () => (
	// 	<OutputStats>
	// 		<Col>
	// 			<StatTitle>Icon</StatTitle>
	// 			<StatResult>{icon}</StatResult>
	// 		</Col>
	// 		<Col>
	// 			<StatTitle>Result</StatTitle>
	// 			<StatResult>
	// 				<Badge>{sentimentTitle}</Badge>
	// 			</StatResult>
	// 		</Col>
	// 		<Col>
	// 			<StatTitle>Confidence</StatTitle>
	// 			<StatResult>{sentimentValue}%</StatResult>
	// 		</Col>
	// 	</OutputStats>
	// );

	return (
		<>
			<Sidebar />
			<Container>
				<Header>
					<Title>
						<Icon>💰</Icon>Business Analysis
					</Title>
					<Description>
						Classifies professional profiles, companies or jobs by industry.
						<BadgeGroup>
							<Badge>Business</Badge>
						</BadgeGroup>
					</Description>
				</Header>
				<Body>
					<Left>
						<BodyTitle>Test with your own text</BodyTitle>
						<TextArea onChange={handleChange}></TextArea>
						<button onClick={execute}>Run</button>
					</Left>
					<Right>
						{isLoading ? (
							<div>Loading...</div>
						) : (
							<Ouput>
								<OutputTitle>Business Analysis</OutputTitle>
								{entities &&
									entities.map(business => {
										return (
											<div>
												<div>{business.name}</div>
												<div>{business.score}</div>
												<div>{business.type}</div>
												<div>{business.description}</div>
												<div>{business.articleBody}</div>
												<div>{business.wikiUrl}</div>
												<div>{business.url}</div>
											</div>
										);
									})}
							</Ouput>
						)}
					</Right>
				</Body>
			</Container>
		</>
	);
};

function mapStateToProps(state) {
	const { entities } = state.entity;
	return {
		entities,
	};
}

const connected = connect(mapStateToProps)(BusinessAnalysis);
export { connected as BusinessAnalysis };