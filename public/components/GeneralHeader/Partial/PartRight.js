import React, { Component, PropTypes } from 'react'

class PartRight extends Component {
  componentDidMount () {
    window.addEventListener('click', this.handleDocumentClick)
  }

  handleDocumentClick = (event) => {
    console.log(event.target.nodeName.toLowerCase())
    // console.log(event.target.id)
    // if ( event.target.id !=== 'topTxtSearch' && event.target.id !=== 'topTxtSearch' ){
    //
    // }
    // const HIDE_ME = ReactDOM.findDOMNode(this.refs.hideMe);
    //
    // if ( !HIDE_ME.contains(event.target) ){
    //   this.props.searchHandleOnClick('media-body h-search')
    // }
    if(
      this.refs.topOptions.className === 'dropdown hm-profile open' &&
      event.target.id !== 'topOptions'
    ){
      console.log('AB Test')
      // this.setState({
      //   profileOption: false,
      // })
      // console.log(this.refs.topOptions.className)
      // console.log(event.target.id)
      // this.setState({
      //   profileOption: false
      // })
      //this.iconProfileHandleOnClick(event)
    }else{
      console.log('First Here')
    }
  }

  static PropTypes = {
    optionItem: PropTypes.object
  }

  static defaultProps = {
    optionItem: [
        {
          name: 'Profile',
          className: 'zmdi zmdi-account',
          url: '/profile'
        },
        {
          name: 'Pengaturan',
          className: 'zmdi zmdi-settings',
          url: '/pengaturan'
        },
        {
          name: 'Keluar',
          className: 'zmdi zmdi-time-restore',
          url: '/keluar'
        }
      ]
  }

  state = {
    profileOption: false,
  }

  topProfileHandleOnClick =(event) => {
    this.props.topProfileHandleOnClick('dropdown hm-profile')
  }

  searchHandleOnClick = (event) => {
    this.props.searchHandleOnClick('media-body h-search focused toggled')
  }

  iconProfileHandleOnClick = (event) => {
    const PROFILE_OPTION_STATUS = this.state.profileOption ? false : true
    this.setState({
      profileOption: PROFILE_OPTION_STATUS,
    })
  }

  optionMenuItem = (item, index) => (
      <li key={`item-top-profile-${index}`}>
        <a href={item.url}><i className={item.className}></i> {item.name}</a>
      </li>
  )
  render(){
    const CLASS_PROFILE_OPTION = this.state.profileOption ? 'dropdown hm-profile open' : 'dropdown hm-profile'

    return (
      <ul className="pull-right h-menu">
        <li className="hm-search-trigger">
          <a onClick={this.searchHandleOnClick}>
            <i className="hm-icon zmdi zmdi-search"></i>
          </a>
        </li>
        <li className="dropdown hidden-xs hidden-sm h-apps">
            <a>
              <i className="hm-icon zmdi zmdi-apps"></i>
            </a>
        </li>
        <li className="dropdown hidden-xs">
          <a>
            <i className="hm-icon zmdi zmdi-more-vert"></i>
          </a>
        </li>
        <li className="hm-alerts">
            <a href=""><i className="hm-icon zmdi zmdi-notifications"></i></a>
        </li>
        <li
          id="topOptions"
          ref="topOptions"
          className={CLASS_PROFILE_OPTION}
          onClick={this.iconProfileHandleOnClick}>
          <a>
            <img src="img/profile-pics/1.jpg" alt="Guest Avatar" />
          </a>
          <ul id="top-profile-option" className="dropdown-menu pull-right dm-icon">
            {this.props.optionItem.map(this.optionMenuItem)}
          </ul>
        </li>
    </ul>
    )
  }
}

export default PartRight
