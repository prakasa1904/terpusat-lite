import React, { Component } from 'react'
import './holder.css'
import Image from './image'

class Index extends Component {
  state = {
    showImage: false,
  }

  propTypes: {
    showImage: React.PropTypes.bool,
  }

  defaultProps = {
    showImage: false,
  }

  componentWillMount() {
    if (this.props.showImage) {
      this.setShowImage(true)
    }
  }

  updateImagePosition = (top, height) => {
    if (this.state.showImage) {
      return;
    }

    var min = this.props.viewport.top
    var max = this.props.viewport.top + this.props.viewport.height
// console.log('Berapa sih min ' + min + ' top + height ' + (top + height) + ' === top ' + top + ' max - 100 ' + (max - 100)) 
    if ((min <= (top + height) && top <= (max - 100))) {
      this.setShowImage(true)
    }
  }

  setShowImage = (show) => {
    this.setState({
      showImage: !!(show)
    })
  }

  render() {
    return (
      <div className='lazy-load__container'>
        <Image
          src={this.props.image}
          alt={this.props.title}
          viewport={this.props.viewport}
          showImage={this.state.showImage}
          updateImagePosition={this.updateImagePosition}
        />
      </div>
    )
  }
}

export default Index
