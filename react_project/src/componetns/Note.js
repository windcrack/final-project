import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import env from '../env.json';

function Note() {
    let { noteURL } = useParams();
    const [noteText, setNoteText] = useState('');
    const [lineClass, setLineClass] = useState('hide');
    const [formClass, setFormClass] = useState('hide');
    const [errorClass, setErrorClass] = useState('hide');

    useEffect(() =>{
      if(noteURL !== undefined){
        fetch(env.urlBack, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({"url": noteURL})
        })
          .then( res => res.json())
          .then( res => {
            if(res.result){
              setNoteText(res.note);
              setLineClass('');
              setFormClass('hide');
              setErrorClass('hide');
            }else if(!res.result){
              setLineClass('hide');
              setFormClass('hide');
              setErrorClass('');
            }
          })
      }else{
        setLineClass('hide');
        setFormClass('');
        setErrorClass('hide');
      }
    }, []);

    const getNote = (event) =>{
      event.preventDefault();
      let url = event.target.elements.url.value;
      url = url.trim();
      if(url === ''){
        alert('Запoлните плоля');
        return false;
      }
      noteURL = url;
      window.location.href = env.url+'/'+url
    }

    const searchNote = () =>{
      window.location.href=env.url
    }

    return (
      <div>
        <div className={lineClass}>
          <h4 className="display-4 bg-success text-light m-0">Note: <span className="">{noteURL}</span></h4>
          <p className="fst-normal bg-info bg-gradient p-4">{noteText}</p>
          <div>
            <button className="btn btn-outline-dark" onClick={searchNote}>Смотреть еще один note</button>
          </div>
        </div>
        <div className={errorClass}>
          <p className="text-danger display-3">Призошла ошика. Такой note не найден</p>
          <button className="btn btn-outline-dark" onClick={searchNote}>Попробовать еще раз</button>
        </div>
        <div className={formClass}>
          <form className="form-node-hash" action="" onSubmit={getNote}>
            <label htmlFor="url" className="fst-normal">Введите hash заметку</label>
            <input type="text" name="url" id="url" className="form-control" />
            <button type="submit" className="btn btn-outline-dark center">Искать note</button>
          </form>
        </div>
      </div>
    );
  }
  
  export default Note;