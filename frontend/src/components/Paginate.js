import React, { useContext, useEffect } from 'react';
import { NewsContext } from '../contexts/NewsContext';
import Pagination from "@material-ui/lab/Pagination";

const NEWS_PER_PAGE = 15

const PaginationComponent = () => {
    const { newsCount, requestArray, fetchAndSetNewsList, currentPage, setCurrentPage } = useContext(NewsContext);
    let totalPages = newsCount > NEWS_PER_PAGE ? Math.ceil(newsCount / NEWS_PER_PAGE) : 1;

    const handlePageChange = (event, value) => {
        console.log(value);
        setCurrentPage(value);
        fetchAndSetNewsList(requestArray, value);
    }

    useEffect(() => {
        // nothing here
    }, [newsCount])

    return (<div className="flex list-reset rounded w-auto font-sans justify-center mb-8 mt-4">
        <Pagination
            // className="react-paginate"
            count={totalPages}
            page={currentPage}
            siblingCount={3}
            boundaryCount={2}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
        />
        </div> );
}
 
export default PaginationComponent;