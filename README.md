# dependency-scanner
A simple file dependency scanner based on [Debricked API](https://debricked.com/)

## Requirements:
| Engine | version |
| ------ | ------ |
| node.js | v16.13.0 |
| npm | 8.1.0 |
| vue | 2.6.14 |
| vuex | 3.6.2 |

## Running project
 - Run [proxy server](https://github.com/debricked/cors-proxy) (Make sure it running on port `8081`)
 - Clone project
 - Create `.env` file in project root directory and add this line:
 ```
VUE_APP_GATEWAY_URL=http://localhost:8081/api
```
 - Install node modules with:
```
npm install
```
 - Run project (Make sure it running on port `8080`):
 ```
npm run serve
```
 - Open `http://localhost:8080` in your browser
