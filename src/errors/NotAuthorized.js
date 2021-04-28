import React, { Component } from 'react';
import { Result, Button, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default class NotAuthorized extends Component {

    render() {
        return (
            <Result
                style={{
                    width: 400,
                    textAlign: "center",

                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                status="error"
                title="Not Authorized!"
                subTitle="Please login with a twitter account in order to view this page."
                extra={
                    <Button 
                        type='primary'
                        onClick={() => window.open("http://localhost:3000/bitcountry/learnandearn", "_self")}
                    >
                        <ArrowLeftOutlined />Go back
                    </Button>
                }
            >
            </Result>
        )
    }
}