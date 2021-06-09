import React, { Component } from 'react';
import { Form, Input, Button, Row, Col, Spin, Card, notification } from 'antd';
import { UserContext } from '../contexts/UserContext';
import NotAuthorized from '../errors/NotAuthorized';
import axios from 'axios';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

export default class FormLayout extends Component {
    state = {
        loading: true,
    }

    componentDidUpdate() { //loaded the context
        if (this.state.loading) {
            this.setState({
                loading: false
            })
        }
    }

    render() {
        const { loading } = this.state;

        return (
            <React.Fragment>
                {loading ?
                    <Spin size='large' style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                    />
                    :
                    this.context ?
                        <FormComponent />
                        :
                        <NotAuthorized />
                }
            </React.Fragment>
        )
    }
}

FormLayout.contextType = UserContext; //Use the context

class FormComponent extends Component {
    state = {
        loadingButton1: false,
        loadingButton2: false,
        answer1: null,
        showFollowedIcon: false,
        followed: false,
        showLikedAndRetweetedIcon: false,
        likedAndRetweeted: false
    }

    verifyFollow = async () => {
        this.setState({
            loadingButton1: true
        });

        await axios.get(`http://localhost:3001/validate/isfollowing/${this.context.userName}`, { withCredentials: true })
            .then(res => {
                if (res.data.Is_success && res.data.Is_following) {
                    this.setState({
                        showFollowedIcon: true,
                        followed: true
                    })
                } else {
                    this.setState({
                        showFollowedIcon: true,
                        followed: false
                    })
                }
            })
            .catch(err => console.log(err));

        this.setState({
            loadingButton1: false
        })
    }

    verifyRetweetAndLike = async () => {
        this.setState({
            loadingButton2: true
        });

        await axios.get(`http://localhost:3001/validate/isLikedAndRetweeted/${this.context.userName}`, { withCredentials: true })
            .then(res => {
                if (res.data.Is_success && res.data.Is_retweeted_and_liked) {
                    this.setState({
                        showLikedAndRetweetedIcon: true,
                        likedAndRetweeted: true
                    })
                } else {
                    this.setState({
                        showLikedAndRetweetedIcon: true,
                        likedAndRetweeted: false
                    })
                }
            })
            .catch(err => console.log(err));

        this.setState({
            loadingButton2: false
        })
    }

    followBit = () => {
        axios.post(`http://localhost:3001/validate/follow/:id`,
            { id: this.context.twitterId, target_user_id: "1299932702557138946" },
            { withCredentials: true }
        )
            .then(res => {
                console.log(res.data)
                if (res.data?.Is_success) {
                    notification['success']({
                        message: 'Success',
                        description: 'Done!',
                        style: { backgroundColor: "rgb(212, 255, 226)" },
                        duration: 3.5
                    });
                }
            })
            .catch(err => console.log(err))
    }

    followRay = () => {
        axios.post(`http://localhost:3001/validate/follow/:id`,
            { id: this.context.twitterId, target_user_id: "15830666" },
            { withCredentials: true }
        )
            .then(res => {
                if (res.data?.Is_success) {
                    notification['success']({
                        message: 'Success',
                        description: 'Done!',
                        style: { backgroundColor: "rgb(212, 255, 226)" },
                        duration: 3.5
                    });
                }
            })
            .catch(err => console.log(err))
    }

    retweetAndLike = () => {
        axios.post(`http://localhost:3001/validate/likeAndRetweet/`, {}, { withCredentials: true })
            .then(res => {
                if (res.data?.Is_success) {
                    notification['success']({
                        message: 'Success',
                        description: 'Done!',
                        style: { backgroundColor: "rgb(212, 255, 226)" },
                        duration: 3.5
                    });
                }
            })
            .catch(err => console.log(err))
    }

