import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

//Screen import
import AuthScreen from './src/screens/Auth/Auth';
import SharedPlace from './src/screens/SharedPlace/SharedPlace';
import FindPlace from './src/screens/FindPlace/FindPlace';
import PlaceDetail from './src/screens/PlaceDetail/PlaceDetail'
import SideMenuScreen from './src/screens/SideMenu/SideMenuScreen';


// Store import
import configureStore from './src/store/configureStore'

const store = configureStore();

// Register components
Navigation.registerComponentWithRedux("Awesome-places.AuthScreen", () => AuthScreen, Provider, store);
Navigation.registerComponentWithRedux("Awesome-places.SharedPlace", () => SharedPlace, Provider, store);
Navigation.registerComponentWithRedux("Awesome-places.FindPlace", () => FindPlace, Provider, store);
Navigation.registerComponentWithRedux("Awesome-places.PlaceDetail", () => PlaceDetail, Provider, store);
Navigation.registerComponentWithRedux("Awesome-places.SideMenuScreen", () => SideMenuScreen, Provider, store);


// Drawer Control
Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {
  if (buttonId === "DrawerButton") {
    Navigation.mergeOptions('Drawer', {
      sideMenu: {
        left: {
          visible: true
        }
      }
    });
  }
});



// Start a App
export default () => {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        stack: {
          id: 'rootStack',
          children: [{
            component: {
              name: 'Awesome-places.AuthScreen',
              passProps: {
                text: 'stack with one child'
              },
              options: {
                topBar: {
                  title: {
                    text: 'Login',
                  }
                }
              }
            }
          }]
        }
      }
    })
  })

}

