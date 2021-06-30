import * as React from "react";

import { Select } from "./components/select";

export function App(): JSX.Element {
  const options = React.useMemo(
    () => Array.from({ length: 10 }, (_, i) => ({ label: `Test-${i}`, value: i })),
    [],
  );

  console.log(options);

  return (
    <div>
      <Select options={options} />
    </div>
  );
}
