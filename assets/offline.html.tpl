<!-- Built by BBj PWA  -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <base href="/<%= programName %>/" />
    <meta charset="utf-8" />
    <title>Network Error</title>
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no,minimal-ui" />
    <style>
      :root {
        --bbj-offline-primary: #0063cc;
        --bbj-offline-on-primary: #fff;
        --bbj-offline-bg: #fff;
        --bbj-offline-color: #333;
      }

      body {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        width: 100vw;
        height: 100vh;
        background-color: var(--bbj-offline-bg);
      }

      h1 {
        font-size: 2.25rem;
        margin: 0;
      }

      body {
        font: 1.125rem Helvetica, sans-serif;
        color: var(--bbj-offline-color);
      }

      article {
        display: block;
        text-align: left;
        padding: 1rem;
      }

      button {
        background-color: var(--bbj-offline-primary);
        border: none;
        color: var(--bbj-offline-on-primary);
        padding: 0.5rem 1rem;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 1rem;
        font-weight: 500;
        border-radius: 4px;
        cursor: pointer;
        line-height: 1.5;
      }

      button:hover,
      button:active {
        opacity: 0.9;
      }
    </style>
  </head>
  <body>
    <article>
      <h1>Network Error !</h1>
      <div>
        <p>It seems your offline or our service is offline. please make sure you are connected to internet and try again.</p>
        <button type="button">Reload</button>
      </div>
    </article>
    <script>
      document.querySelector('button').addEventListener('click', () => {
        window.location.reload();
      });

      window.addEventListener('online', () => {
        window.location.reload();
      });

      async function checkNetworkAndReload() {
        try {
          const response = await fetch('.');
          // Verify we get a valid response from the server
          if (response.status >= 200 && response.status < 500) {
            window.location.reload();
            return;
          }
        } catch {
          // Unable to connect to the server, ignore.
          // pass
        }

        window.setTimeout(checkNetworkAndReload, 2500);
      }

      checkNetworkAndReload();
    </script>
  </body>
</html>
