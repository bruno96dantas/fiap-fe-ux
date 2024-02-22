import React from 'react';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex justify-center">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={"m-1"}
          >
            <button
              className={`btn ${currentPage === page ? "btn-primary" : "btn-secondary"}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};