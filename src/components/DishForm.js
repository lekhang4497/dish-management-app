import React, {Component} from 'react';
import {Form, Input, Button, InputNumber} from 'antd';

const FormItem = Form.Item;

class DishForm extends Component {

    constructor(props, context) {
        super(props, context);
        this.onSubmit = props.onSubmit;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.onSubmit(values);
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 20,
                    offset: 4,
                },
            },
        };
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="Name"
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: "Please input the dish's name",
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Type"
                    >
                        {getFieldDecorator('type', {
                            rules: [{
                                required: true, message: "Please input the dish's type",
                            }],
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Price"
                    >
                        {getFieldDecorator('price', {
                            initialValue: 50000,
                            rules: [{
                                type: 'number', message: 'This has to be a number',
                            }, {
                                required: true, message: "Please input the dish's price",
                            }],
                        })(
                            <InputNumber
                                style={{width: "auto"}}
                                min={0}
                                step={1000}/>
                        )}
                        <span className="ant-form-text"> VND</span>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Confirm</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const WrappedDishForm = Form.create()(DishForm);

export default WrappedDishForm;