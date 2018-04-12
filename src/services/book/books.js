import Http from "../request";

export const listBooks = () => {
  return Http.get("/livros").then(res => res.data);
};

export const createBook = book => {
  return Http.post("/livros", book).then(res => res.data);
};
