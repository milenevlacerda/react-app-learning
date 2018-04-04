import Http from '../request'

const listAuthors = () => {
  return Http.get('/autores')
  .then(res => res.data)
}

export default listAuthors