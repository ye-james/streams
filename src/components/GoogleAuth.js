import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../redux/actions';

class GoogleAuth extends React.Component {
    
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '936998152361-mm04f47424jo0798jgd8o26vv87l84ko.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
            this.auth.isSignedIn.listen(this.onAuthChange);
        })
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    handleSignIn = () => {
        this.auth.signIn();
    }

    handleSignOut = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (<button className="ui red google button" onClick={this.handleSignOut}><i className="google icon"/>Sign Out</button>)
        }
        else {
            return (<button className="ui red google button" onClick={this.handleSignIn}><i className="google icon"/>Sign In with Google</button>)
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}


const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth) ;