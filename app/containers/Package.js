/**
 * Package container
 * */

import { connect } from 'react-redux'
import { compose } from 'redux'
import * as globalActions from 'actions/globalActions'
import * as packagesActions from 'actions/packagesActions'
import { APP_MODES, APP_ACTIONS, PACKAGE_GROUPS } from 'constants/AppConstants'
import PropTypes from 'prop-types'
import React from 'react'
import PackageCard from '../components/package/PackageCard'

class PackageContainer extends React.Component {
  constructor() {
    super()
  }
  componentWillMount() {
    //TODO.. NOT WORKING HERE
    const { mode, packageJSON, setPackageGroup } = this.props

    if (mode === APP_MODES.LOCAL) {
      if (!packageJSON) {
        throw new Error('PackageJSON is missing')
      }

      const { active } = this.props
      if (!active) {
        return
      }
      let found = false

      const groups = PACKAGE_GROUPS.some((group, idx) => {
        const { name } = active
        found = packageJSON[group] && packageJSON[group][name] ? group : false
        if (found) {
          setPackageGroup(group)
          return true
        }
      })
    }
  }
  render() {
    const {
      mode,
      group,
      active,
      isLoading,
      classes,
      latest,
      packageJSON
    } = this.props

    return (
      <div ref="rootEl">
        <PackageCard
          active={active}
          latest={latest}
          isLoading={isLoading}
          mode={mode}
          group={group}
          packageJSON={packageJSON}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    mode: state.global.mode,
    directory: state.global.directory,
    packageJSON: state.global.packageJSON,
    cmdOptions: state.global.cmdOptions,
    actions: state.packages.actions,
    active: state.packages.active,
    isLoading: state.packages.isLoading,
    toggleModal: state.global.toggleModal,
    showModal: state.global.showModal,
    npmCmd: state.global.npmCmd,
    group: state.packages.group
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPackageGroup: (group) =>
      dispatch(packagesActions.setPackageGroup(group)),
    addCommandOption: (option) =>
      dispatch(globalActions.addCommandOption(option)),
    clearCommandOptions: () => dispatch(globalActions.clearCommandOptions()),
    toggleMainLoader: (bool) =>
      dispatch(packagesActions.toggleMainLoader(bool)),
    setActive: (pkg) => dispatch(packagesActions.setActive(pkg)),
    toggleModal: (bool, npmCmd) =>
      dispatch(globalActions.toggleModal(bool, npmCmd))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageContainer)
