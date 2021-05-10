import React, { useContext, useState } from 'react';
import { NewsContext } from '../contexts/NewsContext';
import { v4 } from 'uuid';

const hierarchy = require('../hierarchy.json');
const BASE_URL = 'http://127.0.0.1:8000';


const TabBarLabel2 = () => {
    const { setLabels, label2_list, setNewsList, fetchAndSetNewsList, activeTab2, setActiveTab2 } = useContext(NewsContext);
    // const [activeTab, setActiveTab] = useState(' ');

    const getLeafLabels_2 = (label2_node) => {

        var res = []
        for (var key in hierarchy) {
            var curr_child = hierarchy[key];
            for (var i = 0; i < curr_child.length; i++) {
                const temp_keys = Object.keys(curr_child[i]);
                for (var j = 0; j < temp_keys.length; j++) {
                    if (temp_keys[j] === label2_node) {
                        res.push(...curr_child[i][temp_keys[j]]);
                        // console.log('This has to be the cliced node: ', temp_keys[j], label2_node);
                        // console.log(res);
                    }
                }
            }
        }


        return res;
    }


    const onClickLabel2 = (label) => {
        var leaf_labels = getLeafLabels_2(label);
        var to_set = [];
        // console.log('Leaf labels: ', leaf_labels);
        leaf_labels.map(leaf_label => {
            to_set.push({
                label_name: leaf_label,
                is_selected: true
            });
        });

        for (var i = 0; i < to_set.length; i++) {
            to_set[i].label_name = (to_set[i].label_name).replace(' ', '_');
        }
        setLabels(to_set);


        var label2_request = [{
            "level": "label3",
            "category": label
        }];

        setActiveTab2(label)
        fetchAndSetNewsList(label2_request, 1, true);


    }



    // const active_class = ["-mb-px mr-1 cursor-pointer", "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4", "text-blue-500 font-semibold underline"];
    // const inactive_class = ["mr-1 cursor-pointer hover:text-blue-500", "bg-silver inline-block py-2 px-4  hover:text-blue-500", "text-gray-500 font-semibold  hover:text-blue-500 hover:underline"]

    // return (
    //     <ul className="list-reset flex border-b">
    //         {label2_list.map(label => {
    //             return (
    //                 <li className={label === activeTab2 ? active_class[0] : inactive_class[0]}>
    //                     <div className={label === activeTab2 ? active_class[1] : inactive_class[1]} onClick={() => { onClickLabel2(label); }}>
    //                         <span className={label === activeTab2 ? active_class[2] : inactive_class[2]}>
    //                             {label}
    //                         </span>
    //                     </div>
    //                 </li>
    //             );
    //         })}
    //     </ul>
    // );





    const active_class = "text-gray-600 py-2 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500";
    const inactive_class = "text-gray-600 py-2 px-6 block hover:text-blue-500 focus:outline-none";


    return (
        <div className="bg-white">
            <nav className="flex flex-col sm:flex-row">
                {label2_list.map(label => {
                    return (
                        <button onClick={() => { onClickLabel2(label); }} key={v4()} className={label === activeTab2 ? active_class : inactive_class}>{label}</button>
                    );
                })}
            </nav>
        </div>
    );

    // return (
    //     // on hover, on click for each list element. include in a css file.
    //     <div>
    //         <ul className="nav nav-tabs">
    //             {label2_list.map(label => {
    //                 return (
    //                     <li onClick={() => { onClickLabel2(label) }} key={v4()} className="nav-item">
    //                         <div id={`nav-item-${label}`} style={{ color: "black", cursor: "pointer" }} className="nav-link nav-item-label2">{label}</div>
    //                     </li>
    //                 );
    //             }
    //             )}
    //         </ul>
    //     </div>

    // );
}

export default TabBarLabel2;