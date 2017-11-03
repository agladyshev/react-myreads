import React from 'react';
import PropTypes from 'prop-types'


class ShelfChanger extends React.Component {
  static propTypes = {
    shelf: PropTypes.string,
    onShelfChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onShelfChange(event.target.value);
  }

  render() {
    const shelf = this.props.shelf;
    return (
      <div className="book-shelf-changer">
        <select value={shelf} onChange={this.handleChange}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          {(shelf) &&
            <option value="none">None</option>
          }
        </select>
      </div>
    );
  }
}

export default ShelfChanger