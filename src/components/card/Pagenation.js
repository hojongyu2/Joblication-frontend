import Pagination from "react-responsive-pagination";
import { useState } from "react";

function Pagenation() {
  const totalPages = 120;

  const [currentPage, setCurrentPage] = useState(10);

  function handlePageChange(page) {
    setCurrentPage(page);
    // ... do something with `page`
  }

  return (
    <Pagination
      total={totalPages}
      current={currentPage}
      onPageChange={(page) => handlePageChange(page)}
    />
  );
}

export default Pagenation;
