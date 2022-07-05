import React from "react";
import { useState } from "react";
import env from '../env.json';

function Create() {

    const [url, setUrl] = useState();
    const [lineClass, setLineClass] = useState('hide');
    const [formClass, setFormClass] = useState('');

    const sendData = (obj) =>{
      setFormClass('hide');
      setLineClass('');
      fetch(env.urlBack,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(obj)
      })
        .then(res => res.json())
        .then(res=> {
        if(res.result){
          setUrl(env.url+'/'+res.url);
        }
      })
    }

    const loadDataFromForm = (event) =>{
      event.preventDefault();
      let note = event.target.elements.note.value;
      note = note.trim();
      if(note === ''){
        alert('Заполните поля');
        return false;
      }
      sendData({"note" : note})
    }

    return (
      <div>
        <form onSubmit={loadDataFromForm} className={formClass}>
          <div className="enter-form-note">
            <label htmlFor="note" className="display-3 note-label">Введите заметку</label>
            <textarea className="form-control" name="note" id="note" defaultValue="test"></textarea>
            <button type="submit" className="btn btn-outline-dark note-create">Создать</button>
            <p><b className="text-danger">Внимание!</b> Максимальная длина заметки <b>1000</b> символов.</p>
          </div>
          
        </form>
        <div className={lineClass}>
          <p className="fw-bold mt-4">{url}</p>
          <div>
            <button onClick={function() {window.location.reload()}} className="btn btn-outline-dark note-create">Создать новую замерту</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Create;