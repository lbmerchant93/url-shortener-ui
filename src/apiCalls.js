export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
  .then(res => {
    if (!res.ok) {
        return `${res.status} error. Sorry! Something went wrong! Try again later!`
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