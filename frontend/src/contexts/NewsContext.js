import React, { createContext, useState, useEffect } from 'react';
const hierarchy = require('../hierarchy.json');

export const NewsContext = createContext();

const NEWS_PER_PAGE = 15

const BASE_URL = 'http://127.0.0.1:8000';

const NewsContextProvider = (props) => {
    const [newsList, setNewsList] = useState([]);
    const [labels, setLabels] = useState([]);
    const [label2_list, setLabel2List] = useState([]);
    const [allCheckboxChecked, setAllCheckBoxChecked] = useState(true);
    const [newsCount, setNewsCount] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab2, setActiveTab2] = useState('');

    
    const [requestArray, setRequestArray] = useState([{
        "level": "label2",
        "category": "all"
    }]);


    function fetchLabels(){
        var res = []
            for (var root_key in hierarchy) {
                var curr_tree = hierarchy[root_key];
                // console.log(root_key)
                for (var i = 0; i < curr_tree.length; i++) {
                    for (var key in curr_tree[i]) {
                        res.push(...curr_tree[i][key]);
                    }
                }
            }

        var to_set = [];
        res.map(leaf_label => {
            to_set.push({
                label_name: leaf_label,
                is_selected: true
            });
        });
            setLabels(to_set);
    }

    useEffect(()=>{
        // console.log('NewsContext provider useeffect called====----');
        fetchLabels();
        fetchAndSetNewsList(requestArray);
    }, []);


    async function fetchAndSetNewsList(request_array, page=1, setAllCheckbox = false){
        const requestOptions = {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request_array)
        };
        fetch(`${BASE_URL}/disaster/?page_no=${page}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                // console.log('Data after post request ---- ', data);
                setNewsList(data);
            });
        fetch(`${BASE_URL}/disaster/count/`, requestOptions)
            .then(res => res.json())
            .then(data => {
                setNewsCount(data);
            })

        setRequestArray(request_array);

        if (page === 1)
            setCurrentPage(1);

        if (setAllCheckbox === true)
            setAllCheckBoxChecked(true)
    }
    

    return ( 
        <NewsContext.Provider value={{ newsList: newsList,
                                        labels,
                                        setLabels,
                                        setNewsList,
                                        label2_list, 
                                        setLabel2List, 
                                        allCheckboxChecked, 
                                        setAllCheckBoxChecked, 
                                        newsCount, 
                                        setNewsCount, 
                                        fetchAndSetNewsList,
                                        requestArray,
                                        setRequestArray,
                                        currentPage,
                                        setCurrentPage,
                                        activeTab2,
                                        setActiveTab2
                                    }}>
            {props.children}
        </NewsContext.Provider>
     );
}
 
export default NewsContextProvider;