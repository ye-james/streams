import React from 'react'
import { connect } from 'react-redux';
import { fetchStreams } from '../../redux/actions'
import { Link } from 'react-router-dom'
import streamReducer from '../../redux/reducers/streamReducer';

class StreamList extends React.Component  {

    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link className="ui button primary" to={`/streams/edit/${stream.id}`}>Edit</Link>
                    <Link className="ui button negative" to="/">Delete</Link>
                </div>
            )
        }
    }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {stream.title}
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        })
    }

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign:'right'}}>
                    <Link to="/streams/new">Create Stream</Link>
                </div>
            )
        }
    }


    render() {
        return (
            <div>
                <h2>Streams </h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        );
    }

}

const mapStateToprops = state => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToprops, { fetchStreams })(StreamList);