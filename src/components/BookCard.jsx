function BookCard({
  book,
  handleDelete,
  handleEdit,
}) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>

      <p>
        <strong>Author:</strong>{" "}
        {book.author}
      </p>

      <p>
        <strong>Genre:</strong>{" "}
        {book.genre}
      </p>

      <p>
        <strong>Year:</strong>{" "}
        {book.year}
      </p>

      <div className="button-group">
        <button
          className="delete-btn"
          onClick={() =>
            handleDelete(book.id)
          }
        >
          Delete
        </button>

        <button
          className="edit-btn"
          onClick={() =>
            handleEdit(book)
          }
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default BookCard;