import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const BubblePage = props => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchColorService()
      .then(res => {
        setColors([
          ...res.data
        ]);
      })
  }, []);

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    console.log(editColor);
    axiosWithAuth().put(`http://localhost:5000/api/colors/${editColor.id}`, editColor)
      .then(res => {
         console.log(res);

          /*
            I'm likely missing something here, but this is the first way I thought
            to handle the colors not updating immediately on the page
          */
          setColors([
            ...colors.filter(color => color.id !== editColor.id),
            res.data
         ])
      })
      .catch(err => {
        console.log(err);
      })
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${colorToDelete.id}`)
      .then(res => {
        setColors([
          ...colors.filter(color => color.id !== colorToDelete.id)
        ])
      })
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
