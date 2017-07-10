import React, { Component } from 'react'
import Holder from './holder'

class Index extends Component {
  state = {
    viewport: {
      top: 0,
      height: 0
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateViewport)
    window.addEventListener('scroll', this.updateViewport)
    window.addEventListener('touchend', this.updateViewport)
    this.updateViewport()
  }

  componentWillUnmount() {
      window.addEventListener('resize', this.updateViewport)
      window.addEventListener('scroll', this.updateViewport)
      window.addEventListener('touchend', this.updateViewport)
  }

  updateViewport = () => {
    this.setState({
      viewport: {
        top: window.pageYOffset,
        height: window.innerHeight,
      }
    })
  }

  render() {
    var self = this
    return (
       <div>
        <Holder
          title={this.props.item.title}
          image={this.props.item.image}
          viewport={self.state.viewport} />
      </div>
    )
  }
}

export default Index
