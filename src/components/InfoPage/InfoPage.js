import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import '../InfoPage/InfoPage.css';
//Nav is the navigation bar
import Nav from '../../components/Nav/Nav';
//Reducers
import { USER_ACTIONS } from '../../redux/actions/userActions';
import swal from 'sweetalert';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const mapStateToProps = state => ({
  user: state.user,
}); //end of mapStateToProps

class InfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { ...this.props.user },
      edit: false,
      message: '',
    }
  } //end of constructor

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  } //end of componentDidMount()

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('home');
    } //end of if
  } //end of componentDidUpdate()

  //set edit to true
  edit = () => {
    this.setState({ edit: true });
  } //end of edit()

  //set edit to false
  cancelEdit = () => {
    swal("Cancelled!", "You clicked cancel!", "success");
    this.setState({ edit: false });
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  } //end of cancelEdit()

  handleInputChangeFor = propertyName => (event) => {
    const action = {
      type: USER_ACTIONS.SET_USER, user: {
        ...this.props.user,
        [propertyName]: event.target.value,
      }
    }
    this.props.dispatch(action);
  } //end of hanleInputChangeFor()

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  } //end of renderAlert()

  updateUser = (event) => {
    event.preventDefault();
    swal("Saved!", "Your changes have been made!", "success");
    if (this.props.user.first_name === '' || this.props.user.last_name === '' || this.props.user.telephone === '') {
      this.setState({
        message: 'Please fill in all fields!',
      });
    } else {
      const body = {
        first_name: this.props.user.first_name,
        last_name: this.props.user.last_name,
        telephone: this.props.user.telephone,
      };

      //axios PUT to update user's info
      axios.put('/api/user/registerUpdate/', body)
        .then((response) => {
          if (response.status === 200) {
            this.setState({ edit: false });
          } else {
            this.setState({
              message: 'Ooops! Please make sure all fields are filled',
            })
          } //end of if-else
        }) //end of .then
        .catch(() => {
          this.setState({
            message: 'Ooops! Please try updating again later.',
          });
        }) //end of .catch
    } //end of if-else
  } //end of InfoPage class

  render() {
    let content = null;

    //if edit is false show this on DOM
    if (this.state.edit === false) {
      content = (
        <Card className="info">
          <CardContent>
            <Typography component="p">
              First Name: {this.props.user.first_name}
              <br />
              Last Name: {this.props.user.last_name}
              <br />
              Telephone: {this.props.user.telephone}
            </Typography>
          </CardContent>
          <Button variant="outlined" color="primary" onClick={this.edit}>Edit</Button>
        </Card>
      ) //end of content for edit=false
    } else { //otherwise show this on DOM
      content = (
        <Card className="newInfo">
          <CardContent>
            <h1>Edit Account</h1>
            <div>
              <label htmlFor="first_name">
                First Name:
              <input
                  className="newInput"
                  type="text"
                  name="first_name"
                  value={this.props.user.first_name}
                  onChange={this.handleInputChangeFor('first_name')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="last_name">
                Last Name:
              <input
                  type="text"
                  name="last_name"
                  value={this.props.user.last_name}
                  onChange={this.handleInputChangeFor('last_name')}
                />
              </label>
            </div>
            <div>
              <label htmlFor="telephone">
                Telephone:
              <input
                  country="US"
                  name="telephone"
                  value={this.props.user.telephone}
                  onChange={this.handleInputChangeFor('telephone')}
                />
              </label>
            </div>
          </CardContent>
          <Button variant="outlined" color="primary" onClick={this.updateUser}>Save</Button>
          <Button variant="outlined" color="secondary" onClick={this.cancelEdit}>Cancel</Button>
        </Card>
      ) //end of content for edit=true
    } //end of if-else

    return (
      <div>
        <Nav />
        {content}
      </div>
    ); //end of return
  } //end of render
} //end of InfoPage class

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);
