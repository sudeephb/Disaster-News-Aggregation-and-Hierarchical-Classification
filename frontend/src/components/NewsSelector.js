import React, { useContext, useEffect } from 'react';
import { NewsContext } from '../contexts/NewsContext';
import { v4 } from 'uuid';
import Button from 'react-bootstrap/Button';

const BASE_URL = 'http://127.0.0.1:8000';

const NewsSelector = () => {
    const { labels, setLabels, setNewsList, allCheckBoxChecked, setAllCheckBoxChecked, fetchAndSetNewsList } = useContext(NewsContext);

    async function fetchData() {
        const res = await fetch(BASE_URL + '/disaster/');
        res
            .json()
            .then(data => {
                setNewsList(data);
            })
            .catch(err => console.log('Errorrr: ', err));
    }


    // useEffect(() => { // todo: make this to run in the beginning only ?------
    //     fetchData();
    // }, [labels]);


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Submitted ==== ');
        console.log('Lables ==== ', labels);
        setLabels(labels);
        var req_labels = [...labels];
        fetchAndSetNewsList(req_labels.map(label => {
            return { label_name: label.label_name, is_selected: label.is_selected.toString() }
        }));
    }

    const setLabels_helper = (labels) => {
        // change labels array by reading each checkbox by id
    }

    const toggleCheckBox = (label) => {
        // console.log('togglecheckbox called!', document.getElementById('label_earthquake').checked);
        for (var i = 0; i < labels.length; i++) {
            if (labels[i].label_name === label.label_name)
                labels[i].is_selected = !labels[i].is_selected;
            // labels[i].is_selected = checked;
        }
    }


    const toggleAllBox = (e) => {
        let isChecked = e.target.checked;
        setAllCheckBoxChecked(isChecked);
        // console.log('All box checked-> ', allCheckBoxChecked);
        // console.log('From argument -> ', isChecked);
        // console.log('Labels === ', labels);
        let labels_new = [];
        for (let i = 0; i < labels.length; i++) {
            labels_new[i] = { "label_name": labels[i].label_name, "is_selected": isChecked }
        }

        setLabels(labels_new);
    }

    return (
        <div className="news-selector flex text-black border border-gray-400">
            <div className="mt-8 ml-4">
                <form onSubmit={handleSubmit} id="newsSelectorForm">
                    <label className="mb-3">
                        <input
                            className="mr-1"

                            id={'label_all'}
                            type="checkbox"
                            defaultChecked={true}
                            onChange={(e) => toggleAllBox(e)}
                        />
            Select all
            </label>
                    {labels.map(label => {
                        return (
                            <div key={v4()}>
                                <label>
                                    <input
                                        className="mr-1"
                                        id={`label_${label.label_name}`}
                                        type="checkbox"
                                        defaultChecked={label.is_selected}
                                        onChange={() => {
                                            toggleCheckBox(label)
                                        }}
                                    />
                                    {label.label_name}
                                </label>
                            </div>
                        );
                    })}
                    <Button type='submit' className="btn-primary">Show</Button>
                </form>
            </div>
        </div>
    );
}

export default NewsSelector;


