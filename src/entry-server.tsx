import { createHandler } from "@solidjs/start/entry";
import { StartServer } from "@solidjs/start/server";
import { css } from "styled-system/css";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body class={css({})}>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
