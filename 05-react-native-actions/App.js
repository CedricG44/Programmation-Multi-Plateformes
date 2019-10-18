import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Entete from "./src/Entete";
import Saisie from "./src/Saisie";
import BoutonCreer from "./src/BoutonCreer";
import ListeActions from "./src/action/ListeActions";
import Menu from "./src/menu/Menu";
import uuid from "uuid";

/**
 * Composant d'entrée de l'application.
 */
export default class App extends React.Component {
  // état global de l'application
  // il y aura probalement d'autres informations à stocker
  state = {
    texteSaisie: "",
    actions: [],
    filtre: "Toutes"
  };

  /**
   * Méthode invoquée lorsque que la saisie change.
   *
   * @param nouvelleSaisie la valeur saisie
   */
  quandLaSaisieChange(nouvelleSaisie) {
    console.log("la saisie à changée", nouvelleSaisie);
    this.setState({ texteSaisie: nouvelleSaisie });
  }

  /**
   * Méthode invoquée lors du clic sur le bouton `Valider`.
   */
  validerNouvelleAction() {
    console.log("Vous avez cliqué sur Valider !");
    const action = { id: uuid.v4(), titre: this.state.texteSaisie, terminee: false };
    this.setState({ actions: [...this.state.actions, action] });
  }

  filtrer() {
    const { filtre, actions } = this.state;
    if (filtre === "Toutes") {
      return actions;
    } else if (filtre === "Actives") {
      return actions.filter(action => action.terminee === false);
    } else if (filtre === "Terminees") {
      return actions.filter(action => action.terminee === true);
    }
  }

  changerFiltre(filtre) {
    console.log(`Vous avez cliqué sur ${filtre} !`);
    this.setState({ filtre: filtre });
  }

  terminerAction(id) {
    console.log("Vous avez cliqué sur Terminer !");
    const actions = this.state.actions.map(action => {
      if (action.id === id) {
        action.terminee = !action.terminee;
      }
      return action;
    });
    this.setState({ actions: actions });
  }

  supprimerAction(id) {
    console.log("Vous avez cliqué sur Supprimer !");
    this.setState({ actions: this.state.actions.filter(action => action.id !== id) });
  }

  render() {
    const { texteSaisie, actions } = this.state;

    return (
      <View style={styles.conteneur}>
        <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
          <Entete />
          <Saisie
            texteSaisie={texteSaisie}
            evtTexteModifie={titre => this.quandLaSaisieChange(titre)}
          />
          <ListeActions
            actions={this.filtrer()}
            terminer={this.terminerAction.bind(this)}
            supprimer={this.supprimerAction.bind(this)}
          />
          <BoutonCreer onValider={() => this.validerNouvelleAction()} />
        </ScrollView>
        <Menu filtre={this.changerFiltre.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  content: {
    flex: 1,
    paddingTop: 60
  }
});
