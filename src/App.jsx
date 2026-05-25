import { useEffect, useState } from "react";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} from "./services/api";

import BookCard from "./components/BookCard";
import BookForm from "./components/BookForm";
import SearchFilter from "./components/SearchFilter";

import "./styles/App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] =
    useState(true);

  const [editingId, setEditingId] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedGenre, setSelectedGenre] =
    useState("");

  const [newBook, setNewBook] =
    useState({
      title: "",
      author: "",
      genre: "",
      year: "",
    });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.log(
        "Error fetching books:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleAddBook = async (
    e
  ) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateBook(
          editingId,
          newBook
        );
        setEditingId(null);
      } else {
        await addBook(newBook);
      }

      setNewBook({
        title: "",
        author: "",
        genre: "",
        year: "",
      });

      fetchBooks();
    } catch (error) {
      console.log(
        "Error saving book:",
        error
      );
    }
  };

  const handleDelete = async (
    id
  ) => {
    try {
      await deleteBook(id);
      fetchBooks();
    } catch (error) {
      console.log(
        "Error deleting book:",
        error
      );
    }
  };

  const handleEdit = (book) => {
    setEditingId(book.id);

    setNewBook({
      title: book.title,
      author: book.author,
      genre: book.genre,
      year: book.year,
    });
  };

  const genres = [
    ...new Set(
      books.map(
        (book) => book.genre
      )
    ),
  ];

  const filteredBooks =
    books.filter((book) => {
      const matchesSearch =
        book.title
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        book.author
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesGenre =
        selectedGenre === "" ||
        book.genre === selectedGenre;

      return (
        matchesSearch &&
        matchesGenre
      );
    });

  return (
    <div className="container">
      <h1 className="heading">
        📚 Book Management System
      </h1>

      <BookForm
        newBook={newBook}
        handleChange={handleChange}
        handleAddBook={
          handleAddBook
        }
        editingId={editingId}
      />

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={
          setSearchTerm
        }
        selectedGenre={
          selectedGenre
        }
        setSelectedGenre={
          setSelectedGenre
        }
        genres={genres}
      />

      {loading ? (
        <p>Loading books...</p>
      ) : filteredBooks.length ===
        0 ? (
        <p>No books found</p>
      ) : (
        filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            handleDelete={
              handleDelete
            }
            handleEdit={
              handleEdit
            }
          />
        ))
      )}
    </div>
  );
}

export default App;