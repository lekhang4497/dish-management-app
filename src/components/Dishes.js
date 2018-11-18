import React, {Component} from 'react';
import EditableTable from "./EditableTable";
import {Modal} from "antd";
import DishForm from "./DishForm";

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
    });
}

class Dishes extends Component {

    constructor(props, context) {
        super(props, context);
        this.columns = [{
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        }, {
            title: 'age',
            dataIndex: 'age',
            width: '15%',
            editable: true,
        }, {
            title: 'address',
            dataIndex: 'address',
            width: '40%',
            editable: true,
        }];
        this.state = {
            addModal: {
                visible: false
            }
        }
    }

    fetchData = () => {
        return data;
    };

    editItem = (item, newItem) => {
        console.log(item, newItem);
    };

    deleteItem = (key) => {
        console.log(key);
    };

    addItem = (item) => {
        console.log(item);
    };

    onAddBtnClicked = () => {
        this.openAddModal();
    };

    openAddModal = () => {
        this.setState({
            addModal: {...this.state.addModal, visible: true}
        })
    };

    closeAddModal = () => {
        this.setState({
            addModal: {...this.state.addModal, visible: false}
        })
    };

    render() {
        return (
            <div>
                <EditableTable
                    fetchData={this.fetchData}
                    editItem={this.editItem}
                    deleteItem={this.deleteItem}
                    addItem={this.addItem}
                    onAddBtnClicked={this.onAddBtnClicked}
                    columns={this.columns}/>
                <Modal
                    footer={null}
                    title="Basic Modal"
                    visible={this.state.addModal.visible}
                    onOk={this.handleOk}
                    onCancel={this.closeAddModal}
                >
                    <DishForm onSubmit={this.addItem}/>
                </Modal>
            </div>
        );
    }
}

export default Dishes;