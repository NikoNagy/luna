/**
 * PlaceHolder component
 **/

import React from 'react'
import PropTypes from 'prop-types'
import path from 'path'

class PlaceHolder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      module: null
    }
  }
  componentDidMount() {
    const { componentPath, directory } = this.props

    try {
      import(`${componentPath}`).then((module) =>
        this.setState({ module: module.default })
      )
    } catch (e) {
      console.error(e)
    }
  }
  render() {
    // Assigning to new variable names @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const { module: Component } = this.state
    return <div>{Component && <Component />}</div>
  }
}

PlaceHolder.propTypes = {
  componentPath: PropTypes.string.isRequired
}

export default PlaceHolder
