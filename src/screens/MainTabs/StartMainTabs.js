import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native'



const startApp = () => {

  const tabsStyle = {
    iconColor: "#0e0c4e",
    selectedIconColor: '#16bac4',
    textColor: '#0e0c4e',
    selectedTextColor: '#16bac4',
    fontFamily: 'Helvetica',
    fontSize: 12
  }

  Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? "md-map" : "ios-map", 30),
    Icon.getImageSource("ios-share-alt", 30),
    Icon.getImageSource("ios-menu", 30)
  ])
    .then(sources => {
      Navigation.setRoot({
        root: {
          sideMenu: {
            id: 'SideMenu',
            left: {
              component: {
                id: 'Drawer',
                name: 'Awesome-places.SideMenuScreen',
                visible: false,
              }
            },
            center: {
              stack: {
                options: {},
                children: [{
                  bottomTabs: {
                    id: 'rootTabs',
                    children: [
                      {
                        stack: {
                          id: 'findplace',
                          children: [{
                            component: {
                              name: 'Awesome-places.FindPlace',
                              options: {
                                topBar: {
                                  leftButtons: [
                                    {
                                      id: 'DrawerButton',
                                      icon: sources[2],
                                    }
                                  ],
                                  title: {
                                    text: 'Find Place'
                                  }
                                }
                              }
                            }
                          }],
                          options: {
                            bottomTab: {
                              text: 'Find',
                              icon: sources[0],
                              ...tabsStyle
                            }
                          }
                        }
                      },

                      {
                        stack: {
                          id: 'Sharedplace',
                          children: [{
                            component: {
                              name: 'Awesome-places.SharedPlace',
                              options: {
                                topBar: {
                                  leftButtons: [
                                    {
                                      id: 'DrawerButton',
                                      icon: sources[2],
                                    }
                                  ],
                                  title: {
                                    text: 'Shared Place'
                                  }
                                }
                              }
                            }
                          }],
                          options: {
                            bottomTab: {
                              text: 'Share',
                              icon: sources[1],
                              ...tabsStyle
                            }
                          }
                        }
                      }
                    ]
                  }
                }]
              }
            }
          }
        }
      })
    }
    )

}

export default startApp

