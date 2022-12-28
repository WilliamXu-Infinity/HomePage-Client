import React, { Component } from 'react'

export class ToggleButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonStatus: false
    }
  }

  handleClick() {
    console.log(this.state)
    this.setState((state) => ({buttonStatus: !state.buttonStatus}))
  }

  render() {
    return (
      <button onClick={() => this.handleClick()}>
        {this.state.buttonStatus ? 'ON' : 'OFF'}
      </button>
    )
  }
}

export default ToggleButton
