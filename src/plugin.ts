import streamDeck from "@elgato/streamdeck";

import { ActivateBookmark } from "./actions/activateBookmark";

// Register the increment action.
streamDeck.actions.registerAction(new ActivateBookmark());

// Finally, connect to the Stream Deck.
streamDeck.connect().catch((err: unknown) => {
  console.log(err);
});
