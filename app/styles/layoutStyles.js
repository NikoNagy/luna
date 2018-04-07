const drawerWidth = 240

export function layoutStyles(theme) {
  return {
    root: {
      position: 'relative',
      width: '100%',
      height: '100%',
      zIndex: 1,
      overflow: 'hidden'
    },
    content: {
      width: '100%',
      height: '100%',
      flexGrow: 1,
      overflow: 'hidden',
      position: 'relative',
      marginTop: 50,
      marginLeft: 50,
      padding: 25
    },
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4
    },
    heading: {
      margin: '1.5em 0 1em',
      fontSize: '1.5rem',
      fontWeight: 400,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1.35417em'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 300
    },
    button: {
      margin: theme.spacing.unit,
      fontStyle: 'normal'
    },
    drawerInner: {
      width: drawerWidth
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    drawerPaperClose: {
      width: 60,
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    }
  }
}
