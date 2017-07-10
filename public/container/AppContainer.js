import React, { Component } from 'react';
import GeneralHeader from '../components/GeneralHeader';
import MainContent from '../components/MainContent';

class AppContainer extends Component {

  state = {
    pageTitle: 'Lokasi Anda Jakarta',
    pageDescription: 'Pusat Data Regional Jakarta',
    sidebarStatus: '',
    topOptionStatus: 'dropdown hm-profile',
  }

  topProfileHandleOnClick =(topOptionStatus) => {
    this.setState({
      topOptionStatus: topOptionStatus
    })
  }

  sidebarHandleOnClick = (sidebarStatus) => {
    this.setState({
      sidebarStatus: sidebarStatus
    })
  }

  render() {
    return (
      <div>
        <GeneralHeader
          sidebarStatus={this.state.sidebarStatus}
          sidebarHandleOnClick={this.sidebarHandleOnClick}/>
        <MainContent
          sectionId="main"
          pageTitle={this.state.pageTitle}
          pageDescription={this.state.pageDescription}
          sidebarStatus={this.state.sidebarStatus}
          sidebarHandleOnClick={this.sidebarHandleOnClick}/>
      </div>
    )
  }
}

export default AppContainer;
