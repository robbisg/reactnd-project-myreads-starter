import React from 'react'
import { Route , Link } from 'react-router-dom'
import BookList from "./BookList"
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
    BooksAPI.update(book, shelf).then((data) => {
      this.setState({isChanged: true})
    })
  }


  addBook = (book, shelf) => {
      BooksAPI.update(book, shelf).then( (data) => {
        this.setState((state) => ({isChanged: true, shelfBooks: state.shelfBooks.concat([ book ])}))
        console.log(data)
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
          }} />
        } />

        <Route exact path="/" render={ ({history}) =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
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

      </div>
    )
  }
}

export default BooksApp
