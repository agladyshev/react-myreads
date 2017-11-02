import React from 'react';
import PropTypes from 'prop-types'


class ShelfChanger extends React.Component {
  static propTypes = {
    shelf: PropTypes.string,
    onShelfChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    // this.state = {shelf: props.shelf};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onShelfChange(event.target.value);
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.props.shelf} onChange={this.handleChange}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default ShelfChanger