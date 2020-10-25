import React from 'react';

class GoogleAuth extends React.Component {

    state = {
        isSignedIn: null
    }
    
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '936998152361-mm04f47424jo0798jgd8o26vv87l84ko.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
            this.auth = window.gapi.auth2.getAuthInstance();
            this.setState({isSignedIn: this.auth.isSignedIn.get()})
            this.auth.isSignedIn.listen(this.onAuthChange);
        })
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get()})
    }

    handleSignIn = () => {
        this.auth.signIn();
    }

    handleSignOut = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
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

export default GoogleAuth;