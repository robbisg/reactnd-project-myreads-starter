import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

export default class ShelfMenuButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <IconButton onClick={this.handleTouchTap}>
          <FontIcon className="material-icons" color="white">mode_edit</FontIcon>
        </IconButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <Menu value={this.props.selection} onChange={(event, value) => this.props.getShelf(value)}>
            <MenuItem value="none" disabled primaryText="Move to..." />
            <MenuItem value="currentlyReading" primaryText="Currently Reading" />
            <MenuItem value="wantToRead" primaryText="Want to Read" />
            <MenuItem value="read" primaryText="Read" />
            <MenuItem value="none" primaryText="None" />
          </Menu>
        </Popover>
      </div>
    );
  }
}
