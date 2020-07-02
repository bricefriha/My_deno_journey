interface IBook {
    isbn: string;
    author: string;
    title: string;
  }
  
  let books: Array<IBook> = [{
    isbn: "1",
    author: "Robin Wieruch",
    title: "The Road to React",
  },{
    isbn: "2",
    author: "Kyle Simpson",
    title: "You Don't Know JS: Scope & Closures",
  },{
    isbn: "3",
    author: "Andreas A. Antonopoulos",
    title: "Mastering Bitcoin",
  }]

  // to return all the books of the list
  const getBooks = ({ response }: { response: any }) => { 
    response.body = books 
  };
  // to return a single book
  const getBook = ({ params, response }: { params: { isbn: string }; response: any }) => {
    const book: IBook | undefined = searchBookByIsbn(params.isbn);
    if (book) {
      response.status = 200;
      response.body = book;
    } else {
      response.status = 404;
      response.body = { message: `Book not found.` };
    }   
  };
  // Add a new book
  const addBook = async ({ request, response }: { request: any; response: any }) => {
    const body = await request.body();
    const book: IBook = body.value;  
    books.push(book);
    response.body = { message: 'OK' };
    response.status = 200;
  };

  // Update a book
  const updateBook = async ({ params, request, response }: { params: { isbn: string }; request: any; response: any }) => {
    let book: IBook | undefined = searchBookByIsbn(params.isbn);
    if (book) {
      const body = await request.body();
      const updateInfos: { author?: string; title?: string } = body.value;
      book = { ...book, ...updateInfos};
      books = [...books.filter(book => book.isbn !== params.isbn), book];
      response.status = 200;
      response.body = { message: 'OK' };
    } else {
      response.status = 404;
      response.body = { message: `Book not found` };
    }  
  }

  // To delete a book
  const deleteBook = ({ params, response }: { params: { isbn: string }; response: any }) => {
    books = books.filter(book => book.isbn !== params.isbn);
    response.body = { message: 'OK' };
    response.status = 200;
  }

  /* return the book if found and undefined if not */
const searchBookByIsbn = (isbn: string): ( IBook | undefined ) => books.filter(book => book.isbn === isbn )[0];

export { getBooks, getBook, addBook, updateBook, deleteBook };