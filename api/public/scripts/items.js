/* eslint-disable @typescript-eslint/restrict-template-expressions */

//TO DO: Finish fleshing out the routes--these are just first pass / place holder 
function requestItem() {
    fetch('/api/likes', {method: 'GET'})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function returnItem(fields) {
    fetch(`/api/items/${fields.id}`, {method: 'POST'})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function allowHandoff(fields) {
    fetch(`/api/items/${fields.id}`, {method: 'DELETE'})
      .then(showResponse)
      .catch(showResponse);
  }
  
  function rejectHandoff(fields) {
    fetch(`/api/items/${fields.id}`, {method: 'DELETE'})
      .then(showResponse)
      .catch(showResponse);
  }