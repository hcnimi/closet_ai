import React from 'react'
import {Form, Grid, Label, Segment} from 'semantic-ui-react';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {updateAuthenticated, updateUserInfo} from '../actions/userInfoActions';
import {connect} from 'react-redux';
import Axios from 'axios';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  redirectToHome() {
    this.props.history.push('/home');
  }

  handleSubmit(e) {
    let email = e.target.email.value;
    let password = e.target.password.value;

    Axios.post('/login', {
      email: email,
      password: password
    })
      .then(response => {
        this.props.actions.updateAuthenticated(true);
        this.props.actions.updateUserInfo(response.data);

        this.redirectToHome();
      })
      .catch(error => {
        alert('There was an error logging in. Please try again.');
      });
  }

  render() {
    return (
      <Grid verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form
            size="small"
            ref={ ref => this.form = ref }
            onSubmit={ this.handleSubmit }
          >
            <Form.Input name="email"
                        fluid
                        label="Email"
                        placeholder="Email" required
                        validations="isEmail"
                        errorLabel={ <Label color="red" pointing/> }
                        validationErrors={{
                          isEmail: 'Not a valid email',
                          isDefaultRequiredValue: 'Email is required'
                        }}
            />
            <Form.Input name="password"
                        fluid
                        label="password"
                        type="password"
                        placeholder="password" required
                        errorLabel={ <Label color="red" pointing/> }
                        validationErrors={{
                          isDefaultRequiredValue: 'Password is required'
                        }}
            />
            <Form.Button content='Login' color='green' />
          </Form>
          <Segment>
            Don't have an account? <Link className='signup' to='/signup'>Sign Up</Link>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  return ({
    userInfo: state.userInfo.userInfo,
    authenticated: state.userInfo.authenticated
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
      updateUserInfo,
      updateAuthenticated
    },
    dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
