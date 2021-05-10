import React, { useEffect } from 'react';

const NewsItem = ({ news }) => {

    const process_summary = (summary) => {
        const characters_to_show = 165;
        if (summary.length > characters_to_show) {
            return (summary.substring(0, characters_to_show - 3) + '...').replace(/<\/?[^>]+(>|$)/g, "");
        }
        else
            return (summary.replace(/<\/?[^>]+(>|$)/g, ""));
    }

    // console.log('Newwwwssss ===== ', news.title)

    return (
        <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-3 max-w-md md:max-w-2xl ">
            <div className="flex items-start px-4 py-6">
                <div className="">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-blue-500 hover:text-blue-600 hover:underline cursor-pointer -mt-1">
                            <a href={news.url} target="_blank">
                                {news.title_text}
                            </a>
                        </h2>
                    </div>
                    <small><p className="text-gray-600"> <a href={news.source_link} target="_blank"> {`${(news.source_name)}`}</a>{` | ${news.published_date_readable}`} </p></small>
                    <p className="mt-1 text-gray-700 text-sm">
                        {process_summary(news.summary) /* This removes html tags */}
                    </p>

                    <div className="mt-2 flex items-center">
                        {
                            //   <span className="badge badge-pill badge-primary label-individual">{news.label !== "null" ? news.label : ""}</span>
                            //<span className="badge badge-pill badge-secondary label-individual">{news.label3 !== "null" ? news.label3 : ""}</span>
                            // <span className="badge badge-pill badge-dark label-individual">{news.label2 !== "null" ? news.label2 : ""}</span>
                        }
                        <span className="badge badge-pill badge-primary label-individual">
                            {(`${news.label2}`) + (news.label3 !== "null" ? ` > ${news.label3}` : "") + (news.label !== "null" ? ` > ${news.label}` : "")}
                        </span>

                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="news-item">
            <div className="news-title">
                <a href={news.url} target="_blank">

                    {news.title_text}
                </a>

            </div>
            <div className="news-date">
                {news.time}
            </div>
            <div className="news-labels-badge">

                <span className="badge badge-pill badge-success label-individual">{news.label !== "null" ? news.label : ""}</span>
                <span className="badge badge-pill badge-secondary label-individual">{news.label3 !== "null" ? news.label3 : ""}</span>
                <span className="badge badge-pill badge-dark label-individual">{news.label2 !== "null" ? news.label2 : ""}</span>
            </div>
        </div>
    );
}

export default NewsItem;