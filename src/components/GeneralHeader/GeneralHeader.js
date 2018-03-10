import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PartLeft from './Partial/PartLeft';
import PartMiddle from './Partial/PartMiddle';
import PartRight from './Partial/PartRight';

class GeneralHeader extends Component {
  static propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    searchPlaceHolder: PropTypes.string,
  };

  static defaultProps = {
    title: 'Terpusat',
    desc: 'Make It Happen',
    searchPlaceHolder: 'Cari Orang, tempat atau aktivitas',
  };

  state = {
    searchOpen: 'media-body h-search',
    searchMobile: '',
  };

  topProfileHandleOnClick = () => {
    this.props.topProfileHandleOnClick('dropdown hm-profile');
  };

  sidebarHandleOnClick = event => {
    this.props.sidebarHandleOnClick('toggled');
  };

  searchHandleOnClick = searchOpen => {
    this.setState({
      searchOpen: searchOpen,
    });
  };

  render() {
    return (
      <header id="header" className="media">
        <PartLeft title={this.props.title} desc={this.props.desc} sidebarHandleOnClick={this.sidebarHandleOnClick} />
        <PartRight searchOpen={this.state.searchOpen} searchHandleOnClick={this.searchHandleOnClick} />
        <PartMiddle
          searchOpen={this.state.searchOpen}
          searchHandleOnClick={this.searchHandleOnClick}
          topProfileHandleOnClick={this.topProfileHandleOnClick}
        />
      </header>
    );
  }
}

export default GeneralHeader;
