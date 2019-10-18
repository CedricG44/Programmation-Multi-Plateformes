import React from "react";
import { View } from "react-native";
import UneAction from "./UneAction";

const ListeActions = ({ actions, terminer, supprimer }) => {
  return (
    <View>
      {actions.map(action => (
        <UneAction
          key={action.id}
          action={action}
          terminer={() => terminer(action.id)}
          supprimer={() => supprimer(action.id)}
        ></UneAction>
      ))}
    </View>
  );
};

export default ListeActions;
