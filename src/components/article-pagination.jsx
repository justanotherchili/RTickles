import React from "react";
import "../styles/article-pagination.css";

function ArticlePagination({ page, setPage, totalPages }) {

  const handlePage = (newPage) => {
    window.scrollTo(0, 0);
    setPage(newPage);
  };

  const createPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`page-number ${page === i ? "active" : ""}`}
          onClick={() => handlePage(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <section className="pagination-container">
      <div className="pagination">
        {page > 1 && (
          <button
            className="page-nav"
            onClick={() => handlePage(page - 1)}
          >
            Previous
          </button>
        )}
        {createPageNumbers()}
        {page < totalPages && (
          <button
            className="page-nav"
            onClick={() => handlePage(page + 1)}
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
}

export default ArticlePagination;
