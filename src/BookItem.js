import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import ShelfMenuButton from "./style/ShelfMenu"


class BookItem extends Component {

  updateShelf = (book, shelf) => {
    this.props.onChangeShelf(book, shelf)
  }

  selectShelf = (shelf) => {
    console.log(shelf)
    console.log(this.props.book)
    this.updateShelf(this.props.book, shelf)
  }

  render () {


    const book = this.props.book
    const selected = book.shelf ? (book.shelf) : ("none")

    const imgUrl = book.imageLinks ? (book.imageLinks.thumbnail) : ('http://placehold.it/128x193')
    const divStyle = {
      width: 128,
      height: 193,
      backgroundImage: 'url(' + imgUrl + ')',
    };
    const linkTo = "/book/"+book.id

    return (

      <Link to={linkTo}>
        <GridTile
          key={book.id}
          title={book.title}
          subtitle={book.authors && (<div>{book.authors.map((author) => (<span>{author} </span>))}</div>)}
          actionIcon={<ShelfMenuButton selection={selected} getShelf={this.selectShelf} />}
        >

          <img src={imgUrl} />

        </GridTile>
      </Link>

    )

  }

}

export default BookItem;
