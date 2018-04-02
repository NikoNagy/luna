/**
 * AppHeader Menu content
 */

import { remote, ipcRenderer } from 'electron'
import { withStyles } from 'material-ui/styles'
import { objectEntries } from 'utils'
import React from 'react'
import PropTypes from 'prop-types'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Icon from 'material-ui/Icon'
import Divider from 'material-ui/Divider'
import Tooltip from 'material-ui/Tooltip'

const styles = {
  iconHover: {
    '&:hover': {
      fill: 'rgb(225, 0, 80)'
    }
  }
}

class AppHeaderContent extends React.Component {
  constructor() {
    super()
    this.openPackage = this.openPackage.bind(this)
    this.toggleAppSettings = this.toggleAppSettings.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
  }
  openPackage(e) {
    e.preventDefault()
    const { handleDrawerClose } = this.props

    handleDrawerClose()
  }
  toggleAppSettings(e) {
    e.preventDefault()
    const { toggleSettings } = this.props

    toggleSettings(true)
  }
  toggleDialog(e) {
    const { handleDialogOpen } = this.props

    handleDialogOpen(true)
  }
  render() {
    const { classes, outdated } = this.props

    if (outdated) {
      const outdatedArr = objectEntries(outdated)

      return (
        <section>
          <List>
            {outdatedArr.map((o, idx) => {
              return (
                <ListItem key={`k-${idx}`} button onClick={this.viewPackage}>
                  <ListItemIcon>
                    <Icon className={classes.iconHover}>update</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary={o[0]}
                    secondary={`${o[1].current} -> ${o[1].latest}`}
                  />
                </ListItem>
              )
            })}
          </List>
        </section>
      )
    }

    return null
  }
}

const { object } = PropTypes

AppHeaderContent.propTypes = {
  classes: object.isRequired
}

export default withStyles(styles)(AppHeaderContent)
