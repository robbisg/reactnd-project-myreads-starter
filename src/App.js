import React from 'react'
import { Route , Link } from 'react-router-dom'
import BookList from "./BookList"
import BookPage from "./BookPage"
import SearchBook from "./SearchBook"
import * as BooksAPI from './BooksAPI'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AppBar from 'material-ui/AppBar';

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


    const cardStyle = {
      margin: "20px",
      padding: "15px"
    }


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
          <div>
            <AppBar
              title="My Reads"
              iconClassNameRight="muidocs-icon-action-home"
            />
            <div className="list-books-content">
              <div>

                {shelfKeys.map((shelf) => (
                  <Card style={cardStyle}>
                    <CardTitle title={shelfDict[shelf]} />
                    <BookList books={this.state.shelfBooks.filter((book) => (book.shelf === shelf))}
                      onChangeShelf={(book,shelf) => {
                        this.changeShelf(book, shelf)
                        history.push("/")
                      }}/>
                  </Card>

                ))}
              </div>
            </div>
            <div className="open-search">
              <FloatingActionButton containerElement={<Link to="/search"></Link>}>
                <ContentAdd />
              </FloatingActionButton>

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
