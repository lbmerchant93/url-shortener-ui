export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
  .then(res => {
    if (!res.ok) {
        return `${res.status} error. Sorry! Something went wrong retrieving all the urls! Try again later!`
    } else {
        return res.json()
    }})
}

export const postUrl = (post) => {
  return fetch('http://localhost:3001/api/v1/urls', post)
    .then(res => {
      if (!res.ok) {
          return `${res.status} error. Sorry! Something went wrong with your POST! Try again later!`
      } else {
          return res.json()
      }})
}

export const deleteUrl = (id) => {
  return fetch(`http://localhost:3001/api/v1/urls/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
      },
  })
  .then(res => {
    if (res.status !== 204) {
        return `${res.status} error. Sorry! Something went wrong with your Delete! Try again later!`
    } else {
        return `success!`
    }})
}