/**
 * Applications menu
 **/

import { APP_MODES } from './constants/AppConstants'
import { app, Menu, shell, BrowserWindow } from 'electron'

export default class MenuBuilder {
  constructor(mainWindow) {
    this.mainWindow = mainWindow
  }
  buildMenu() {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment()
    }

    let template

    if (process.platform === 'darwin') {
      template = this.buildDarwinTemplate()
    } else {
      template = this.buildDefaultTemplate()
    }

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    return menu
  }
  setupDevelopmentEnvironment() {
    this.mainWindow.openDevTools()
    this.mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props

      Menu.buildFromTemplate([
        {
          label: 'Inspect element',
          click: () => {
            this.mainWindow.inspectElement(x, y)
          }
        }
      ]).popup(this.mainWindow)
    })
  }
  sendIpcEvent(opts) {
    const { ipcEvent, mode, directory } = opts

    this.mainWindow.webContents.send(ipcEvent, opts)
  }
  buildDarwinTemplate() {
    const Menu = {
      label: 'About'
    }

    return [Menu]
  }
  openSettings() {}
  openPackageJSON() {
    const { dialog } = require('electron')

    dialog.showOpenDialog(
      {
        properties: ['openFile'],
        filters: [{ name: 'package', extensions: ['json'] }]
      },
      (filePath) => {
        if (!filePath || !Array.isArray(filePath)) {
          return
        }

        const packageJsonPath = filePath[0]

        if (packageJsonPath) {
          this.mainWindow.webContents.send('set-local-mode', packageJsonPath)
        }
      }
    )
  }
  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: '&File',
        submenu: [
          {
            label: '&Analyze directory',
            accelerator: 'Ctrl+O',
            role: 'open',
            click: () => this.openPackageJSON()
          },
          {
            label: '&Settings',
            accelerator: 'Ctrl+S',
            click: () => this.openSettings()
          },
          {
            label: '&Close',
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close()
            }
          }
        ]
      },
      {
        label: '&View',
        submenu:
          process.env.NODE_ENV === 'development'
            ? [
                {
                  label: '&Reload',
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reload()
                  }
                },
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    )
                  }
                },
                {
                  label: 'Toggle &Developer Tools',
                  accelerator: 'Alt+Ctrl+I',
                  click: () => {
                    this.mainWindow.toggleDevTools()
                  }
                }
              ]
            : [
                {
                  label: 'Toggle &Full Screen',
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    )
                  }
                }
              ]
      },
      {
        label: 'Help',
        submenu: [
          {
            label: 'Learn More',
            click() {
              shell.openExternal('https://github.com/rvpanoz/luna')
            }
          },
          {
            label: 'Search Issues',
            click() {
              shell.openExternal('https://github.com/rvpanoz/luna/issues')
            }
          }
        ]
      }
    ]

    return templateDefault
  }
}
