import React, { Component } from 'react';
import { Button, Card, Divider, Row, Col, Typography } from 'antd';
import {
    TwitterCircleFilled
} from '@ant-design/icons';

import { Redirect } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const { Title } = Typography;

export default class Home extends Component {
   
    twitterLogin = () => {
        window.open("http://localhost:3001/login/twitter", "_self");
    }

    render() {
        return (
            <React.Fragment>
                {this.context ?
                    <Redirect to="/form" />
                    :
                    <>
                        <Row>
                            <Col span={24} style={{ textAlign: 'center', marginTop: '10%' }}>
                                <Title style={{ fontSize: '450%' }}>Welcome to Dog</Title>
                            </Col>
                        </Row>
                        <br />
                        <br />
                        <br />
                        <Row justify='center'>
                            <Col>
                                <Card
                                    style={{
                                        width: 300,
                                        textAlign: "center",
                                    }}
                                >
                                    <Title level={2}>Login</Title>
                                    <Divider />
                                    <Button
                                        block
                                        size="large"
                                        type='primary'
                                        onClick={this.twitterLogin}
                                    >
                                        <TwitterCircleFilled />Login with Twitter
                            </Button>
                                </Card>
                            </Col>
                        </Row>
                    </>
                }
            </React.Fragment>
        )
    }
}

Home.contextType = UserContext;