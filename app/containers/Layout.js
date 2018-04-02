/**
 * Layout component
 *
 */

import { remote, ipcRenderer } from 'electron'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { layoutStyles } from 'styles/layoutStyles'
import * as globalActions from 'actions/globalActions'
import * as packagesActions from 'actions/packagesActions'
import classNames from 'classnames'
import IconButton from 'material-ui/IconButton'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import ChevronRightIcon from 'material-ui-icons/ChevronRight'
import classnames from 'classnames'
import Grid from 'material-ui/Grid'
import React from 'react'
import PropTypes from 'prop-types'
import Dialog from 'common/Dialog'
import SnackBar from 'common/SnackBar'
import AppHeader from './AppHeader'
import PackagesContainer from './Packages'

class Layout extends React.Component {
  constructor() {
    super()
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this)
  }
  componentDidMount() {
    ipcRenderer.on('set-mode-reply', (event, data) => {
      console.log(event, data)
    })
  }
  handleSnackBarClose() {
    const { toggleSnackbar } = this.props
    toggleSnackbar(false)
  }
  render() {
    const {
      classes,
      menuOpen,
      snackbar,
      snackBarOpen,
      handleDrawerOpen,
      handleDrawerClose,
      handleDialogOpen,
      handleDialogClose,
      dialogOpen,
      theme
    } = this.props

    return (
      <div className={classes.root}>
        <AppHeader
          menuOpen={menuOpen}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          handleDialogOpen={handleDialogOpen}
        />
        <main className={classnames(classes.content, 'page-content')}>
          <PackagesContainer />
          {dialogOpen ? (
            <Dialog open={dialogOpen} handleDialogClose={handleDialogClose} />
          ) : null}
          <SnackBar
            snackBarOpen={snackBarOpen}
            handleSnackBarClose={this.handleSnackBarClose}
            actionText={snackbar.actionText}
            message={snackbar.message}
            position={snackbar.position}
          />
        </main>
        <Drawer
          type="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !menuOpen && classes.drawerPaperClose
            )
          }}
          open={menuOpen}
        >
          <div className={classes.drawerInner}>
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />
          </div>
        </Drawer>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    snackbar: state.global.snackbar,
    menuOpen: state.global.menuOpen,
    dialogOpen: state.global.dialogOpen,
    snackBarOpen: state.global.snackBarOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSnackbar: (bool) => dispatch(globalActions.toggleSnackbar(bool)),
    handleDrawerOpen: () => dispatch(globalActions.handleDrawer(true)),
    handleDrawerClose: () => dispatch(globalActions.handleDrawer(false)),
    handleDialogOpen: () => dispatch(globalActions.toggleDialog(true)),
    handleDialogClose: () => dispatch(globalActions.toggleDialog(false))
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default compose(
  withStyles(layoutStyles, { withTheme: true }),
  connect(mapStateToProps, mapDispatchToProps)
)(Layout)
