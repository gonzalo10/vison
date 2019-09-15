import styled from 'styled-components';

export const TitleSection = styled.div`
	width: 100vw;
	display: flex;
	justify-content: space-evenly;
	height: 650px;
	align-items: center;
	margin-bottom: 30px;
`;
export const Header = styled.div`
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
export const Img = styled.img`
	height: 500px;
	-webkit-font-smoothing: antialiased;
`;

export const ImgMamba = styled.img`
	box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
	-webkit-font-smoothing: antialiased;
	width: 65vw;
`;

export const Span1 = styled.span`
	width: calc(100% / 5);
	background: #53f;
	height: 190px;
	position: absolute;
	bottom: 0;
`;
export const Span4 = styled.span`
	width: calc(100% / 4);
	background: #4f40ff;
	height: 190px;
	position: absolute;
	bottom: 190px;
	left: 0;
`;
export const Span2 = styled.span`
	width: calc(100% / 3);
	top: 0;
	left: 33.66666%;
	right: auto;
	background: #4553ff;
	height: 190px;
	position: absolute;
`;
export const Span3 = styled.span`
	width: 33.33333%;
    width: calc(100% / 3);
	right: 0;
	position: absolute;
    bottom: auto;
	background: #1fa2ff;
	height: 190px;
}
`;

export const TextArea = styled.div`
	width: 70vw;
	padding-left: 14vw;
`;
export const TitleText = styled.h1`
	font-size: 40px;
	font-weight: 400;
	font-family: Camphor, Open Sans, Segoe UI, sans-serif;
	text-rendering: optimizeLegibility;
	-webkit-font-feature-settings: 'pnum';
	font-feature-settings: 'pnum';
	font-variant-numeric: proportional-nums;
	color: ${props => props.theme.white};
`;
export const SubtitleText = styled.h3`
	margin-top: 20px;
	color: #d9fcff;
	font-weight: 400;
	font-size: 17px;
	line-height: 28px;
	width: 36vw;
	text-align: justify;
`;

export const CallToAction = styled.div`
	display: flex;
	justify-content: start;
`;
export const FirstButton = styled.button`
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
export const SecondButton = styled.button`
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
export const ExampleSection = styled.div`
	width: 100vw;
	text-align: center;
	display: flex;
	justify-content: space-evenly;
`;
export const ExampleTitle = styled.h1`
	text-align: center;
	font-size: 40px;
	margin-bottom: 50px;
`;
export const InteractiveExample = styled.div`
	text-align: center;
	display: flex;
	justify-content: center;
	flex-direction: column;
`;
export const NavSwitcher = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 120px;
`;
export const StepsButtons = styled.div`
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

export const TryText = styled.span`
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

export const SwitchImg = styled.img`
	width: 30px;
	&:hover {
		fill: blue;
	}
	margin-right: 10px;
`;
export const ClientImg = styled.img`
	width: 200px;
	filter: grayscale(100%);
	&:hover {
		filter: none;
	}
	margin-right: 10px;
`;
export const UsesImg = styled.img`
	height: 220px;
`;

export const Section = styled.div`
	text-align: center;
	margin: 160px 80px;
`;
export const ClientsTitle = styled.h1`
	font-size: 46px;
	color: #333;
	margin-bottom: 30px;
	text-align: center;
	font-weight: 400;
	line-height: normal;
`;
export const ClientsSubtitle = styled.h3`
	margin-bottom: 50px;
	font-size: 18px;
	font-weight: 400;
	text-align: center;
	width: 500px;
	margin: auto;
`;

export const ClientTitle = styled.h3``;
export const ClientType = styled.div``;
export const UsesType = styled.div``;
export const ClientsIcons = styled.div`
	display: flex;
	justify-content: center;
	margin: 60px;
`;
export const UsesIcons = styled.div`
	display: flex;
	justify-content: space-evenly;
	margin: 60px;
`;
export const Footer = styled.div`
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
export const StripeArea = styled.div`
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
export const FooterContent = styled.div`
	display: grid;
	height: 100px;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: 100px;
	margin-top: 100px;
	position: absolute;
	width: 100%;
`;

export const Logo = styled.img`
	height: 100px;
	-webkit-font-smoothing: antialiased;
	margin: auto;
`;
export const Product = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;
`;
export const Guides = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;
`;
export const Company = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;
`;
