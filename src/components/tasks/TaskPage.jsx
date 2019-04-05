import React from 'react';
import { Button, Layout, Menu, Icon, List } from 'antd';

import './TaskPage.css';
import DeletePopover from '../calendar/DeletePopover';
import * as tasks from '../../api/tasks/tasks';
import history from '../history'; 

export default class TaskPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalMode: "", // should be either "update" or "create", could prob use enum
      tasks: [],
    }
  }

  componentDidMount() {
    tasks.getAllTasks()
      .then(res => {
        this.setState({ tasks: res })
      });
    console.log(this.state.tasks);
  }

  render() {
    const { Header, Content } = Layout;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header className="header-tasks">
          <Button 
            className="back-btn"
            icon="arrow-left"
            size="large"
            ghost="true"
            onClick={() => history.goBack()}
          />
          <span className="layout-title">Tasks</span>
        </Header>
        <Content style={{ padding: "1em" }}>
          <List
            itemLayout="horizontal"
            dataSource={this.state.tasks} 
            renderItem={task => (
              <List.Item
                actions={[
                  <Button 
                    type="primary"
                    shape="circle"
                    icon="edit"
                    onClick={() => this.handleEditClick(task)}
                  />,
                  <DeletePopover 
                    onDelete={this.handleDelete}
                    item={task}
                  />
                ]}
              >
                <List.Item.Meta
                  title={task.name}
                  description={task.description}
                />
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    );
  }
}
