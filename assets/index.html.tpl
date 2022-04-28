<!-- Built by BBj PWA  -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <base href="/<%= programName %>/" />
    <meta charset="UTF-8" />
    <title><%= name %></title>

    <meta name="generator" content="BBj PWA" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1,user-scalable=no,minimal-ui"
    />
    <meta name="description" content="<%= description %>" />

    <meta name="application-name" content="<%= name %>" />
    <meta name="theme-color" content="<%= themeColor %>" />
    <link rel="manifest" href="manifest.json" />
    <link
      rel="icon"
      type="image/png"
      sizes="196x196"
      href="images/manifest/favicon-196.png"
    />
  </head>

  <body>
    <div id="bbj-dwc"></div>
    <noscript> Please enable JavaScript to view this website. </noscript>
    <% if (serviceWorker) { %>
    <script>
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/<%= programName %>/sw.js", {
            scope: "/<%= programName %>",
          })
          .then((reg) => {
            console.log(
              "Service worker has been registered successfully. " + reg.scope
            );
          })
          .catch((error) => {
            console.error("Failed to register the service worker " + error);
          });
      }
    </script>
    <% } %>
    <script
      type="text/javascript"
      src="/dwcembed/<%= programName %>.js"
    ></script>
  </body>
</html>
