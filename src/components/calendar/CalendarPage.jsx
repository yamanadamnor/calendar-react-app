import React from 'react';
import { Calendar, Badge, Button, Layout, Menu, Icon } from 'antd';
import { animated } from 'react-spring/renderprops';
import moment from 'moment';
import Media from 'react-media';

import CalendarModal from './CalendarModal';
import * as calendar from '../../api/calendar/calendar';
import * as account from '../../api/account/account';
import history from '../history'; 
import './CalendarPage.css';

export default class CalendarPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: moment(),
      modalVisible: false,
      modalMode: "", // should be either "update", "create" or "list", could prob use enum
      events: [],
      menuCollapsed: true,
    }
  }

  componentDidMount() {
    document.title = "PlannerOwO | Calendar"
    const d = new Date(), y = d.getFullYear(), m = d.getMonth();
    const from = new Date(y, m, 1);
    const to = new Date(y, m +1, 1);

    calendar.getAllEventsInInterval(from, to)
      .then(res => {
        // Empty events if the result is empty
        if (res === null) {
          return;
        }

        this.setState({
          events: convertEvents(res),
        });
      });
  }

  handleSelect = (selectedDate) => {
    this.setState({
      modalVisible: true,
      modalMode: "list",
    });
  }

  handleCreateClick = e => {
    this.setState({
      modalVisible: true,
      modalMode: "create",
    });
    e.currentTarget.blur();
  }

  // called when changing months/mode
  handlePanelChange = (date, mode) => {
    const d = date.toDate(), y = d.getFullYear(), m = d.getMonth();
    const from = new Date(y, m, 1);
    const to = new Date(y, m +1, 1);

    // all events between the first day and the last day of the
    // selected month
    calendar.getAllEventsInInterval(from, to)
      .then(res => {
        // Empty events if the result is empty
        if (res === null) {
          this.setState({
            events: [],
          });
          return;
        }

        this.setState({
          events: convertEvents(res),
        });
      });
  }

  // Refresh the calendar when an event is updated in a child modal/form
  handleEventUpdate = () => {
    const d = this.state.selectedDate.toDate(), y = d.getFullYear(), m = d.getMonth();
    const from = new Date(y, m, 1);
    const to = new Date(y, m +1, 1);

    // all events between the first day and the last day of the
    // selected month
    calendar.getAllEventsInInterval(from, to)
      .then(res => {
        // Empty events if the result is empty
        if (res === null) {
          this.setState({
            events: [],
          });
          return;
        }

        this.setState({
          events: convertEvents(res),
        });
      });
  }

  handleVisibleModalChange = (visible) => {
    this.setState({ modalVisible: visible })
  }

  handleChange = (date) => {
    this.setState({ selectedDate: date });
  }

  // TODO: calendar currently wont render days outside the current month
  // could change but low priority
  dateCellRender = (date) => {
    // Check if date is in the current month
    if (date.month() !== this.state.selectedDate.month()) {
      return;
    }

    const events = this.state.events[date.date()];

    // Check if events are fetched
    if (!events || !events.length) {
      return;
    }

    return (
      <ul className="events-calendar">
        {
          events.map(event => (
            <li key={event.name}>
              {event.task_id !== 0 ?
                <Badge color="orange" text={event.name} /> :
                <Badge color="purple" text={event.name} /> }
            </li>
          ))
        }
      </ul>
    );
  }

  handleModalModeChange = mode => {
    this.setState({ modalMode: mode });
  }

  handleMenuVisibility = () => {
    this.setState({
      menuCollapsed: !this.state.menuCollapsed,
    })
  }

  handleMenuBreakpoint = broken => {
    this.setState({
      menuCollapsed: broken,
    })
  }

  handleMenuClick = e => {
    switch(e.key) {
      case "month":
        console.log("month");
        break;
      case "day":
        console.log("day");
        break;
      case "tasks":
        history.push("/tasks");
        break;
      case "settings":
        console.log("settings");
        break;
      case "logout":
        account.logoutAccount()
          .then(this.props.onLogout());
        break;
    }
  }

  render() {
    const { events, selectedDate, menuCollapsed, modalVisible, modalMode } = this.state;
    const { Header, Footer, Sider, Content } = Layout;
    return (
      <animated.div style={this.props.style}>
        <Layout style={{ minHeight: "100vh" }}>
          <Media query="(max-width: 992px)">
            <Header className="header-calendar" breakpoint="lg">
              <Button
                icon="align-left"
                size="large"
                ghost="true"
                onClick={this.handleMenuVisibility}
                className="menu-toggle-btn"
              />
            </Header>
          </Media>
          <Layout>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              collapsed={menuCollapsed}
              onBreakpoint={this.handleMenuBreakpoint}
              theme="dark"
              trigger={null}
            >
              <Menu 
                theme="dark" 
                mode="inline" 
                defaultSelectedKeys={['month']}
                onClick={this.handleMenuClick}
              >
                <Menu.Item key="month">
                  <Icon type="calendar" />
                  <span className="nav-text">Month</span>
                </Menu.Item>
                <Menu.Item key="day">
                  <Icon type="calendar" />
                  <span className="nav-text">Day</span>
                </Menu.Item>
                <Menu.Item key="tasks">
                  <Icon type="ordered-list" />
                  <span className="nav-text">Tasks</span>
                </Menu.Item>
                <Menu.Item key="settings">
                  <Icon type="setting" />
                  <span className="nav-text">Settings</span>
                </Menu.Item>
                <Menu.Item key="logout">
                  <Icon type="logout" />
                  <span className="nav-text">Log out</span>
                </Menu.Item>
              </Menu>             
            </Sider>
            <Content>
              <Calendar
                dateCellRender={this.dateCellRender}
                value={selectedDate}
                onSelect={this.handleSelect}
                onPanelChange={this.handlePanelChange}
                onChange={this.handleChange}
              />
            </Content>
          </Layout>
          <Footer style={{ textAlign: "center" }}>
            PlannerOwO
          </Footer>
        </Layout>
        <CalendarModal 
          date={selectedDate}
          events={events[selectedDate.date()]}
          visible={modalVisible}
          mode={modalMode}
          onModeChange={this.handleModalModeChange}
          onVisibleChange={this.handleVisibleModalChange}
          onEventUpdate={this.handleEventUpdate}
        />
        <Button
          type="primary"
          shape="circle"
          icon="plus"
          size="large"
          className="create-event-btn-calendar"
          onClick={this.handleCreateClick}
        />
      </animated.div>
    );
  }
}

function convertEvents(events) {
  let newEvents = {};
  for (var i = 1; i <= 31; i++) {
    newEvents[i] = [];
  }

  events.map(event => {
    const dateObj = new Date(event.starts_at);
    const momentObj = moment(dateObj);
    newEvents[momentObj.date()].push(event);
  });

  return newEvents;
}
