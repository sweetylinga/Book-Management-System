function BookForm({
  newBook,
  handleChange,
  handleAddBook,
  editingId,
}) {
  return (
    <form
      className="form-container"
      onSubmit={handleAddBook}
    >
      <h2>
        {editingId
          ? "Edit Book"
          : "Add Book"}
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Book Title"
        value={newBook.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="author"
        placeholder="Author Name"
        value={newBook.author}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={newBook.genre}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="year"
        placeholder="Publication Year"
        value={newBook.year}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {editingId
          ? "Update Book"
          : "Add Book"}
      </button>
    </form>
  );
}

export default BookForm;