import React from 'react';
import styled from 'styled-components';

import TitleImg from '../../assets/images/Analytics.jpg';
import BlueTitleImg from '../../assets/images/blueAnalytics.png';
import MambaDashboard from '../../assets/images/MambaDashboard.jpeg';
import dasboardSVG from '../../assets/images/home.svg';
import dragSVG from '../../assets/images/drag.svg';
import manufactureSVG from '../../assets/images/manufacture.svg';
import integrateSVG from '../../assets/images/integrate.svg';
import visionLogo from '../../assets/images/vision.svg';
import DS from '../../assets/images/DS.png';
import BA from '../../assets/images/BA.png';
import DE from '../../assets/images/DE.png';
import AL from '../../assets/images/AL.png';
import idea from '../../assets/images/idea.svg';
import rocket from '../../assets/images/rocket.svg';
import flowchart from '../../assets/images/flowchart.svg';
import teamBuilding from '../../assets/images/teamBuilding.png';
import puzzle from '../../assets/images/puzzle.png';

const TitleSection = styled.div`
	width: 100vw;
	display: flex;
	justify-content: space-evenly;
	height: 650px;
	align-items: center;
	margin-bottom: 30px;
`;
const Header = styled.div`
	width: 100vw;
	position: absolute;
	display: flex;
	width: 100%;
	height: 760px;
	overflow: hidden;
	top: -300px;
	transform: skewY(12deg);
	transform-origin: 0;
	background: linear-gradient(158deg, #53f 44%, #05d5ff 85%, #a6ffcb 65%);
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
	background: #53f;
	height: 190px;
	position: absolute;
	bottom: 0;
`;
const Span4 = styled.span`
	width: calc(100% / 4);
	background: #4f40ff;
	height: 190px;
	position: absolute;
	bottom: 190px;
	left: 0;
`;
const Span2 = styled.span`
	width: calc(100% / 3);
	top: 0;
	left: 33.66666%;
	right: auto;
	background: #4553ff;
	height: 190px;
	position: absolute;
`;
const Span3 = styled.span`
	width: 33.33333%;
    width: calc(100% / 3);
	right: 0;
	position: absolute;
    bottom: auto;
	background: #1fa2ff;
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
const ExampleSection = styled.div`
	width: 100vw;
	text-align: center;
	display: flex;
	justify-content: space-evenly;
`;
const ExampleTitle = styled.h1`
	text-align: center;
	font-size: 40px;
	margin-bottom: 50px;
`;
const InteractiveExample = styled.div`
	text-align: center;
	display: flex;
	justify-content: center;
	flex-direction: column;
`;
const NavSwitcher = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 120px;
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
	&:hover {
		transition: all 420ms cubic-bezier(0.165, 0.84, 0.44, 1);
		outline: 0;
		background: #fff;
		color: #2ec7f2;
		box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
	}
`;

const TryText = styled.span`
	cursor: pointer;
	transition: width 2s;
	width: 200px;
	font-size: 16px;
	line-height: 22px;
	letter-spacing: 0.2px;
	color: #696969;
	font-weight: 700;
	&:hover {
		text-decoration: underline;
		color: #2ec7f2;
	}
`;

const SwitchImg = styled.img`
	width: 30px;
	&:hover {
		fill: blue;
	}
	margin-right: 10px;
`;
const ClientImg = styled.img`
	width: 200px;
	filter: grayscale(100%);
	&:hover {
		filter: none;
	}
	margin-right: 10px;
`;
const UsesImg = styled.img`
	height: 220px;
`;

const ClientsSection = styled.div`
	text-align: center;
	margin: 80px;
`;
const ClientsTitle = styled.h1`
	font-size: 46px;
	color: #333;
	margin-bottom: 30px;
	text-align: center;
	font-weight: 400;
	line-height: normal;
`;
const ClientsSubtitle = styled.h3`
	margin-bottom: 50px;
	font-size: 18px;
	font-weight: 400;
	text-align: center;
	width: 500px;
	margin: auto;
`;

