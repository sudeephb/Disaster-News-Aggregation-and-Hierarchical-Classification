import React, { useContext, useEffect } from 'react';
import { NewsContext } from '../contexts/NewsContext';
import NewsItem from './NewsItem';
import { v4 } from 'uuid';
// import InfiniteScroll from 'react-infinite-scroll-component';


const NewsList = () => {
    const { newsList, fetchAndSetNewsList, labels, requestArray } = useContext(NewsContext);

    // useEffect(() => {
        // fetchAndSetNewsList(requestArray);
    // });

    return ( 
        <div className="flex news-list justify-center content-center">
            <ul>
                {newsList.map(news => {
                    return(<NewsItem news={news} key = {v4()} />)
                })}
            </ul>
        </div>
     );
}
 
export default NewsList;