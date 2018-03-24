/**
 * CardContent component
 *
 */

import { CardContent as MuiCardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import { APP_INFO, APP_MODES } from 'constants/AppConstants'
import React from 'react'
import PropTypes from 'prop-types'
import Divider from 'material-ui/Divider'
import CardOptions from './CardOptions'
import CardVersions from './CardVersions'

const { object, array, func, string } = PropTypes

const CardContent = (props) => {
  const {
    classes,
    active,
    mode,
    version,
    cmdOptions,
    onChangeVersion,
    addCommandOption,
    packageJSON,
    group,
    removeCommandOption
  } = props

  if (!active) {
    return null
  }

  return (
    <MuiCardContent className={classes.cardContent}>
      <Typography component="h3" className={classes.heading}>
        Description
      </Typography>
      <Divider />
      <Typography component="div" className={classes.headingTail}>
        {active && active.description}
      </Typography>
      <Typography component="h3" className={classes.heading}>
        Version and options
      </Typography>
      <Divider />
      <section className={classes.controls}>
        <CardVersions
          classes={classes}
          active={active}
          onChangeVersion={onChangeVersion}
        />
        {mode && mode === APP_MODES.LOCAL ? (
          <CardOptions
            active={active}
            addCommandOption={addCommandOption}
            group={group}
            cmdOptions={cmdOptions}
            packageJSON={packageJSON}
            removeCommandOption={removeCommandOption}
          />
        ) : null}
      </section>
    </MuiCardContent>
  )
}

CardContent.propTypes = {
  version: string,
  cmdOptions: array,
  classes: object.isRequired,
  active: object.isRequired,
  onChangeVersion: func.isRequired,
  clearCommandOptions: func.isRequired
}

export default CardContent
