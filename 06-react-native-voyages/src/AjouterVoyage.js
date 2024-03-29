import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import uuidV4 from "uuid/v4";
import { couleurs } from "./Theme";

export default class AjouterVoyage extends React.Component {
  state = {
    ville: "",
    pays: ""
  };

  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };

  ajouter = () => {
    if (this.state.ville === "" || this.state.pays === "") alert("Veuillez remplir le formulaire");
    const voyage = {
      id: uuidV4(),
      ville: this.state.ville,
      pays: this.state.pays,
      lieux: []
    };

    // TODO propager l'événement d'ajout d'un nouveau voyage pour alimenter l'état (App.js)
    this.props.screenProps.ajouterVoyage(voyage);

    // TODO une fois l'état mis à jour, rediriger l'utilisateur vers la liste des voyages
    this.props.navigation.navigate("ListerVoyages");
  };

  render() {
    return (
      <View style={styles.conteneur}>
        <Text style={styles.entete}>Voyages</Text>
        <TextInput
          placeholder="Quelle ville ?"
          onChangeText={val => this.onChangeText("ville", val)}
          style={styles.saisie}
          value={this.state.ville}
        />
        <TextInput
          placeholder="Quel pays ?"
          onChangeText={val => this.onChangeText("pays", val)}
          style={styles.saisie}
          value={this.state.pays}
        />
        <TouchableOpacity onPress={this.ajouter}>
          <View style={styles.bouton}>
            <Text style={styles.texteBouton}>Ajouter une ville</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bouton: {
    height: 50,
    backgroundColor: "#666",
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  texteBouton: {
    color: "white",
    fontSize: 18
  },
  entete: {
    color: "white",
    fontSize: 40,
    marginBottom: 10,
    alignSelf: "center"
  },
  conteneur: {
    backgroundColor: couleurs.primaire,
    flex: 1,
    justifyContent: "center"
  },
  saisie: {
    margin: 10,
    backgroundColor: "white",
    paddingHorizontal: 8,
    height: 50
  }
});
