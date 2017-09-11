# mc-test


## Install

```bash
git clone git@github.com:zahiruldu/mc-test.git
cd mc-test
npm install && npm start
```

The app will start listening on default port 8888

To change default configuration, find the `.env` file in the project root and change the value as like.

```dosini
APP_PORT=8888
APP_ENV=development
```

## Automated testing

To check auto testing, run the following command

```bash
npm test
```
## Manual testing

Some links are provided for menual testing, simply visit links for `GET` request check.
```javascript
http://localhost:8888/vehicles/2015/Audi/A3
http://localhost:8888/vehicles/undefined/Ford/Fusion
http://localhost:8888/vehicles/2015/Audi/A3?withRating=true
http://localhost:8888/vehicles/2015/Audi/A3?withRating=false
http://localhost:8888/vehicles/2015/Audi/A3?withRating=banana
```

To check `POST` requests, send the object data to the following endpoint-
```javascript
http://localhost:8888/vehicles
```
Sample object
```
{
    "modelYear": 2015,
    "manufacturer": "Audi",
    "model": "A3"
}
```
N.B. You can also send `withRating` property value in the post object to get desired result in post method like the following.
```
{
    "modelYear": 2015,
    "manufacturer": "Audi",
    "model": "A3",
    "withRating": "true"
}
```
[POSTMAN](https://www.getpostman.com/apps) or any API testing tool can be used

## [`DEMO`](https://powerful-inlet-14496.herokuapp.com)

*[`/vehicles/2015/Audi/A3`](https://powerful-inlet-14496.herokuapp.com/vehicles/2015/Audi/A3)

*[`/vehicles/undefined/Ford/Fusion`](https://powerful-inlet-14496.herokuapp.com/vehicles/undefined/Ford/Fusion)

*[`/vehicles/2015/Audi/A3?withRating=true`](https://powerful-inlet-14496.herokuapp.com/vehicles/2015/Audi/A3?withRating=true)

*[`/vehicles/2015/Audi/A3?withRating=false`](https://powerful-inlet-14496.herokuapp.com/vehicles/2015/Audi/A3?withRating=false)

*[`/vehicles/2015/Audi/A3?withRating=banana`](https://powerful-inlet-14496.herokuapp.com/vehicles/2015/Audi/A3?withRating=banana)

## Node Version
```
6.10.3
```
