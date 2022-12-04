/* eslint-disable @typescript-eslint/restrict-template-expressions */

//update item: PATCHS /api/items/:itemId?
function updateItem() {
  fetch('/api/items/${fields.id}', {method: 'PATCH'})
      .then(showResponse)
      .catch(showResponse);
  }
  
  //delete item: DELETE /api/items/:itemId?
function deleteItem() {
  fetch('/api/items/${fields.id}', {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

// GET /api/items/:itemId?
function getItemById() {
  fetch('/api/items/${fields.id}', {method: 'GET'})
    .then(showResponse)
    .catch(showResponse);
}
// GET /api/items - Get all the items
function getItems() {
  fetch('/api/items', {method: 'GET'})
    .then(showResponse)
    .catch(showResponse);
}

// GET /api/items?owner=USERNAME - Get all the items by owner 
function getItemsByOwner() {
  fetch('/api/items/${fields.id}', {method: 'GET'})
    .then(showResponse)
    .catch(showResponse);
}



// these might belong in Handoff: 
  // function returnItem(fields) {
  //   fetch(`/api/items/${fields.id}`, {method: 'POST'})
  //     .then(showResponse)
  //     .catch(showResponse);
  // }
  
  // function allowHandoff(fields) {
  //   fetch(`/api/items/${fields.id}`, {method: 'DELETE'})
  //     .then(showResponse)
  //     .catch(showResponse);
  // }
  
  // function rejectHandoff(fields) {
  //   fetch(`/api/items/${fields.id}`, {method: 'DELETE'})
  //     .then(showResponse)
  //     .catch(showResponse);
  // }