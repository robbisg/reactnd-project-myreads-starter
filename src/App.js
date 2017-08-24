import React from 'react'
import { Route , Link } from 'react-router-dom'
import BookList from "./BookList"
import BookPage from "./BookPage"
import SearchBook from "./SearchBook"
import * as BooksAPI from './BooksAPI'
import './App.css'




class BooksApp extends React.Component {



  state = {
     shelfBooks: [],
     isChanged: false,
  }


  componentDidMount() {

    BooksAPI.getAll().then((books) => {
      this.setState({ shelfBooks: books})
      console.log("componentDidMount")
    })

  }


  componentDidUpdate(nextProp, nextState){
    if (this.state.isChanged) {
      BooksAPI.getAll().then((books) => {
        this.setState({ shelfBooks: books, isChanged: false})
    })
    }

  }


  changeShelf = (book, shelf) => {
    console.log(book)
    BooksAPI.update(book, shelf).then((data) => {
      this.setState({isChanged: true})
      BooksAPI.get(book.id).then((newBook) => console.log(newBook))
    })
  }


  addBook = (book, shelf) => {
      console.log(book)
      BooksAPI.update(book, shelf).then( (data) => {
        this.setState((state) => ({isChanged: true, shelfBooks: state.shelfBooks.concat([ book ])}))
        BooksAPI.get(book.id).then((newBook) => console.log(newBook))
      })
    }


  render() {

    let shelfDict = {
        currentlyReading: "Currently Reading",
         wantToRead: "Want to Read",
         read: "Read"
       }

    const shelfKeys = Object.keys(shelfDict)


    return (


      <div className="app">

        <Route exact path="/search" render={ ({history}) =>
          <SearchBook onChangeShelf={(book,shelf) => {
            this.addBook(book, shelf)
            history.push("/")
          }}
            shelfBooks={this.state.shelfBooks}/>
        } />

        <Route exact path="/" render={ ({history}) =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads</h1>
            </div>
            <div className="list-books-content">
              <div>

                {shelfKeys.map((shelf) => (
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">{shelfDict[shelf]}</h2>
                    <BookList books={this.state.shelfBooks.filter((book) => (book.shelf === shelf))}
                      onChangeShelf={(book,shelf) => {
                        this.changeShelf(book, shelf)
                        history.push("/")
                      }}/>
                  </div>

                ))}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        } />

        <Route path="/book/:bookid" render={ ({match}) => <BookPage bookId={match.params.bookid} />

        } />



      </div>
    )
  }
}

export default BooksApp
