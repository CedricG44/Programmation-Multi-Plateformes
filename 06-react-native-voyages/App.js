import React from "react";
import uuidV4 from "uuid/v4";

import MenuPrincipal from "./src/MenuPrincipal";

export default class App extends React.Component {
  state = {
    voyages: [
      {
        id: uuidV4(),
        ville: "Nantes",
        pays: "France",
        lieux: []
      }
    ],
    ajouterVotage: this.ajouterVoyage.bind(this),
    mettreAJourVoyage: this.mettreAJourVoyage.bind(this)
  };

  ajouterVoyage(voyage) {
    console.log("Nouveau voyage:", JSON.stringify(voyage));
    this.setState({ voyages: [...this.state.voyages, voyage] });
  }

  mettreAJourVoyage(voyage) {
    console.log("Voyage mis à jour:", JSON.stringify(voyage));
    const voyages = this.state.voyages.map(v => {
      if (v.id === voyage.id) {
        v = voyage;
      }
      return v;
    });
    this.setState({ voyages: voyages });
  }

  render() {
    return (
      <MenuPrincipal
        screenProps={{
          ajouterVoyage: this.state.ajouterVotage,
          mettreAJourVoyage: this.state.mettreAJourVoyage,
          voyages: this.state.voyages
        }}
      />
    );
  }
}
