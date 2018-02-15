import React, { Component } from 'react';

class PartLeft extends Component {
  sidebarHandleOnClick = event => {
    this.props.sidebarHandleOnClick('toggled');
  };

  render() {
    return (
      <div className="pull-left h-logo">
        <a href="" className="hidden-xs">
          {this.props.title}
          <small>{this.props.desc}</small>
        </a>

        <div className={`menu-collapse ${this.props.sidebarHandleOnClick}`} onClick={this.sidebarHandleOnClick}>
          <div className="mc-wrap">
            <div className="mcw-line top palette-White bg" />
            <div className="mcw-line center palette-White bg" />
            <div className="mcw-line bottom palette-White bg" />
          </div>
        </div>
      </div>
    );
  }
}

export default PartLeft;
