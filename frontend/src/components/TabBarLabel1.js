import React, { useContext, useState } from 'react';
import { NewsContext } from '../contexts/NewsContext';
import { v4 } from 'uuid';

const hierarchy = require('../hierarchy.json');
const BASE_URL = 'http://127.0.0.1:8000';




const TabBarLabel1 = () => {
  const { setLabels, labels, setLabel2List, setNewsList, newsList, fetchAndSetNewsList, setActiveTab2 } = useContext(NewsContext);
  const [activeTab, setActiveTab] = useState('all');

  const label1_list = ['all'];

  for (var key in hierarchy) {
    label1_list.push(key);
  }



  const getLeafLabels_1 = (label1_node) => {

    var res = []

    label1_node = label1_node.toLowerCase();

    if (label1_node === 'all') {
      for (var root_key in hierarchy) {
        var curr_tree = hierarchy[root_key];
        // console.log(root_key)
        for (var i = 0; i < curr_tree.length; i++) {
          for (var key in curr_tree[i]) {
            res.push(...curr_tree[i][key]);
          }
        }
      }
      return res;
    }

    if (!hierarchy[label1_node]) {
      return res;
    }

    curr_tree = hierarchy[label1_node];
    for (var i = 0; i < curr_tree.length; i++) {
      for (var key in curr_tree[i]) {
        res.push(...curr_tree[i][key]);
      }
    }

    return res;
  }

  const getImmediateChildren_label1 = (label) => {
    // label is an array, each of the elements in an array is an object
    var res = [];
    if (hierarchy[label]) {
      for (var i = 0; i < hierarchy[label].length; i++) {
        res.push(...Object.keys(hierarchy[label][i]))
      }
    }
    // console.log(`immediate children of ${label} are: `, res);
    return res;
  }

  const onClickLabel1 = (label) => {
    // console.log('On click called on', label);
    var leaf_labels = getLeafLabels_1(label);
    var label2_children = getImmediateChildren_label1(label);
    setLabel2List(label2_children);

    var to_set = [];
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


    var label1_request = [{
      "level": "label2",
      "category": label.replace(" ", "_")
    }]

    setActiveTab(label)
    setActiveTab2('')
    console.log('Active tab ========== ', activeTab);
    fetchAndSetNewsList(label1_request, 1, true);


  }



  // const active_class = "text-gray-600 py-2 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500";
  // const inactive_class = "text-gray-600 py-2 px-6 block hover:text-blue-500 focus:outline-none";

  const active_class = ["-mb-px mr-1 cursor-pointer", "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4", "text-blue-500 font-semibold underline"];
  const inactive_class = ["mr-1 cursor-pointer hover:text-blue-500", "bg-silver inline-block py-2 px-4  hover:text-blue-500", "text-gray-500 font-semibold  hover:text-blue-500 hover:underline"]

  return (
    <ul className="list-reset flex border-b">
      {label1_list.map(label => {
        return (
          <li key={v4()} className={label === activeTab ? active_class[0] : inactive_class[0]}>
            <div className={label === activeTab ? active_class[1] : inactive_class[1]} onClick={() => { onClickLabel1(label); }}>
              <span className={label === activeTab ? active_class[2] : inactive_class[2]}>
                {label}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );


  return (
    <div className="bg-white">
      <nav className="flex flex-col sm:flex-row">
        {label1_list.map(label => {
          return (
            <button onClick={() => { onClickLabel1(label); }} key={v4()} className={label === activeTab ? active_class : inactive_class}>{label}</button>
          );
        })}
      </nav>
    </div>
  );

  // const active_class = "nav-link active";
  // const inactive_class = "nav-link";

  //   return ( 
  //     <div>
  //       <ul className = "nav nav-tabs">
  //         {label1_list.map(label => {
  //           return(
  //           <li onClick={()=>{onClickLabel1(label); fix_active_tab(label);}} key={v4()} className="nav-item">
  //               <div id={`nav-item-${label}`} style={{ color: "black", cursor: "pointer" }} className={label === activeTab ? active_class : inactive_class}>{label}</div>
  //             </li>
  //           );
  //         }
  //         )}
  //       </ul>
  //     </div>

  // );

}

export default TabBarLabel1;