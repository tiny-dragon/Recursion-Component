import React, { Component } from 'react';
import * as employeeActions from 'store/modules/employee';
import { connect } from 'react-redux';
import * as SampleApi from 'helper/sampleApi';
import { Redirect } from 'react-router'

class AxiosTest extends Component {
    state = {
        redirectToList: false
    }

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            employee_name: props.employee_name,
            employee_salary: props.employee_salary,
            employee_age : props.employee_age,
            profile_image : props.profile_image,
            employee_list : props.employee_list
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
        const { id } = this.state;
        SampleApi.getEmployeeById(id, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                this.props.onGetInfo(result);
            }
        });
    }

    handleSave = () => {
        this.props.onGetInfo({id: 0})
        this.setState({redirectToList: true});
    }

    handleChange = (e) => {
        this.props.onGetInfo({[e.target.name]: e.target.value})
    }

    handleCancel = () => {
        this.props.onGetInfo({id: 0})
        this.setState({redirectToList: true});
    }

    render() {
        const { redirectToList } = this.state;
        if (redirectToList) {
            return <Redirect to='/employee' />;
        }

        return (
            <div style={{marginTop: 50}}>
                <h3>Edit Employee</h3>
                <div className="form-group">
                    <label>ID:  </label>
                    <input type="text" value={this.state.id} readOnly className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Name:  </label>
                    <input type="text" value={this.state.employee_name} onChange={this.handleChange} name="employee_name" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Salary: </label>
                    <input type="text" value={this.state.employee_salary} onChange={this.handleChange} name="employee_salary" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Age: </label>
                    <input type="text" value={this.state.employee_age} onChange={this.handleChange} name="employee_age" className="form-control"/>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary">Save</button>
                    <button onClick={this.handleCancel} className="btn btn-danger ml-2">Cancel</button>
                </div>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(AxiosTest);