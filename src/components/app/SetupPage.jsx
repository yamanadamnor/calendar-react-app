import React from 'react';
import { Transition, config, animated } from 'react-spring/renderprops';
import { Button, Row, Col } from 'antd';

import './SetupPage.css';

export default class SetupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0, 
    }
  }

  incrementProgress = (e) => {
    console.log(e.target.textContent);
    this.setState({ progress: this.state.progress + 1 })
  }


  render() {
    const Page0 =
      <div className="container container-setup">
        <h1 style={{ textAlign: "center", color: "white" }}>Welcome to PlannerOwO!</h1>
        <Button size={"large"} onClick={this.incrementProgress}>
          Click here to get started!
        </Button>
      </div>;

    const Page1 =
      <div className="container container-setup">
        <h1 style={{ textAlign: "center", color: "white" }}>At what time do you prefer to work?</h1>
        <Row type="flex" justify="center">
          <Col className="choice-btn-row-setup" xs={24} lg={12}>
            <Button className="choice-btn-setup" size={"large"} onClick={this.incrementProgress}>
              Morning
            </Button>
          </Col>
          <Col className="choice-btn-row-setup" xs={24} lg={12}>
            <Button className="choice-btn-setup" size={"large"} onClick={this.incrementProgress}>
              Daytime
            </Button>
          </Col>
          <Col className="choice-btn-row-setup" xs={24} lg={12}>
            <Button className="choice-btn-setup" size={"large"} onClick={this.incrementProgress}>
              Afternoon
            </Button>
          </Col>
          <Col className="choice-btn-row-setup" xs={24} lg={12}>
            <Button className="choice-btn-setup" size={"large"} onClick={this.incrementProgress}>
              Evening
            </Button>
          </Col>
        </Row>
      </div>;

    const Page2 =
      <div className="container container-setup">
        <h1 style={{ textAlign: "center", color: "white" }}>What is your preferred way of working?</h1>
        <Row type="flex" justify="center">
          <Col className="choice-btn-row-setup" xs={24} lg={12}>
            <Button className="choice-btn-setup" size={"large"} onClick={this.incrementProgress}>
              Long but few sessions 
            </Button>
          </Col>
          <Col className="choice-btn-row-setup" xs={24} lg={12}>
            <Button className="choice-btn-setup" size={"large"} onClick={this.incrementProgress}>
              Short but many sessions
            </Button>
          </Col>
        </Row>
      </div>;

    const pages = [Page0, Page1, Page2];

    return (
      <animated.div style={{ ...this.props.style, minHeight: "100vh" }}>
        <Transition
          native
          config={config.slow}
          items={pages}
          keys={this.state.progress}
          from={{ position: 'absolute', opacity: 0 }}
          enter={{ position: 'absolute', opacity: 1 }}
          leave={{ position: 'absolute', opacity: 0 }}
        >
          {page => style => (
            <animated.div style={{ position: 'absolute', ...style }}>
              {pages[this.state.progress]}
            </animated.div>
          )}
        </Transition>
      </animated.div>
    );
  }
}

