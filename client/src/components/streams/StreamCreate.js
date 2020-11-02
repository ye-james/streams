import React from 'react'
import { connect } from 'react-redux';
import { createStream } from '../../redux/actions';
import StreamForm from './StreamForm'

class StreamCreate extends React.Component {

    onFormSubmit = (formValues) => {
        this.props.createStream(formValues);
    }   

    render() {
        return (
            <div>
                <h3>Create a stream!</h3>
                <StreamForm onSubmit={this.onFormSubmit}/>
            </div>

        )
    }
}




export default connect(null, {createStream})(StreamCreate)