import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { BaseSelect } from "./pages/base-select";

export function App(): JSX.Element {
  const options = React.useMemo(
    () => Array.from({ length: 10 }, (_, i) => ({ label: `Test-${i}`, value: i })),
    [],
  );

  console.log(options);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/base-select" component={BaseSelect} />
      </Switch>
    </BrowserRouter>
  );
}
