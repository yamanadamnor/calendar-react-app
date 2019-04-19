import React from 'react';
import { Spin, Select, Layout, Button }  from 'antd';
import { animated } from 'react-spring/renderprops';

import history from '../history'; 
import * as account from '../../api/account/account';
import './SettingsPage.css';

export default class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {},
    }
  }

  componentDidMount() {
    document.title = "PlannerOwO | Settings";
    account.getAllSettings()
      .then(settings => {
        if (settings === null) {
          return;
        }
        this.setState({ settings });
      });
  }

  handleSettingChange = (selected, key) => {
    let setting = { "setting": selected }
    account.updateSetting(key, setting)
      .then(res => {
        console.log(res);
      });
  }

  render() {
    const { Header, Content } = Layout;
    const { settings } = this.state;
    const Option = Select.Option;

    return (
      <animated.div style={{...this.props.style, width: "100%" }}>
        <Layout style={{ minHeight: "100vh" }}>
          <Header className="header-settings">
            <Button 
              className="back-btn"
              icon="arrow-left"
              size="large"
              ghost="true"
              onClick={e => { history.goBack(); e.currentTarget.blur() }}
            />
            <span className="layout-title">Settings</span>
          </Header>
          <Content style={{ padding: "1em" }}>
            {Object.keys(settings).length === 0 ?
              <Spin style={{ position: 'absolute', left: '50%', top: '50%'}} /> :
              <div>
                <div style={{ marginBottom: "1em" }}>
                  <h4 className="setting-title">Preferred working time</h4>
                  <Select
                    defaultValue={settings.preferred_time}
                    style={{ width: 200 }}
                    onSelect={selected => this.handleSettingChange(selected, "preferred_time")}>
                    <Option value="morning">Morning</Option>
                    <Option value="daytime">Daytime</Option>
                    <Option value="afternoon">Afternoon</Option>
                    <Option value="evening">Evening</Option>
                  </Select>
                </div>
                <div>
                  <h4 className="setting-title">Preferred event length</h4>
                  <Select
                    defaultValue={settings.preferred_length}
                    style={{ width: 200 }}
                    key="preferred_length"
                    onSelect={selected => this.handleSettingChange(selected, "preferred_length")}>
                    <Option value="short">Short, but many sessions</Option>
                    <Option value="long">Long, but few sessions</Option>
                  </Select>
                </div>
              </div>
            }
          </Content>
        </Layout>      
      </animated.div>
    );
  }
}