    onSubmit = () => {
        if (this.state.answer1 && this.state.likedAndRetweeted && this.state.followed) {
            const body = {
                twitterId: this.context.twitterId,
                twitterDisplayName: this.context.displayName,
                metaData: [
                    {
                        question: "What is 10 + 10",
                        answer: this.state.answer1
                    },
                    {
                        question: "isFollowed",
                        answer: true
                    }, {
                        question: "islikedAndRetweeted",
                        answer: true
                    }
                ]
            };

            axios.post('http://localhost:3001/forms/addForm', body, { withCredentials: true })
                .then(res => {
                    if (res.data.is_success) {
                        notification['success']({
                            message: 'Success',
                            description: 'Done!',
                            style: { backgroundColor: "rgb(212, 255, 226)" },
                            duration: 3.5
                        });
                    } else {
                        notification['error']({
                            style: { backgroundColor: "rgb(255, 212, 212)" },
                            message: 'Error',
                            description: "Something is wrong, please try again.",
                            duration: 3.5
                        });
                    }
                })
                .catch(err => console.log(err));

        } else {
            notification['warning']({
                style: { backgroundColor: "rgb(255, 245, 160)" },
                message: 'Warning',
                description: "Please complete and verify all the steps.",
                duration: 3.5
            });
        }
    };

    onFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        const { showFollowedIcon, showLikedAndRetweetedIcon, followed, likedAndRetweeted } = this.state;

        // console.log(this.context.twitterId)

        return (
            <>
                <Row justify='center'>
                    <Col>
                        <Card
                            hoverable
                            style={{
                                width: '600px',
                                marginTop: '10%'
                            }}
                        >
                            <Form
                                requiredMark={false}
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={this.onSubmit}
                                onFinishFailed={this.onFailed}
                                labelAlign='left'
                                colon={false}
                            >
                                <Row>
                                    <Col>
                                        <Form.Item
                                            label="1. Follow Us Here"
                                        >
                                        </Form.Item>
                                    </Col>
                                    {showFollowedIcon && (followed ?
                                        <Col>
                                            <Form.Item>
                                                <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '30px' }} />
                                            </Form.Item>
                                        </Col>
                                        :
                                        <Col>
                                            <Form.Item>
                                                <CloseCircleTwoTone twoToneColor="#eb2f96" style={{ fontSize: '30px' }} />
                                            </Form.Item>
                                        </Col>)
                                    }

                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Item>
                                            <a href={"https://twitter.com/BitDotCountry"} target="_blank">https://twitter.com/BitDotCountry</a>
                                        </Form.Item>
                                    </Col>
                                    <Col>
                                        <Button onClick={this.followBit} style={{ marginLeft: '10px' }} type="primary">
                                            Follow
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Item>
                                            <a href={"https://twitter.com/RayLuCode"} target="_blank">https://twitter.com/RayLuCode</a>
                                        </Form.Item>
                                    </Col>
                                    <Col>
                                        <Button onClick={this.followRay} style={{ marginLeft: '10px' }} type="primary">
                                            Follow
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Item>
                                            <Button
                                                onClick={this.verifyFollow}
                                                loading={this.state.loadingButton1}
                                            >
                                                Verify
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Item
                                            label="2. Retweet and like the post"
                                        >
                                        </Form.Item>
                                    </Col>
                                    {showLikedAndRetweetedIcon && (likedAndRetweeted ?
                                        <Col>
                                            <Form.Item>
                                                <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: '30px' }} />
                                            </Form.Item>
                                        </Col>
                                        :
                                        <Col>
                                            <Form.Item>
                                                <CloseCircleTwoTone twoToneColor="#eb2f96" style={{ fontSize: '30px' }} />
                                            </Form.Item>
                                        </Col>)
                                    }
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Item>
                                            <a
                                                href={"https://twitter.com/BitDotCountry/status/1380385038320115715?s=20"}
                                                target="_blank"
                                            >
                                                https://twitter.com/BitDotCountry/status/1380385038320115715?s=20
                                            </a>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button onClick={this.retweetAndLike} style={{ marginRight: '20px' }} type="primary">
                                            Do it now!
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Form.Item>
                                            <Button
                                                onClick={this.verifyRetweetAndLike}
                                                loading={this.state.loadingButton2}
                                            >
                                                Verify
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Form.Item
                                    label="3. What is 10 + 10?"
                                    style={{ marginBottom: '0' }}
                                    colon={false}
                                >
                                </Form.Item>
                                <Form.Item
                                    name="Answer_1"
                                    rules={
                                        [
                                            { required: true, message: 'Please enter your response!' },
                                            { whitespace: true, message: "Please enter your response!" },
                                            { pattern: new RegExp('20'), message: "The answer is wrong!" }
                                        ]
                                    }
                                >
                                    <Input onChange={(e) => this.setState({ answer1: e.target.value })} />
                                </Form.Item>
                                <br />
                                <br />
                                <Row>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </>
        )
    }
}

FormComponent.contextType = UserContext; //Use the context