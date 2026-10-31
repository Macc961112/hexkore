<p align="center">
  <a href="https://macc961112.github.io/nexus-desktop/"><img src="assets/readme/banner.svg" alt="NEXUS Interactive Desktop: tu escritorio, convertido en un centro de control" width="100%"></a>
</p>

<p align="center">
  <a href="https://macc961112.github.io/nexus-desktop/"><img src="https://img.shields.io/badge/Ver_la_web-3ee0ff?style=for-the-badge&logoColor=03141a&labelColor=070a0f&color=3ee0ff" alt="Ver la web"></a>
  <img src="https://img.shields.io/badge/Windows-10%20%7C%2011%20·%2064%20bits-070a0f?style=for-the-badge&labelColor=0f161f" alt="Windows 10 y 11, 64 bits">
  <img src="https://img.shields.io/badge/Prueba-14%20días-070a0f?style=for-the-badge&labelColor=0f161f" alt="Prueba gratuita de 14 días">
</p>

<p align="center"><b>Datos reales de tu PC, el clima, las criptomonedas y las noticias, vivos en el fondo de pantalla.<br>En uno o varios monitores.</b></p>

---

## Tres monitores, tres perfiles

<table>
  <tr>
    <td width="33%"><img src="assets/shots/gaming.jpg" alt="Perfil Gaming"></td>
    <td width="33%"><img src="assets/shots/centro-epic.jpg" alt="Perfil Centro de control"></td>
    <td width="33%"><img src="assets/shots/monitorizacion.jpg" alt="Perfil Monitorización del sistema"></td>
  </tr>
  <tr>
    <td align="center"><sub>GAMING</sub></td>
    <td align="center"><sub>CENTRO DE CONTROL</sub></td>
    <td align="center"><sub>MONITORIZACIÓN</sub></td>
  </tr>
</table>

Cada pantalla lleva su propio perfil. Hay seis incluidos: Centro de control, Trabajo, Trading, Gaming, Minimalista y Monitorización.

## Lo que consume, medido

| Procesador | Memoria | Si un juego o una ventana lo tapa | Cuentas y telemetría |
|:---:|:---:|:---:|:---:|
| **0,19–0,44 %** | **≈570 MB** | **Pausa** | **0** |
| según el nivel de efectos | todos los procesos | deja de dibujar | licencia sin conexión |

<sub>Medido en un Intel i9-9880H con todos los procesos de NEXUS. El uso de la tarjeta gráfica todavía no se ha medido.</sub>

## Cuatro niveles de efectos

<table>
  <tr>
    <td><img src="assets/shots/centro-off.jpg" alt="Sin efectos"></td>
    <td><img src="assets/shots/centro-subtle.jpg" alt="Sutil"></td>
    <td><img src="assets/shots/centro-normal.jpg" alt="Futurista"></td>
    <td><img src="assets/shots/centro-epic.jpg" alt="Espectacular"></td>
  </tr>
  <tr>
    <td align="center"><sub>SIN EFECTOS · 0,19 %</sub></td>
    <td align="center"><sub>SUTIL · 0,33 %</sub></td>
    <td align="center"><sub>FUTURISTA · 0,36 %</sub></td>
    <td align="center"><sub>ESPECTACULAR · 0,44 %</sub></td>
  </tr>
</table>

## Cada dato viene de algún sitio

| | Fuente |
|---|---|
| **Tu PC** | CPU, GPU, RAM, disco, red y batería, cada 2 segundos |
| **Clima** | MET Norway, con pronóstico de 5 días |
| **Cripto** | CoinGecko, con gráfico de 24 h |
| **Noticias** | Las fuentes RSS que tú elijas |
| **Tuyo** | Notas, temporizador, calendario y accesos rápidos |

Si un dato no llega, el widget lo dice. Nunca muestra datos inventados.

## Tu escritorio sigue siendo tuyo

| Atajo | Qué hace |
|---|---|
| <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>N</kbd> | Usar notas, temporizador y enlaces |
| <kbd>Esc</kbd> | Volver al escritorio normal |
| <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Mayús</kbd> + <kbd>N</kbd> | Recuperar el escritorio original si algo falla |

<p align="center">
  <a href="https://macc961112.github.io/nexus-desktop/"><img src="assets/readme/sitio.jpg" alt="La web de NEXUS" width="100%"></a>
  <br><sub>La página de presentación: <a href="https://macc961112.github.io/nexus-desktop/">macc961112.github.io/nexus-desktop</a></sub>
</p>

---

<details>
<summary><b>Sobre este repositorio (para editar la web)</b></summary>

Página estática: HTML, CSS y JS sin dependencias ni compilación. Se publica con GitHub Pages desde la rama `main`.

- `config.js`: enlaces de descarga y compra, precio y correo de soporte. Mientras estén vacíos, los botones muestran «Próximamente». La compra solo se activa con precio y correo.
- `assets/shots/`: capturas reales de la app.
- `assets/readme/`: imágenes de este README (el banner es un SVG animado).
- Ver en local: `node serve.mjs` → http://localhost:5174
- También funciona en Netlify tal cual (incluye `netlify.toml`).

</details>

<sub>Clima: <a href="https://api.met.no">MET Norway</a> (CC BY 4.0) · Ciudades: © <a href="https://www.openstreetmap.org/copyright">colaboradores de OpenStreetMap</a> · Cripto: <a href="https://www.coingecko.com">CoinGecko</a> · Fuentes: Barlow y JetBrains Mono (SIL OFL)</sub>