const ClientTitle = styled.h3``;
const ClientType = styled.div``;
const UsesType = styled.div``;
const ClientsIcons = styled.div`
	display: flex;
	justify-content: center;
	margin: 60px;
`;
const UsesIcons = styled.div`
	display: flex;
	justify-content: space-evenly;
	margin: 60px;
`;
const Footer = styled.div`
	width: 100vw;
	display: flex;
	width: 100%;
	height: 760px;
	overflow: hidden;
	transform: skewY(12deg);
	transform-origin: 0;
	z-index: -1;
	margin-bottom: -561px;
	background-color: #f6f9fc;
`;
const StripeArea = styled.div`
	position: absolute;
	width: 100vw;
	display: flex;
	width: 100%;
	height: 760px;
	overflow: hidden;
	transform: skewY(12deg);
	transform-origin: 0;
	z-index: -1;
	margin-bottom: -561px;
	background-color: #f6f9fc;
`;
const FooterContent = styled.div`
	display: grid;
	height: 100px;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: 100px;
	margin-top: 100px;
	position: absolute;
	width: 100%;
`;

const Logo = styled.img`
	height: 100px;
	-webkit-font-smoothing: antialiased;
	margin: auto;
`;
const Product = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;
`;
const Guides = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;
`;
const Company = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;
`;

const LandingPage = () => {
	return (
		<div>
			<Header>
				<Span1></Span1>
				<Span2></Span2>
				<Span3></Span3>
				<Span4></Span4>
			</Header>
			<TitleSection>
				<TextArea>
					<TitleText>
						Build production-ready A.I. Models
						<br />— without code
					</TitleText>
					<SubtitleText>
						Design, build, launch, and grow faster. Without distracting your
						engineers.
					</SubtitleText>
					<CallToAction>
						<FirstButton>START Free NOW</FirstButton>
					</CallToAction>
				</TextArea>
				<Img src={BlueTitleImg} />
			</TitleSection>
			<ExampleSection>
				<InteractiveExample>
					<ExampleTitle>Put Machine Learning at your fingertips</ExampleTitle>
					<ImgMamba src={MambaDashboard} />
				</InteractiveExample>
				<NavSwitcher>
					<StepsButtons active>
						<SwitchImg src={dasboardSVG} />
						Dashboard
					</StepsButtons>
					<StepsButtons active>
						<SwitchImg src={dragSVG} />
						Drag & Drop Model creator
					</StepsButtons>
					<StepsButtons>
						<SwitchImg src={manufactureSVG} />
						Production In One Click
					</StepsButtons>
					<StepsButtons>
						<SwitchImg src={integrateSVG} />
						Integrate
					</StepsButtons>
					<StepsButtons>
						<TryText>Try for free 🚀</TryText>
					</StepsButtons>
				</NavSwitcher>
			</ExampleSection>
			<StripeArea />
			<ClientsSection>
				<ClientsTitle>
					From Raw Data
					<br />
					To
					<br />
					Business Impact.
				</ClientsTitle>
				<ClientsSubtitle>
					Vision's single, collaborative platform powers both self-service
					analytics and the operationalization of machine learning models in
					production.
				</ClientsSubtitle>
				<UsesIcons>
					<UsesType>
						<UsesImg src={teamBuilding} />
						<ClientTitle>Business Analyst</ClientTitle>
					</UsesType>
					<UsesType>
						<UsesImg src={puzzle} />
						<ClientTitle>Data Engineer</ClientTitle>
					</UsesType>
					<UsesType>
						<UsesImg src={teamBuilding} />
						<ClientTitle>Project Manager</ClientTitle>
					</UsesType>
					<UsesType>
						<UsesImg src={puzzle} />
						<ClientTitle>Data Sciences</ClientTitle>
					</UsesType>
				</UsesIcons>
			</ClientsSection>
			<ClientsSection>
				<ClientsTitle>
					For Everyone <br />
					In The Data-Powered Organization.
				</ClientsTitle>
				<ClientsSubtitle>
					Vision is the data platform that brings ease and efficiency to
					everyone in the data-to-insights process, including:
				</ClientsSubtitle>
				<ClientsIcons>
					<ClientType>
						<ClientImg src={BA} />
						<ClientTitle>Business Analyst</ClientTitle>
					</ClientType>
					<ClientType>
						<ClientImg src={DE} />
						<ClientTitle>Data Engineer</ClientTitle>
					</ClientType>
					<ClientType>
						<ClientImg src={AL} />
						<ClientTitle>Project Manager</ClientTitle>
					</ClientType>
					<ClientType>
						<ClientImg src={DS} />
						<ClientTitle>Data Sciences</ClientTitle>
					</ClientType>
				</ClientsIcons>
			</ClientsSection>
			<Footer />
			<FooterContent>
				<Logo src={visionLogo} />
				<Product>Products</Product>
				<Guides>Guides</Guides>
				<Company>Company</Company>
			</FooterContent>
		</div>
	);
};

export default LandingPage;
