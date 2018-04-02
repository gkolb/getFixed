import React from 'react';
import NavBar from './navBar.jsx';
import CategoryView from './categoryView.jsx';
import axios from 'axios'
import { Card } from 'semantic-ui-react';
import Problem from './problem.jsx';
// import GoogleMap from './googleMap.jsx';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      listings:[]
    };
  }

  componentWillMount() {
    var context = this;
    var user_id =  this.props.location.pathname.split('/')[2];
    console.log(user_id)
    axios.get(`/user/${user_id}`)
      .then(function (response) {
        console.log(response)
        context.setState({currentUser: response.data})
        return axios.get(`/listings/${user_id}`)
      })
      .then((response) => {
        context.setState({listings: response.data})
        })
  }


  render() {
    return (
      <div>
        <NavBar
          isLoggedIn={this.props.isLoggedIn}
          onLogout={this.props.onLogout}
          user={this.props.user}
        />
        <div style={{paddingLeft: "4%", paddingTop: "2%"}}>
          <h2>{this.state.currentUser.username}</h2>
          <div>
            <div>
              Stars Image
            </div>
            <span>{this.state.currentUser.avg_rating || 'Unrated'} </span>
            <span>{this.state.currentUser.rating_count || 'No Ratings Yet'}</span>
          </div>
          <div>
            <h4>{this.state.currentUser.phone_number || 'No phone number'}</h4>
            <span><em>Serving area around {this.state.currentUser.city}, call for availability</em></span>
          </div>
        </div>
          <div>
            <Card.Group className="ui cards">
              {this.state.listings.map((problem, index) => {
                return <Problem
                        key={index}
                        problem={problem}
                        userId={problem.user_id}
                        index={index}
                      />;
              })}
            </Card.Group>
          </div>
      </div>
)}

}

export default UserProfile;