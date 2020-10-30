import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {createStream} from '../../redux/actions';

class StreamCreate extends React.Component {

    renderError({error, touched}) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {

        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    }

    onFormSubmit = (formValues) => {
        this.props.createStream(formValues);
    }   

    render() {
        console.log(this.props);
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                <Field name="title" label="Enter Title" component={this.renderInput}/>
                <Field name="description" label="Enter Description" component={this.renderInput} />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.title) {
        //only ran if user did not enter a title
        errors.title = 'There must be a title'
    }

        if (!formValues.description) {
        //only ran if user did not enter a dedscription
        errors.description = 'There must be a description'
    }
    return errors;
}

const formWrapped =  reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);

export default connect(null, {createStream})(formWrapped)