import Http from '../request'

export const listAuthors = () => {
  return Http.get('/autores')
  .then(res => res.data)
}

export const createAuthor = author => {
  
  return Http.post("/autores", author)
  .then(res => res.data)
};

