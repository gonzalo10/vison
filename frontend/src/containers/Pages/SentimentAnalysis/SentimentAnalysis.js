import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { sentimentActions, modelActions } from '../../../_actions';
import { history } from '../../../helpers';
import { Sidebar } from '../../Layout/Sidebar';
import { Button as ButtonBase } from '../../../utils/Designs';
import { PieChart, Pie, Sector, Cell } from 'recharts';

const Container = styled.div`
  margin-left: 100px;
  height: 100vh;
  background-color: ${props => props.theme.color.beigeWhite}
  display: flex;
  flex-direction: column;
`;

const Button = styled(ButtonBase)`
  width: 200px;
  margin: auto;
`;
const Header = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 15px;
  position: relative;
  text-align: center;
  border-radius: 8px;
`;
const Icon = styled.span`
  font-size: 30px;
`;
const Title = styled.h2`
  margin-top: 0px;
  margin-bottom: 0px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;
const Description = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  max-width: 600px;
  margin-left: 20px;
  color: ${props => props.theme.color.lightGrey};
`;
const BadgeGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px;
`;
const Badge = styled.div`
  background-color: ${props => props.theme.color.blueDark};
  font-size: 20px;
  border-radius: 20px;
  padding: 4px 10px;
  margin: 15px;
  min-width: 100px;
  color: ${props => props.theme.white};
`;
const Body = styled.div`
  min-height: 300px;
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
  min-height: 150px;
  border-radius: 10px;
  margin-bottom: 20px;
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
const ContentArea = styled.div`
  margin: auto;
  margin-top: 0px;
  width: 90%;
`;
const ResultRow = styled.div`
  display: grid;
  width: 100%;
  max-height: 18px;
  grid-template-columns: 3fr 1fr 1fr;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 5px;
  padding-top: 5px;
  overflow: scroll;
`;

const ResultsArea = styled.div`
  height: 300px;
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
const DataArea = styled.div`
  width: 60%;
  overflow: scroll;
  height: 100%;
`;
const StatsArea = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
`;

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SentimentAnalysis = ({
  dispatch,
  sentimentTitle,
  sentimentValue,
  icon,
  isLoading,
  selectedModel,
}) => {
  const [text, setText] = useState('');

  useEffect(() => {
    getModel();
  }, []);

  const getModelId = () => {
    const url = history.location.pathname.split('/');
    const id = url[url.length - 1];
    return id;
  };

  const getModel = () => {
    const url = history.location.pathname.split('/');
    const id = getModelId();
    const modelType = url[url.length - 2];
    dispatch(modelActions.getModel(id, modelType));
  };

  const handleChange = e => {
    setText(e.target.value);
  };
  const execute = () => {
    const modelId = getModelId();
    dispatch(sentimentActions.execute(text, modelId));
    getModel();
  };

  const StatTable = () => (
    <OutputStats>
      <Col>
        <StatTitle>Icon</StatTitle>
        <StatResult>{icon}</StatResult>
      </Col>
      <Col>
        <StatTitle>Result</StatTitle>
        <StatResult>
          <Badge>{sentimentTitle}</Badge>
        </StatResult>
      </Col>
      <Col>
        <StatTitle>Confidence</StatTitle>
        <StatResult>{sentimentValue}%</StatResult>
      </Col>
    </OutputStats>
  );
  console.log('selectedModel', selectedModel);
  return (
    <>
      <Sidebar />
      <Container>
        <Header>
          <Title>
            Sentiment Analysis
            <br />
            <Icon>😍/😡</Icon>
          </Title>
          <Description>
            <BadgeGroup>
              <Badge>Positive</Badge>
              <Badge>Neutral</Badge>
              <Badge>Negative</Badge>
              <Badge>Mixed</Badge>
            </BadgeGroup>
          </Description>
        </Header>
        <ContentArea>
          <Body>
            <Left>
              <BodyTitle>Analyze your text</BodyTitle>
              <TextArea onChange={handleChange}></TextArea>
              <Button color='blueDark' onClick={execute}>
                Classify Text
              </Button>
            </Left>
            <Right>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <Ouput>
                  <OutputTitle>Sentiment Analysis</OutputTitle>
                  {console.log(icon)}
                  {sentimentValue ? <StatTable /> : null}
                </Ouput>
              )}
            </Right>
          </Body>
          <ResultsArea>
            <DataArea>
              <ResultRow>
                <div>
                  <strong>text</strong>
                </div>
                <div>
                  <strong>sentiment</strong>
                </div>
                <div>
                  <strong>Accuracy</strong>
                </div>
              </ResultRow>
              {selectedModel
                ? selectedModel.sentimentModel.data.map(
                    ({
                      text,
                      sentiment,
                      mixed,
                      neutral,
                      positive,
                      negative,
                    }) => {
                      return (
                        <ResultRow>
                          <div>{text}</div>
                          <div>{sentiment}</div>
                          <div>
                            {Math.max(
                              mixed,
                              neutral,
                              negative,
                              positive
                            ).toFixed(2)}
                          </div>
                        </ResultRow>
                      );
                    }
                  )
                : null}
            </DataArea>
            <StatsArea>
              <PieChart width={200} height={200}>
                <Pie
                  data={data}
                  cx={100}
                  cy={100}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'>
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
              <div>Total: 200</div>
            </StatsArea>
          </ResultsArea>
        </ContentArea>
      </Container>
    </>
  );
};

function mapStateToProps(state) {
  const { sentimentTitle, sentimentValue, isLoading, icon } = state.sentiment;
  const { selectedModel } = state.models;
  return {
    sentimentTitle,
    sentimentValue,
    isLoading,
    icon,
    selectedModel,
  };
}

const connectedSentiment = connect(mapStateToProps)(SentimentAnalysis);
export { connectedSentiment as SentimentAnalysis };
