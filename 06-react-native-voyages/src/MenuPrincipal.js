import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import ListerVoyages from "./ListerVoyages";
import AjouterVoyage from "./AjouterVoyage";
import UnVoyage from "./UnVoyage";
import { couleurs } from "./Theme";

const options = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: couleurs.primaire
    },
    headerTintColor: "#fff"
  }
};

const VoyagesNav = createStackNavigator(
  {
    ListerVoyages: { screen: ListerVoyages },
    UnVoyage: { screen: UnVoyage }
  },
  options
);

const MenuPrincipal = createBottomTabNavigator({
  ListerVoyages: { screen: VoyagesNav },
  AjouterVoyage: { screen: AjouterVoyage }
});

export default createAppContainer(MenuPrincipal);
