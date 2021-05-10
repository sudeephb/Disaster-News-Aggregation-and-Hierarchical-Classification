//contains NewsList and Pagination components
import React from 'react';
import NewsList from './NewsList';
import PaginationComponent from './Paginate';

const ContentArea = () => {
    return ( <div className="content-area mt-2 items-center">
                <NewsList />
                <PaginationComponent />
        </div> );
}
 
export default ContentArea;