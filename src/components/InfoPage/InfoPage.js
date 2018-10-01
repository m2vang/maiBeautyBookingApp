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
//Material Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//Import Material Expansion Table
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import TextField from '@material-ui/core/TextField';


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
      services: [],
      newService: '',
      newCategory: '',
      newDuration: '',
      category: [],
    }
  } //end of constructor

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.getServices();
    this.getCategory();
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

  getServices() {
    axios.get('/api/chart/services/')
      .then((response) => {
        this.setState({
          services: response.data
        })
      }).catch((error) => {
        console.log('Error in getServices', error);
        alert('Cannot get services!');
      }); //end of axios
  } //end of getServices

  removeService = (id) => {
    swal("Service Deleted!", "You will no longer offer this service!", "success");
    axios.delete('/api/chart/removeService/' + id)
      .then((response) => {
        this.getServices();
      }).catch((error) => {
        swal("Unable to delete service!", "Cannot delete service!", "failure");
        console.log('Error in removeService', error);
      }); //end of axios
  } //end of removeService

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  addService = (event) => {
    event.preventDefault();
    swal("Service Added!", "You've added a new service!", "success");
    if (this.state.newCategory === '' || this.state.newService === '' || this.state.newDuration === '') {
      this.setState({
        message: 'Please fill in all fields!',
      })
    } else {
      const body = {
        newCategory: this.state.newCategory,
        newService: this.state.newService,
        newDuration: this.state.newDuration
      };

      axios.post('/api/chart/addService/', body)
        .then((response) => {
          this.getServices();
        }).catch((error) => {
          console.log('Error in addService', error);
          alert('Unable to add service!');
        }); //end of axios
    } //end of if/else

    //empty input field

  } //end of addService

  getCategory() {
    axios.get('/api/chart/category/')
      .then((response) => {
        this.setState({
          category: response.data
        })
      }).catch((error) => {
        console.log('error in getCategory!', error);
      })
  }

  render() {
    let content = null;

    //if edit is false show this on DOM
    if (this.state.edit === false) {
      content = (
        <div className="info">
          <h4>First Name: {this.props.user.first_name}</h4>
          <h4>Last Name: {this.props.user.last_name}</h4>
          <h4>Telephone: {this.props.user.telephone}</h4>
          <Button className="button" variant="outlined" color="primary" onClick={this.edit}>Edit</Button>
        </div>
      ) //end of content for edit=false
    } else { //otherwise show this on DOM
      content = (
        <div className="newInfo">
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
                className="newInput"
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
                className="newInput"
                country="US"
                name="telephone"
                value={this.props.user.telephone}
                onChange={this.handleInputChangeFor('telephone')}
              />
            </label>
          </div>
          <Button className="button" variant="outlined" color="primary" onClick={this.updateUser}>Save</Button>
          <Button variant="outlined" color="secondary" onClick={this.cancelEdit}>Cancel</Button>
        </div>
      ) //end of content for edit=true
    } //end of if-else

    let serviceTypeData = null;
    if (this.props.user.if_stylist === true) {
      serviceTypeData = (
        <div>
          <form>
            <h1>Add a new Service</h1>
            <select onChange={this.handleInputChangeFor('newCategory')}>
              {this.state.category.map((category, index) => {
                return (
                  <option key={index} value={category.id}>{category.category}</option>
                )
              })}
            </select>
            <label htmlFor="service_name">
              Service Name:
              <input
                type="text"
                name="service_name"
                value={this.state.newService}
                onChange={this.handleInputChangeFor('newService')}
              />
            </label>
            <label htmlFor="duration">
              Duration:
              <input
                type="number"
                name="duration"
                value={this.state.newDuration}
                onChange={this.handleInputChangeFor('newDuration')}
              />
            </label>
            <Button variant="outlined" color="primary" onClick={this.addService}>Add</Button>
          </form>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <p>Services</p>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Category Type</TableCell>
                    <TableCell>Service Name</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.services.map((service, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{service.category}</TableCell>
                        <TableCell>{service.service_name}</TableCell>
                        <TableCell><Button variant="outlined" color="secondary" onClick={() => this.removeService(service.id)}>Delete</Button></TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      )
    } else {
      serviceTypeData = (
        <p></p>
      )
    }

    return (
      <div>
        <Nav />
        {content}
        <br />
        {serviceTypeData}
      </div>
    ); //end of return
  } //end of render
} //end of InfoPage class

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);
