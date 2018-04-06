/**
 * Outdated packages List component
 *
 **/

import { withStyles } from 'material-ui/styles'
import listStyles from 'styles/listStyles'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import Icon from 'material-ui/Icon'
import Divider from 'material-ui/Divider'
import Tooltip from 'material-ui/Tooltip'
import React from 'react'
import PropTypes from 'prop-types'

class OutdatedList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { classes } = this.props

    return (
      <section className={classes.root}>
        <List>
          <ListItem key="k-1">
            <ListItemIcon>
              <Icon className={classes.iconHover}>update</Icon>
            </ListItemIcon>
            <ListItemText primary="Primary" secondary="version 1.3" />
          </ListItem>
        </List>
      </section>
    )
  }
}

export default withStyles(listStyles)(OutdatedList)
