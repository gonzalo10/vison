import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { sentimentActions } from '../../../_actions';

import { Sidebar } from '../../Layout/Sidebar';

const Container = styled.div`
	margin-left: 100px;
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
const Badges = styled.div`
	background-color: ${props => props.theme.color.dark};
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
	justify-content: center;
`;

const SentimentAnalysis = ({ dispatch, sentimentResult }) => {
	const [text, setText] = useState('');
	const handleChange = e => {
		setText(e.target.value);
	};
	const execute = () => {
		dispatch(sentimentActions.execute(text));
	};

	console.log('sentimentResult', sentimentResult);

	return (
		<>
			<Sidebar />
			<Container>
				<Header>
					<Title>
						<Icon>😍/😡</Icon>Sentimen tAnalysis
					</Title>
					<Description>
						This is a generic sentiment analysis classifier for texts in
						English. It works great in any kind of texts. If you are not sure of
						which sentiment analysis classifier to use, use this one.
						<BadgeGroup>
							<Badges>Positive</Badges>
							<Badges>Neutral</Badges>
							<Badges>Negative</Badges>
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
						{sentimentResult ? (
							<Ouput>
								<OutputTitle>Results</OutputTitle>
								<OutputStats>
									<div>SentimentScore</div>
									<div>Positive:{sentimentResult.SentimentScore.Positive}</div>
									<div>Negative:{sentimentResult.SentimentScore.Negative}</div>
									<div>Neutral:{sentimentResult.SentimentScore.Neutral}</div>
									<div>Mixed:{sentimentResult.SentimentScore.Mixed}</div>
									😍 99% <Badges>{sentimentResult.sentiment}</Badges>
								</OutputStats>
							</Ouput>
						) : (
							<div>Loading...</div>
						)}
					</Right>
				</Body>
			</Container>
		</>
	);
};

function mapStateToProps(state) {
	const { sentimentResult } = state.sentiment;
	console.log('state', state);
	return { sentimentResult };
}

const connectedSentiment = connect(mapStateToProps)(SentimentAnalysis);
export { connectedSentiment as SentimentAnalysis };
