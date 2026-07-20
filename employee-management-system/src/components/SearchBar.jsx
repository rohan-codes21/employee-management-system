function SearchBar({ searchTerm, onSearch }) {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search employee..."
                value={searchTerm}
                onChange={(event) => onSearch(event.target.value)}
            />
        </div>
    );
}

export default SearchBar;