import React, { Component } from 'react';

class PartMiddle extends Component {
  searchHandleonSubmit = event => {
    if (event.key === 'Enter') {
      alert('Are you try to hack this search !?!');
    }
  };

  searchHandleKeyPress = event => {
    if (event.key === 'Enter') {
      alert('Are you try to hack this search !?!');
    }
  };

  searchHandleOnChange = event => {
    console.log(event.target.value);
  };

  searchHandleOnClick = event => {
    this.props.searchHandleOnClick('media-body h-search focused toggled');
  };

  hideSearchHandleOnClick = event => {
    this.props.searchHandleOnClick('media-body h-search');
  };

  render() {
    return (
      <div className={this.props.searchOpen}>
        <form className="p-relative" onSubmit={this.searchHandleonSubmit}>
          <input
            autoComplete="off"
            id="topTxtSearch"
            name="query"
            type="text"
            className="hs-input"
            placeholder={this.props.searchPlaceHolder}
            onKeyPress={this.searchHandleKeyPress}
            onChange={this.searchHandleOnChange}
            onClick={this.searchHandleOnClick}
          />
          <i className="zmdi zmdi-search hs-reset" onClick={this.hideSearchHandleOnClick} />
        </form>
      </div>
    );
  }
}

export default PartMiddle;
