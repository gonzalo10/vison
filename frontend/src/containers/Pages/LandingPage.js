import React from 'react';
import styled from 'styled-components';

import TitleImg from '../../assets/images/Analytics.jpg';
import BlueTitleImg from '../../assets/images/blueAnalytics.png';
import MambaDashboard from '../../assets/images/MambaDashboard.jpeg';
import dasboardSVG from '../../assets/images/home.svg';

const TitleSection = styled.div`
	width: 100vw;
	display: flex;
	justify-content: space-evenly;
	height: 100vh;
	align-items: center;
`;
const Header = styled.div`
	width: 100vw;
	position: absolute;
	display: flex;
	width: 100%;
	height: 760px;
	overflow: hidden;
	transform: skewY(-12deg);
	transform-origin: 0;
	background: linear-gradient(150deg, #53f 15%, #05d5ff 70%, #a6ffcb 94%);
	z-index: -1;
`;
const Img = styled.img`
	height: 500px;
	-webkit-font-smoothing: antialiased;
`;
const ImgMamba = styled.img`
	box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
	-webkit-font-smoothing: antialiased;
	width: 65vw;
`;

const Span1 = styled.span`
	width: calc(100% / 5);
	left: calc(calc(calc(100% / 3) / 2) * -1);
	background: #53f;
	height: 190px;
`;
const Span2 = styled.span`
	width: calc(100% / 3);
	top: 0;
	left: 16.66666%;
	left: calc(calc(100% / 3) / 2);
	right: auto;
	background: #4553ff;
	height: 190px;
`;
const Span3 = styled.span`
	width: 33.33333%;
    width: calc(100% / 3);
    left: 49.99999%;
    left: calc(calc(calc(100% / 3) / 2) + calc(100% / 3));
    bottom: auto;
	background: #4f40ff;
	height: 190px;
}
`;

const TextArea = styled.div`
	width: 70vw;
	padding-left: 14vw;
`;
const TitleText = styled.h1`
	font-size: 40px;
	font-weight: 400;
	font-family: Camphor, Open Sans, Segoe UI, sans-serif;
	text-rendering: optimizeLegibility;
	-webkit-font-feature-settings: 'pnum';
	font-feature-settings: 'pnum';
	font-variant-numeric: proportional-nums;
	color: ${props => props.theme.white};
`;
const SubtitleText = styled.h3`
	margin-top: 20px;
	color: #d9fcff;
	font-weight: 400;
	font-size: 17px;
	line-height: 28px;
	width: 36vw;
	text-align: justify;
`;

const CallToAction = styled.div`
	display: flex;
	justify-content: start;
`;
const FirstButton = styled.button`
	margin-right: 23px;
	border: none;
	color: #fff;
	background: #3ecf8e;
	text-shadow: 0 1px 3px rgba(36, 180, 126, 0.4);
	white-space: nowrap;
	display: inline-block;
	height: 40px;
	line-height: 40px;
	padding: 0 14px;
	box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
	border-radius: 4px;
	font-size: 15px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.025em;
	text-decoration: none;
	-webkit-transition: all 0.15s ease;
	transition: all 0.15s ease;
`;
const SecondButton = styled.button`
	white-space: nowrap;
	border: none;
	display: inline-block;
	height: 40px;
	line-height: 40px;
	padding: 0 14px;
	box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
	background: #fff;
	border-radius: 4px;
	font-size: 15px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.025em;
	color: #6772e5;
	text-decoration: none;
	-webkit-transition: all 0.15s ease;
	transition: all 0.15s ease;
`;
const Example = styled.div`
	width: 100vw;
	text-align: center;
`;
const InteractiveExample = styled.div`
	width: 100vw;
	text-align: center;
	display: flex;
	justify-content: center;
`;
const NavSwitcher = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 50px;
`;
const StepsButtons = styled.div`
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	background: 0 0;
	text-decoration: none;
	cursor: pointer;
	border-radius: 4px;
	text-align: left;
	display: flex;
	align-items: center;
	border: none;
	padding: 1rem;
	width: 200px;
	font-size: 16px;
	line-height: 22px;
	letter-spacing: 0.2px;
	color: #696969;
	font-weight: 700;
	&:active {
		transition: all 420ms cubic-bezier(0.165, 0.84, 0.44, 1);
		outline: 0;
		background: #fff;
		box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
	}
`;

const SwitchImg = styled.img`
	width: 30px;
	&:hover {
		fill: blue;
	}
	margin-right: 10px;
`;
const LandingPage = () => {
	return (
		<>
			<Header>
				<Span1></Span1>
				<Span2></Span2>
				<Span3></Span3>
			</Header>
			<TitleSection>
				<TextArea>
					<TitleText>The new standard in Machine Learning</TitleText>
					<SubtitleText>
						Vision is the best software platform for running an internet
						business. We handle billions of data every year for forward-thinking
						businesses around the world.
					</SubtitleText>
					<CallToAction>
						<FirstButton>START NOW</FirstButton>
						<SecondButton>Contact Sales</SecondButton>
					</CallToAction>
				</TextArea>
				<Img src={BlueTitleImg} />
			</TitleSection>
			<Example>
				<h1>Put Machine Learning at your fingertips</h1>
				<InteractiveExample>
					<ImgMamba src={MambaDashboard} />
					<NavSwitcher>
						<StepsButtons active>
							<SwitchImg src={dasboardSVG} />
							Dashboard
						</StepsButtons>
						<StepsButtons>Drag & Drop Model creator</StepsButtons>
						<StepsButtons>Production In One Click </StepsButtons>
						<StepsButtons>Share</StepsButtons>
					</NavSwitcher>
				</InteractiveExample>
			</Example>
		</>
	);
};

export default LandingPage;
