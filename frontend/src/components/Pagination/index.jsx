import React from 'react';

const Pagination = ({ data, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);

    if (data.length < itemsPerPage){
        return 
    }
    return (
        <div className="pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-secondary"
            >
                Anterior
            </button>

            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    className={`btn btn-secondary ${currentPage === index + 1 ? 'active' : ''}`}
                >
                    {index + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn btn-secondary"
            >
                Próximo
            </button>
        </div>
    );
};

export default Pagination;
