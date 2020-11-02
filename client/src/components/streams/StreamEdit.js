import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../redux/actions'
import StreamForm from './StreamForm'


class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onFormSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues)
    }

    render() {
        const stream = this.props.stream;

        if (!this.props.stream) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>Edit Stream:</h3>
                <StreamForm
                    initialValues={_.pick(stream, 'title', 'description')}
                    onSubmit={this.onFormSubmit}
                />
          </div>  
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);