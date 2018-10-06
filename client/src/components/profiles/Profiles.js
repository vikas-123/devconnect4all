import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import {getProfiles} from '../../action/profileActions';


 class Profiles extends Component {
    componentDidMount(){
        this.props.getProfiles();
    }
    
  render() {
      const {profiles , loading } = this.props.profile;
      let ProfileItems;

      if (profiles === null || loading) {
        ProfileItems = <Spinner />;
      }
      else {
          if(profiles.length>0)
          {
            ProfileItems = profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ));
          }

          else {
            ProfileItems= <h4>Profiles Not Found...</h4>
          }
      }
    return (
        <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {ProfileItems}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Profiles.propType = {
    getProfiles : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps , {getProfiles})(Profiles);