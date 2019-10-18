import React from "react";
import { View, StyleSheet } from "react-native";
import OptionMenu from "./OptionMenu";

/**
 * Composant Menu.
 */
const Menu = ({ filtre }) => (
  <View style={styles.menu}>
    <OptionMenu nom="Toutes" filtre={() => filtre("Toutes")} />
    <OptionMenu nom="Actives" filtre={() => filtre("Actives")} />
    <OptionMenu nom="Terminées" filtre={() => filtre("Terminees")} />
  </View>
);

const styles = StyleSheet.create({
  menu: {
    height: 70,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#dddddd"
  }
});
export default Menu;
