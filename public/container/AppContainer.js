import React, { Component } from 'react'
import { func, object } from 'prop-types'
import { connect } from 'react-redux'

import {
  increaseID
} from '../../store/main'

import GeneralHeader from '../components/GeneralHeader'
import MainContent from '../components/MainContent'

class AppContainer extends Component {
  static propsTypes = {
    increaseID: func,
  }
  state = {
    pageTitle: 'Terpusat Lite',
    pageDescription: 'Referensi Pusat Data Regional',
    topOptionStatus: 'dropdown hm-profile',
  }

  componentDidMount = () => {
    window.addEventListener('click', this.handleBodyClick)
    this.props.increaseID(4)
  }

  handleBodyClick = () => {
    
  }
  // topProfileHandleOnClick =(topOptionStatus) => {
  //   this.setState({
  //     topOptionStatus: topOptionStatus
  //   })
  // }

  // sidebarHandleOnClick = (sidebarStatus) => {
  //   this.setState({
  //     sidebarStatus: sidebarStatus
  //   })
  // }

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

const mapStateToProps = state => ({
  id: state.main ? state.main.id : state.id,
})

const mapDispatchToProps = {
  increaseID,
}

const AppContainerStore = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)

export default AppContainerStore
