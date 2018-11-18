import {Table, Input, InputNumber, Popconfirm, Form, Divider, Button} from 'antd';
import React from "react";

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber/>;
        }
        return <Input/>;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const {getFieldDecorator} = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{margin: 0}}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        // Implement these functions in classes which use this component
        this.fetchData = props.fetchData;
        this.addItem = props.addItem;
        this.deleteItem = props.deleteItem;
        this.editItem = props.editItem;
        this.onAddBtnClicked = props.onAddBtnClicked;
        //
        let data = this.fetchData();
        this.state = {data, editingKey: ''};
        this.columns = [
            ...props.columns,
            {
                title: 'operation',
                dataIndex: 'Operation',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                  <EditableContext.Consumer>
                    {form => (
                        <a
                            href="javascript:;"
                            onClick={() => this.save(form, record.key)}
                            style={{marginRight: 8}}
                        >
                            Save
                        </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                      title="Sure to cancel?"
                      onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                            ) : (
                                <div>
                                    <a onClick={() => this.edit(record.key)}>Edit</a>
                                    <Divider type="vertical"/>
                                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                                        <a href="javascript:;">Delete</a>
                                    </Popconfirm>
                                </div>
                            )}
                        </div>
                    );
                },
            },
        ];
    }

    isEditing = (record) => {
        return record.key === this.state.editingKey;
    };

    edit(key) {
        this.setState({editingKey: key});
    }

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                this.editItem(item, row);
                // newData.splice(index, 1, {
                //     ...item,
                //     ...row,
                // });
                this.setState({editingKey: ''});
            } else {
                this.addItem(row);
                // newData.push(row);
                this.setState({editingKey: ''});
            }
        });
    }

    cancel = () => {
        this.setState({editingKey: ''});
    };

    handleDelete = (key) => {
        // const dataSource = [...this.state.data];
        // this.setState({data: dataSource.filter(item => item.key !== key)});
        this.deleteItem(key);
    };

    handleAdd = () => {
        const {data} = this.state;
        const count = data.length;
        // const newData = {
        //     key: count,
        //     name: `Edward King ${count}`,
        //     age: 32,
        //     address: `London, Park Lane no. ${count}`,
        // };
        const newData = this.getDefaultItem(count);
        this.setState({
            data: [...data, newData],
            count: count + 1,
        });
    };

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <div>
                <Button onClick={this.onAddBtnClicked} type="primary" style={{marginBottom: 16}}>
                    Add a row
                </Button>
                <Table
                    components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                />
            </div>
        );
    }
}

export default EditableTable;