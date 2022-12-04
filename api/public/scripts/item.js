/* eslint-disable @typescript-eslint/restrict-template-expressions */
// GET /api/items - Get all the items
function getAllItems(fields) {
  fetch('/api/items', {method: 'GET'})
  .then(showResponse)
    .catch(showResponse);
}


// GET /api/items?owner=USERNAME - Get all the items by owner 
function getItemsByOwner(fields) {
  fetch(`/api/items/${fields.id}`, {method: 'GET'})
    .then(showResponse)
    .catch(showResponse);
}


function createItem(fields) {
  fetch('/api/items/', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }

function deleteItem(fields) {
  fetch('/api/items/', {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function updateItem(fields) {
  fetch(`/api/items/${fields.id}`, {method: 'PATCH', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }
  



