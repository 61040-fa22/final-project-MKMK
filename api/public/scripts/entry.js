/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properties 'username' and 'password'
 */

function viewAllEntries(fields) {
  fetch('/api/entries', {method: 'GET'})
    .then(showResponse)
    .catch(showResponse);
}

function viewEntriesByAuthor(fields) {
  fetch(`/api/entries?author=${fields.author}`, {method: 'GET'})
    .then(showResponse)
    .catch(showResponse);
}

function viewEntriesByItem(fields) {
  fetch(`/api/entries/item?itemId=${fields.itemId}`, {method: 'GET'})
    .then(showResponse)
    .catch(showResponse);
}

function createEntry(fields) {
  fetch('/api/entries', {
    method: 'POST',
    body: JSON.stringify(fields),
    headers: {'Content-Type': 'application/json'}
  })
    .then(showResponse)
    .catch(showResponse);
}

function deleteEntry(fields) {
  fetch(`/api/entries/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}
