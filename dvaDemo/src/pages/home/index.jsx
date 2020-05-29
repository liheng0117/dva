import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Space, Button, Modal, Form, Input } from 'antd'
import './style.less'

const { confirm } = Modal;

@connect((state) => {
  return {
    listData: state.home.listData,
  };
})
export default class Home extends Component {
  state = {
    visible: false,
    title: "",
    dataInfo: [],
  };
  addClick = () => {
    this.showModal();
    this.setState({
      title: "添加",
    });
  };
  handleCancel = () => {
    this.showModal();
  }
  showModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };
  // 提交 表单
  onFinish = (values) => {
    this.showModal();
    if (this.state.title === "添加") {
      this.props.dispatch({
        // 命名空间/触发的方法名
        type: "home/getAddList",
        payload: values,
      });
    } else {
      this.props.dispatch({
        type: "home/getUpdataList",
        payload: values,
      });
    }
    this.setState({
      dataInfo: [],
    });
  };
  // 删除
  handleDel = (item) => {
    let that = this;
    confirm({
      title: "确定删除吗",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        that.props.dispatch({
          type: "home/getDelList",
          payload: { id: item.id },
        });
      },
    });
  };
  //   编辑功能
  handleUpdata = (item) => {
    this.showModal();
    this.setState({
      dataInfo: item,
      title: "修改",
    });
  };
  columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "地址",
      dataIndex: "msg",
      key: "msg",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => this.handleUpdata(record)}>
            修改
          </Button>
          <Button onClick={() => this.handleDel(record)}>删除</Button>
          <Button type="primary" onClick={this.addClick}>
            添加
          </Button>
        </Space>
      ),
    },
  ];
  componentDidMount() {
    this.props.dispatch({
      // 命名空间/触发的方法名
      type: "home/getDataList",
    });
  }

  render() {
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={this.props.listData}
          pageSize={5}
        />
        <Modal
          title={this.state.title}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose={true}
        >
          <Form
            name="nest-messages"
            onFinish={this.onFinish}
            initialValues={this.state.dataInfo}
          >
            <Form.Item
              name="name"
              label="姓名"
              rules={[{ required: true, message: "请输入姓名" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="age"
              label="年龄"
              rules={[{ required: true, message: "请输入年龄" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="msg"
              label="地址"
              rules={[{ required: true, message: "请输入地址" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 15 }}>
              <Button style={{ marginRight: "30px" }} onClick={this.showModal}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
