# radioMii

**Mii** 美音

美 _(beautiful)_ 音 _(sound)_

radioMii is a web application to browse and play internet radio streams.

The app pulls the information about the radio streams from the [radio-browser.info](https://www.radio-browser.info/#/) server.

Try it at [radiomii.com](https://radiomii.com)

## Hotkeys

| Key     | Function                 |
| :------ | :----------------------- |
| `c`     | Compact/Standard View    |
| `d`     | Card/Row View            |
| `l`     | Light on/off             |
| `s`     | Show/hide search options |
| `Space` | Play/Pause               |
| `+`     | Volume up                |
| `-`     | Volume down              |

## Commands in the searchfield

The following commands can be used in the search field:

- `/de`: Lists all stations with the country code `de`.
- `/votes`: Fetches stations with the most 'Likes'.
- `/clicks`: Fetches the most played stations.
- `/recent`: Fetches recently added stations.
- `/webrad`: Pulls stations from the [myMPD Webradio Database](https://github.com/jcorporation/webradiodb).

**Note on myMPD Webradio Database:** Currently, these radio stations cannot be searched or filtered, but they can be added to the favorites list and managed there.

## Electron desktop app

### Run radioMii wrapped in an Electron app on a development server

npm run electron-dev

### Build a radioMii Electron application

npm run electron-package

## Translations

The UI has been translated into 30 languages. Thank you [mondstern](https://translate.codeberg.org/user/mondstern/) for the great work!

## License

[MIT](https://opensource.org/licenses/mit-license.php)
