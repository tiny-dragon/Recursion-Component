import React, { Component } from 'react';
import * as employeeActions from 'store/modules/employee';
import { connect } from 'react-redux';
import * as SampleApi from 'helper/sampleApi';
import { Redirect } from 'react-router'

class AxiosTest extends Component {
    state = {
        redirectToEditPage : false
    }

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            employee_name: props.employee_name,
            employee_salary: props.employee_salary,
            employee_age : props.employee_age,
            profile_image : props.profile_image,
            employee_list : props.employee_list,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return { 
            id: nextProps.id,
            employee_name: nextProps.employee_name,
            employee_salary: nextProps.employee_salary,
            employee_age : nextProps.employee_age,
            profile_image : nextProps.profile_image,
            employee_list : nextProps.employee_list
        };
    }

    componentDidMount(){
        SampleApi.getEmployeeList((err, result) => {
            if (err) {
                console.log(err);
            } else {
                this.props.onReloadList(result);
            }
        });
    }

    handleUpdate = (id) => {
        console.log('Update : ', id)
        this.props.onGetInfo({id: id, employee_name:'', employee_age:'', employee_salary:''})
        this.setState({redirectToEditPage: true});
    }

    handleDelete = (id) => {
        console.log('Delete : ', id)
        SampleApi.deleteEmployee(id, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                this.props.onDeleteItem(id)
            }
        });
    }

    render() {
        const { id, redirectToEditPage } = this.state;
        if (redirectToEditPage) {
            const url = '/employee/' + id;
            return <Redirect to={url} />;
        }
        const { employee_list } = this.state;
        const list = employee_list.map(
            info => (
                <tr key={info.id}>
                    <td>{info.id}</td>
                    <td>{info.employee_name}</td>
                    <td>{info.employee_salary}</td>
                    <td>{info.employee_age}</td>
                    <td>
                        <button onClick={() => this.handleUpdate(info.id)}>Update</button>
                        <button onClick={() => this.handleDelete(info.id)} className="ml-1">Delete</button>
                    </td>
                </tr>
            )
        );
        return (
            <div className="container text-right">
                <button onClick={() => this.handleUpdate(0)} className="btn btn-success mb-1">+ Add New</button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Salary</td>
                            <td>Age</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    id: state.employee.id,
    employee_name: state.employee.employee_name,
    employee_salary: state.employee.employee_salary,
    employee_age : state.employee.employee_age,
    profile_image : state.employee.profile_image,
    employee_list : state.employee.employee_list
});

const mapDispatchToProps = (dispatch) => ({
    onGetInfo: (item) => dispatch(employeeActions.set_info(item)),
    onDeleteItem: (item) => dispatch(employeeActions.delete_item(item)),
    onReloadList: (item) => dispatch(employeeActions.reload_list(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(AxiosTest);