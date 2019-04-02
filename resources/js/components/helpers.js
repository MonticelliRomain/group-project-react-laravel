/*helpers is used for global functions*/
/*show or hide some parts of components*/

import axios from 'axios';


/*API REQUESTS*/
/*Register -POST*/
export function appRegister(myJSON){
  axios.post("/api/register", myJSON);
}

/*Login -POST - user/pw */
export function appLogin(myJSON){
  axios.post("api/login", myJSON)
    .then(function (response) {
        console.log(response.data.access_token);
    })
    .catch(function (error) {
      /*préciser l'erreur niveau backend: pas de compte/wrong password*/
        console.log(error);
    });
}

/*Logout-POST */
export function appLogout(myJSON){
  axios.post("/api/logout", myJSON);
}

/*Add Event-POST */
export function appAddEvent(myJSON){
  axios.post("/api/event", myJSON);
}

/*Update Event-PUT */
export function appUpdateEvent(myJSON){
  axios.put("/api/event/1", myJSON);
}

/*Get Event by ID-GET */
export function appGetEventByID(myJSON){
  axios.get("/api/event/1", myJSON);
}

/*Get Event -GET */
/*Get all future events*/
export function appGetEvent(eventList){
    axios.get("/api/events")
      .then (response => eventList.setState({
        eventList : response.data
      }))
}

/*Get Past Event -GET */
export function appGetPastEvent(myJSON){
  axios.get("/api/pastEvent", myJSON);
}
//\API REQUESTS