/* eslint-disable @typescript-eslint/restrict-template-expressions */

function viewLikes() {
  fetch('/api/likes', {method: 'GET'})
    .then(showResponse)
    .catch(showResponse);
}

function likeEntry(fields) {
  fetch(`/api/likes/${fields.id}`, {method: 'POST'})
    .then(showResponse)
    .catch(showResponse);
}

function unlikeEntry(fields) {
  fetch(`/api/likes/${fields.id}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}
