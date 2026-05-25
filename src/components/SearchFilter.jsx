function SearchFilter({
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
  genres,
}) {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(
            e.target.value
          )
        }
      />

      <select
        value={selectedGenre}
        onChange={(e) =>
          setSelectedGenre(
            e.target.value
          )
        }
      >
        <option value="">
          All Genres
        </option>

        {genres.map(
          (genre, index) => (
            <option
              key={index}
              value={genre}
            >
              {genre}
            </option>
          )
        )}
      </select>
    </div>
  );
}

export default SearchFilter;