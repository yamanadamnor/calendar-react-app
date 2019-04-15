import React from 'react';
import { Transition, config, animated } from 'react-spring/renderprops';
import { Button, Row, Col, Progress } from 'antd';

import './SetupPage.css';
import * as account from '../../api/account/account';

export default class SetupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0, 
      questions: [
        {
          id: 0,
          title: "Welcome to PlannerOwO!",
          options: ["Click here to get started!"],
        },
        {
          id: 1,
          title: "At what time do you prefer to work?",
          options: ["Morning", "Daytime", "Afternoon", "Evening"],
          answers: ["morning", "daytime", "afternoon", "evening"],
        },
        {
          id: 2,
          title: "What is your preferred way of working?",
          options: ["Long but few sessions", "Short but many sessions"],
          answers: ["long", "short"]
        },
      ],
      answers: {
        "preferred_time": "",
        "preferred_length": "",
      },
    }
  }

  incrementProgress = (e) => {
    // Only increment if on first page
    if (this.state.progress === 0) {
      this.setState({ progress: this.state.progress + 1 });
      return;
    }

    const questions = [
      "preferred_time", "preferred_length",
    ];
    const key = questions[this.state.progress - 1];
    const curQuestion = this.state.questions[this.state.progress];
    const answer = curQuestion.answers[curQuestion.options.indexOf(e.target.textContent)];

    this.setState(prevState => ({ 
      // Add the new answer to the object
      answers: {
        ...prevState.answers,
        [key]: answer,
      }
    }), () => {
      // Submit on last question
      const newKey = questions[this.state.progress - 1];
      if (this.state.progress === questions.length && this.state.answers[newKey] !== "") {
        account.updateAllSettings(this.state.answers)
          .then(this.props.onFinish);
      }
    });

    // Only increase progress as long as there are questions left
    if (this.state.progress < questions.length) {
      this.setState({ progress: this.state.progress + 1 });
    }
  }

  decrementProgress = (e) => {
    this.setState({ progress: this.state.progress - 1 });
  }

  render() {
    const { questions } = this.state;

    return (
      <div className="setup-page">
        <Transition
          native
          config={config.slow}
          items={questions[this.state.progress]}
          keys={this.state.progress}
          from={{ position: 'absolute', opacity: 0 }}
          enter={{ position: 'absolute', opacity: 1 }}
          leave={{ position: 'absolute', opacity: 0 }}
        >
          {question => style => (
            <animated.div style={style} className="container container-setup">
              {question.id !== 0 && (
                <Button 
                  icon="arrow-left"
                  ghost="true"
                  className="back-btn-setup"
                  size="large"
                  onClick={this.decrementProgress} />
              )}
              <h1 style={{ textAlign: "center", color: "white" }}>{question.title}</h1>
              <Row key={question.id} type="flex" justify="center">
                {question.options.map(option => {
                  {/* fix lonely button lg breakpoint */}
                  return (
                    <Col key={option} className="choice-btn-row-setup" xs={24} lg={12}>
                      <Button className="choice-btn-setup" size={"large"} onClick={this.incrementProgress}>
                        {option}
                      </Button>
                    </Col>
                  );
                })}
              </Row>
            </animated.div>
          )}
        </Transition>
        {this.state.progress > 0 && (
          <Progress 
            strokeColor={{ from: '#FFFFFF', to: '#DAB6FC' }}
            strokeLinecap="square"
            percent={100 / Object.keys(this.state.answers).length * (this.state.progress)} 
            format={() => `${this.state.progress}/${Object.keys(this.state.answers).length}`}
            style={{ position: "absolute", bottom: "10px", boxSizing: "border-box" }}/>
        )}
      </div>
    );
  }
}