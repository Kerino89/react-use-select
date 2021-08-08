import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { BaseSelect } from "./pages/base-select";

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={BaseSelect} />
      </Switch>
    </BrowserRouter>
  );
}
