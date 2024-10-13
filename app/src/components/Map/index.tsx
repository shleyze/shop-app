import { WebView, type WebViewProps } from "react-native-webview";

export function Map({ style }: Pick<WebViewProps, "style">) {
  const latitude = 0;
  const longitude = 0;
  const zoom = 0;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
        <style>
          body, html, #map { height: 100%; margin: 0; padding: 0; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([${latitude}, ${longitude}], ${zoom});
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
          L.marker([${latitude}, ${longitude}]).addTo(map);
        </script>
      </body>
    </html>
  `;

  return <WebView source={{ html }} style={style} />;
}
