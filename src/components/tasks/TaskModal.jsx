import React from 'react';
import { Form, Input, Modal, Button, message } from 'antd';
import moment from 'moment';

import TaskForm from './TaskForm';
import * as tasks from '../../api/tasks/tasks';

export default class CalendarModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonLoading: false,
    }
  }

  handleCancel = e => {
    // Hide the modal
    this.props.onVisibleChange(false);
  }

  saveTaskFormRef = (taskFormRef) => {
    this.taskFormRef = taskFormRef;
  }

  // Handles submit child form
  handleOk = () => {
    const form = this.taskFormRef.props.form;
    const task = this.taskFormRef.props.task;

    this.setState({ buttonLoading: true });
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      if (this.props.mode === "update") {
        tasks.updateTask(task.id, values)
          .then(json => {
            this.setState({ buttonLoading: false });

            if ("error" in json) {
              message.error(json.error);
              return;
            }

            // Refreshes the task list
            this.props.onTaskUpdate();

            // Hides the modal
            this.props.onVisibleChange(false);

            message.success(`Successfully updated task '${task.name}'!`);

            // Clear fields when done
            form.resetFields();
          });
      } else {
        tasks.createTask(values)
          .then(json => {
            this.setState({ buttonLoading: false });

            if ("error" in json) {
              message.error(json.error);
              return;
            }

            // Refreshes the task list
            this.props.onTaskUpdate();

            // Hides the modal
            this.props.onVisibleChange(false);

            message.success(`Successfully created task '${values.name}'!`);

            // Clear fields when done
            form.resetFields();
          });
      }
    });
  }

  handleDelete = task => {
    tasks.deleteTask(task.id)
      .then(json => {
        if ("error" in json) {
          message.error('Internal error, please refresh and try again!');
          return;
        }

        // Refreshes the task list
        this.props.onTaskUpdate();

        // Hides the modal
        this.props.onVisibleChange(false);

        message.success(`Successfully deleted task '${task.name}'!`);
      });
  }

  render() {
    const footer = [
      <Button key="cancel" onClick={this.handleCancel}>Cancel</Button>,
      <Button 
        form="task-form"
        key="submit"
        type="primary"
        onClick={this.handleOk}
      >
        {this.props.mode === "update" ? "Save" : "Create"}
      </Button>,
    ];

    return (
      <Modal
        title={this.props.mode === "create" ? "Create new task" 
            : "Edit task"}
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={footer}
      >
        <TaskForm 
          task={this.props.task}
          mode={this.props.mode}
          wrappedComponentRef={this.saveTaskFormRef}
        />
      </Modal>
    );
  }
}
