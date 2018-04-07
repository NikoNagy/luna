/** AppHeader styles **/

import deepOrange from 'material-ui/colors/deepOrange'
import deepPurple from 'material-ui/colors/deepPurple'
import pink from 'material-ui/colors/pink'
import red from 'material-ui/colors/red'

const drawerWidth = 240

export function searchBoxStyles(theme) {
  return {
    root: {
      margin: '0 10px',
      padding: 0
    },
    searchBoxLabel: {
      color: '#fff'
    },
    searchBoxInput: {
      borderColor: '#fff'
    }
  }
}

export function notificationsStyles(theme) {
  return {
    root: {
      margin: 10,
      padding: 0
    },
    margin: {
      margin: theme.spacing.unit * 2
    },
    padding: {
      padding: `0 ${theme.spacing.unit * 2}px`
    }
  }
}

export function headerStyles(theme) {
  return {
    appBar: {
      position: 'fixed',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      backgroundColor: theme.palette.secondary.light
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    hide: {
      display: 'none'
    },
    info: {
      display: 'flex',
      flexDirection: 'row',
      margin: theme.spacing.unit
    },
    searchBoxLabel: {
      color: '#fff'
    },
    searchBoxInput: {
      width: 200,
      color: '#fff'
    },
    modeIcon: {
      margin: theme.spacing.unit + 10
    },
    mode: {
      fontFamily: "'Open Sans', sans-serif",
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: theme.spacing.unit + 15
    },
    iconHover: {
      '&:hover': {
        fill: 'rgb(225, 0, 80)'
      }
    }
  }
}
