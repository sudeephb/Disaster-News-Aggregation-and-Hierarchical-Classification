const hierarchy = require('./hierarchy.json');

const getLeafLabels_1 = (label1_node) => {
    
    var res = []

    label1_node = label1_node.toLowerCase();

    if (label1_node === 'all') {
        for (var root_key in hierarchy) {
            curr_tree = hierarchy[root_key];
            // console.log(root_key)
            for (var i = 0; i < curr_tree.length; i++) {
                for (var key in curr_tree[i]) {
                    res.push(...curr_tree[i][key]);
                }
            }
        }
        return res;
    }

    if (!hierarchy[label1_node]){
        return res;
    }
    
    curr_tree = hierarchy[label1_node];
    for (var i = 0; i < curr_tree.length; i++){
        for(var key in curr_tree[i]){
            res.push(...curr_tree[i][key]);
        }
    }

    return res;
}

console.log(getLeafLabels_1('Technfdological'))