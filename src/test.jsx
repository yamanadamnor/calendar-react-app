      <Form id="event-form">
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            initialValue: this.props.event.name,
          })(
            <Input type="text" />
          )}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            initialValue: this.props.event.description,
          })(
            <Input.TextArea
              rows={4}
            />
          )}
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item>
              { /* TODO: disable dates/time before current date/time */ }
              {getFieldDecorator('starts_at_date', {
                initialValue: this.createMoment(this.props.event.starts_at),
              })(
                <DatePicker
                  onChange={this.onChange}
                  onOk={this.onOk}
                />
            )}
            </Form.Item>
          </Col>
          <Col span={8} offset={2}>
            <Form.Item>
              {getFieldDecorator('starts_at_time', {
                initialValue: this.createMoment(this.props.event.starts_at),
              })(
                <TimePicker
                  use12Hours
                  format={'h:mm A'}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          { /* TODO: disable dates/time before current date/time */ }
          <Col span={12}>
            <Form.Item>
              {getFieldDecorator('ends_at_date', {
                initialValue: this.createMoment(this.props.event.ends_at),
              })(
                <DatePicker
                  onChange={this.onChange}
                  onOk={this.onOk}
                />
              )}
            </Form.Item>
          </Col>
          <Col span={8} offset={2}>
            <Form.Item>
              {getFieldDecorator('ends_at_time', {
                initialValue: this.createMoment(this.props.event.ends_at),
              })(
                <TimePicker
                  use12Hours
                  format={'h:mm A'}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
