import React from 'react';
import { Button, Layout, List, message, Progress } from 'antd';
import { animated } from 'react-spring/renderprops';
import moment from 'moment'; 

import DeletePopover from '../calendar/DeletePopover';
import TaskModal from './TaskModal'
import * as tasks from '../../api/tasks/tasks';
import * as calendar from '../../api/calendar/calendar';
import history from '../history'; 
import './TaskPage.css';

export default class TaskPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalMode: "", // should be either "update" or "create", could prob use enum
      editingTask: moment(),
      tasks: [],
      progress: [],
    }
  }

  componentDidMount() {
    document.title = "PlannerOwO | Tasks"
    tasks.getAllTasks()
      .then(tasks => {
        // Empty tasks if the result is empty
        if (tasks === null) {
          return;
        }

        this.setState({ tasks }, () => {
          // Calculate task progress when all tasks are fetched
          this.determineTaskProgress(this.state.tasks);
        });
      });
  }

  determineTaskProgress = (tasks) => {
    tasks.map(task => {
      calendar.getAllEventsByTaskId(task.id)
        .then(events => {
          if (events === null) {
            return;
          }

          let completed = 0;
          events.forEach(event => {
            if (moment(event.ends_at).valueOf() < moment().valueOf()) {
              completed++;
            }
          });

          this.setState(prevState => ({ 
            progress: {
              ...prevState.progress,
              [task.id]: Math.round(completed/events.length * 100),
            }
          }));
        });
    });
  }

  handleCreateClick = e => {
    this.setState({
      modalVisible: true,
      modalMode: "create",
    });
    e.currentTarget.blur();
  }

  handleEditClick = task => {
    // Change modal mode to editing 
    this.setState({
      modalMode: "update",
      modalVisible: true,
      editingTask: task
    })
  }

  handleDelete = task => {
    tasks.deleteTask(task.id)
      .then(json => {
        if ("error" in json) {
          message.error('Internal error, please refresh and try again!');
          return;
        }

        // Refresh the task list
        this.fetchTasks();

        message.success(`Successfully deleted task '${task.name}'!`);
        
      });
  }

  fetchTasks = () => {
    tasks.getAllTasks()
      .then(tasks => {
        // Empty tasks if the result is empty
        if (tasks === null) {
          this.setState({
            tasks: [],
          });
          return;
        }
        this.setState({ tasks });
      });
  } 

  handleVisibleModalChange = (visible) => {
    this.setState({ modalVisible: visible })
  }

  render() {
    const { Header, Content } = Layout;
    const { editingTask, modalVisible, modalMode, tasks, progress } = this.state;

    return (
      <animated.div style={{...this.props.style, width: "100%" }}>
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
              itemLayout="vertical"
              dataSource={tasks} 
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
                  <Progress 
                    strokeColor={{ from: '#9F72E8', to: '#978AFF' }}
                    percent={progress[task.id]} />
                </List.Item>
              )}
            />
          </Content>
        </Layout>
        <TaskModal
          task={editingTask}
          visible={modalVisible}
          mode={modalMode}
          onVisibleChange={this.handleVisibleModalChange}
          onTaskUpdate={this.fetchTasks}
        />
        <Button
          type="primary"
          shape="circle"
          icon="plus"
          size="large"
          className="create-task-btn-tasks"
          onClick={this.handleCreateClick}
        />
      </animated.div>
    );
  }
}
