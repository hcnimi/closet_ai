import React from 'react';
import {withRouter} from 'react-router-dom';
import {Container, Label} from 'semantic-ui-react';
import {Form} from 'formsy-semantic-ui-react';
import {updateUserInfo, updateAuthenticated} from '../actions/userInfoActions.js';
import {bindActionCreators} from 'redux';
import Axios from 'axios';
import {connect} from 'react-redux';

export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  redirectToLogin() {
    this.props.history.push('/login');
  };

  handleSubmit(formData) {
    Axios.post('/signup', formData)
      .then(response => {
        this.props.actions.updateUserInfo(response);
        this.redirectToLogin();
      })
      .catch(error => {
        alert(error);
      });
  }

  render () {
    const options = [
      { key: 'f', text: 'Female', value: 'Female' },
      { key: 'm', text: 'Male', value: 'Male' },
      { key: 'b', text: 'Both', value: 'Both' }
    ];

    return (
      <Container fluid={true}>
        <Form
          size="small"
          ref={ ref => this.form = ref }
          onValidSubmit={this.handleSubmit}
        >
          <Form.Group widths={"equal"}>
            <Form.Input name="firstName"
                        fluid
                        label="First Name"
                        placeholder="First Name" required
                        validations="isWords"
                        errorLabel={ <Label color="red" pointing/> }
                        validationErrors={{
                          isWords: 'No numbers or special characters allowed',
                          isDefaultRequiredValue: 'First Name is required'
                        }}
            />
            <Form.Input name="lastName"
                        fluid
                        label="Last Name"
                        placeholder="Last Name" required
                        validations="isWords"
                        errorLabel={ <Label color="red" pointing/> }
                        validationErrors={{
                          isWords: 'No numbers or special characters allowed',
                          isDefaultRequiredValue: 'Last Name is required'
                        }}
            />
          </Form.Group>
          <Form.Group widths={"equal"}>
            <Form.Input name="email"
                        fluid
                        instantValidation
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
                        instantValidation
                        label="password"
                        type="password"
                        placeholder="password" required
                        errorLabel={ <Label color="red" pointing/> }
                        validations="minLength:3"
                        validationErrors={{
                          minLength: 'Minimin of 8 characters',
                          isDefaultRequiredValue: 'Password is Required',
                        }}
            />
          </Form.Group>
          <Form.Group widths={"equal"}>
            <Form.Input name="birthDate"
                        type="date"
                        fluid
                        label="Birth date"
                        placeholder="YYYY-MM-DD" required
                        errorLabel={ <Label color="red" pointing/> }
                        validationErrors={{
                          isDefaultRequiredValue: 'Birth date is required'
                        }}
            />
            <Form.Select name="gender"
                         fluid
                         label="Clothing Gender Preference"
                         options={ options }
                         placeholder="Clothing Gender" required
                         errorLabel={ <Label color="red" pointing/> }
                         validationErrors={{
                           isDefaultRequiredValue: 'Gender is required'
                         }}
            />
            <Form.Input name="zip"
                        fluid
                        label="Home Zip"
                        placeholder="Home Zip" required
                        errorLabel={ <Label color="red" pointing/> }
                        validationErrors={{
                          isDefaultRequiredValue: 'Home zip code is required to make location-based recommendations'
                        }}
            />
            <Form.Input name="workZip"
                        fluid
                        label="Work Zip"
                        placeholder="Work Zip" required
                        errorLabel={ <Label color="red" pointing/> }
                        validationErrors={{
                          isDefaultRequiredValue: 'Work zip code is required to make location-based recommendations'
                        }}
            />
          </Form.Group>
          <Form.Checkbox
            name="terms"
            label="I agree to the Terms and Conditions"
          />
          <Form.Group>
            <Form.Button content="Submit" color="green" onClick={this.props.close}/>
          </Form.Group>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo.userInfo,
  authenticated: state.userInfo.authenticated
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({updateAuthenticated, updateUserInfo}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
