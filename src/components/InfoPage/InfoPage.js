import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class InfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { ...this.props.user },
      edit: false,
      message: '',
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.email === null) {
      this.props.history.push('home');
    }
  }

  edit = () => {
    this.setState({ edit: true });
  }

  cancelEdit = () => {
    this.setState({ edit: false });
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });

  }

  handleInputChangeFor = propertyName => (event) => {
    const action = {
      type: USER_ACTIONS.SET_USER, user: {
        ...this.props.user,
        [propertyName]: event.target.value,
      }
    }
    this.props.dispatch(action);
  }

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
  }

  updateUser = (event) => {
    event.preventDefault();
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

      console.log('BODY',body);
      
      axios.put('/api/user/register/', body)
        .then((response) => {
          if (response.status === 200) {
            this.setState({ edit: false });
          } else {
            this.setState({
              message: 'Ooops! Please make sure all fields are filled',
            })
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Please try updating again later.',
          });
        })
    }
  }

  render() {
    let content = null;

    if (this.state.edit === false) {
      content = (
        <div>
          <p>First Name: {this.props.user.first_name}</p>
          <p>Last Name: {this.props.user.last_name}</p>
          <p>Telephone: {this.props.user.telephone}</p>
          <button onClick={this.edit}>Edit</button>
        </div>
      );
    } else {
      content = (
        <div>
          <form onSubmit={this.updateUser}>
            <h1>Edit Account</h1>
            <div>
              <label htmlFor="first_name">
                First Name:
              <input
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
                  type="text"
                  name="telephone"
                  value={this.props.user.telephone}
                  onChange={this.handleInputChangeFor('telephone')}
                />
              </label>
            </div>
            <div>
              <input
                type="submit"
                name="submit"
                value="Save"
              />
              <button onClick={this.cancelEdit}>Cancel</button>
            </div>
          </form>
        </div>
      )
    }

    return (
      <div>
        <Nav />
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);
