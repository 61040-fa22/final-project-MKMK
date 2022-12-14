/* eslint-disable @typescript-eslint/restrict-template-expressions */
// GET /api/likes - Get all the likes
function getAllLikes(fields) {
  fetch('/api/likes', {method: 'GET'})
  .then(showResponse)
    .catch(showResponse);
}

// GET /api/likes?liker=USERNAME - Get all the likes by a given user 
function getLikesByUser(fields) {
  fetch(`/api/likes?liker=${fields.username}`, {method: 'GET'})
    .then(showResponse)
    .catch(showResponse);
}

// GET /api/likes/entryId - Get all the likes on a given entry
function getLikesByEntry(fields) {
  fetch(`/api/likes/entry/${fields.id}`, {method: 'GET'})
    .then(showResponse)
    .catch(showResponse);
}

function createLike(fields) {
  fetch(`/api/likes/${fields.id}`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
      .then(showResponse)
      .catch(showResponse);
  }

function deleteLike(fields) {
  fetch(`/api/likes/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}


