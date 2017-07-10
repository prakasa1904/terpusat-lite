import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PLACE_HOLDER from './assets/broken-image.png'

class Image extends Component {
  propTypes: {
    loader: React.PropTypes.string,
    showImage: React.PropTypes.bool,
  }

  defaultProps = {
    loader: PLACE_HOLDER,
    showImage: false,
  }

  componentDidUpdate(prevProps) {
    if (! this.props.showImages && prevProps.viewport) {
      this.updatePosition();
    }
  }

  updatePosition = () => {
    const el = ReactDOM.findDOMNode(this)
    this.props.updateImagePosition(el.offsetTop, el.offsetHeight)
  }

  render() {
    const image = (this.props.showImage) ? this.props.src : PLACE_HOLDER
    return (<img src={image} alt={this.props.alt} />)
  }
}

export default Image
