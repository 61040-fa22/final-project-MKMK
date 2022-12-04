/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

function createCM(fields) {
  const data = {
    title: fields.title,
    description: fields.description,
    admins: fields.admins ? fields.admins.split(',').map(str => str.trim()) : [],
    editors: fields.editors ? fields.editors.split(',').map(str => str.trim()) : []
  };
  fetch('/api/cm/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(showResponse)
    .catch(showResponse);
}

function editCM(fields) {
  const data = {
    title: fields.title,
    description: fields.description,
    admins: fields.admins ? fields.admins.split(',').map(str => str.trim()) : [],
    editors: fields.editors ? fields.editors.split(',').map(str => str.trim()) : []
  };
  fetch(`/api/cm/${fields.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(showResponse)
    .catch(showResponse);
}

function addEntriesToCM(fields) {
  const data = {
    entriesToAdd: fields.entries ? fields.entries.split(',').map(str => str.trim()) : []
  };
  fetch(`/api/cm/${fields.id}/entries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(showResponse)
    .catch(showResponse);
}

function removeEntriesFromCM(fields) {
  const data = {
    entriesToRemove: fields.entries ? fields.entries.split(',').map(str => str.trim()) : []
  };
  fetch(`/api/cm/${fields.id}/entries`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(showResponse)
    .catch(showResponse);
}

function deleteCM(fields) {
  fetch(`/api/cm/${fields.id}`, {
    method: 'DELETE'
  })
    .then(showResponse)
    .catch(showResponse);
}
