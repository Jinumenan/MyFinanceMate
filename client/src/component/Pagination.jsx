import React from 'react';
import { FiChevronsLeft, FiChevronLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page numbers
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-container">
      <div className="pagination-wrapper">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`pagination-nav-button ${currentPage === 1 ? 'disabled' : ''}`}
        >
          <FiChevronsLeft className="pagination-icon" />
        </button>
        
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`pagination-nav-button ${currentPage === 1 ? 'disabled' : ''}`}
        >
          <FiChevronLeft className="pagination-icon" />
        </button>
        
        <div className="pagination-numbers">
          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="pagination-ellipsis">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page)}
                  className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`pagination-nav-button ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          <FiChevronRight className="pagination-icon" />
        </button>
        
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`pagination-nav-button ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          <FiChevronsRight className="pagination-icon" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
