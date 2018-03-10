import React, { Component } from 'react';
import { arrayOf, object } from 'prop-types';

class PartRight extends Component {
  static propTypes = {
    optionItem: arrayOf(object),
  };

  static defaultProps = {
    optionItem: [
      {
        name: 'Profile',
        className: 'zmdi zmdi-account',
        url: '/profile',
      },
      {
        name: 'Pengaturan',
        className: 'zmdi zmdi-settings',
        url: '/pengaturan',
      },
      {
        name: 'Keluar',
        className: 'zmdi zmdi-time-restore',
        url: '/keluar',
      },
    ],
  };

  state = {
    profileOption: false,
  };

  topProfileHandleOnClick = event => {
    this.props.topProfileHandleOnClick('dropdown hm-profile');
  };

  searchHandleOnClick = event => {
    this.props.searchHandleOnClick('media-body h-search focused toggled');
  };

  iconProfileHandleOnClick = event => {
    const PROFILE_OPTION_STATUS = this.state.profileOption ? false : true;
    this.setState({
      profileOption: PROFILE_OPTION_STATUS,
    });
  };

  optionMenuItem = (item, index) => (
    <li key={`item-top-profile-${index}`}>
      <a href={item.url}>
        <i className={item.className} /> {item.name}
      </a>
    </li>
  );
  render() {
    const CLASS_PROFILE_OPTION = this.state.profileOption ? 'dropdown hm-profile open' : 'dropdown hm-profile';

    return (
      <ul className="pull-right h-menu">
        <li className="hm-search-trigger">
          <a onClick={this.searchHandleOnClick}>
            <i className="hm-icon zmdi zmdi-search" />
          </a>
        </li>
        <li className="dropdown hidden-xs hidden-sm h-apps">
          <a>
            <i className="hm-icon zmdi zmdi-apps" />
          </a>
        </li>
        <li className="dropdown hidden-xs">
          <a>
            <i className="hm-icon zmdi zmdi-more-vert" />
          </a>
        </li>
        <li className="hm-alerts">
          <a href="">
            <i className="hm-icon zmdi zmdi-notifications" />
          </a>
        </li>
        <li id="topOptions" ref="topOptions" className={CLASS_PROFILE_OPTION} onClick={this.iconProfileHandleOnClick}>
          <a>
            <img src="img/profile-pics/1.jpg" alt="Guest Avatar" />
          </a>
          <ul id="top-profile-option" className="dropdown-menu pull-right dm-icon">
            {this.props.optionItem.map(this.optionMenuItem)}
          </ul>
        </li>
      </ul>
    );
  }
}

export default PartRight;
