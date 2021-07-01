import './App.css';
import Typewriter from 'typewriter-effect';
import {useState} from "react";
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';

function App() {

  // CRUD | Create
  const [nom, setNom] = useState('');

  const addArgo = () => {
    Axios.post('http://localhost:3001/create', {name: nom}).then(() => {
      console.log('Success');
      setNom('');
    })
  };

  // CRUD | Read
  const [argoList, setArgoList] = useState([]);

  const getArgo = () => {

    // Afficher | Cacher
    const showContent = document.getElementsByClassName('showArgos')[0];
    if (showContent.style.display === 'block') {
      showContent.style.display = 'none';
    } else {
      showContent.style.display = 'block';
    }

    Axios.get('http://localhost:3001/show').then((response) => {
      setArgoList(response.data);
    })
    
  };

  // CRUD | Update


  // CRUD | Delete
  const deleteArgo = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      setArgoList(argoList.filter((val) => {
        return val.id !== id
      }))
    })
  };


  return (
    <div className="App">
      
      <header className="header">
        <img src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png" alt="Wild Code School logo" />
        <h1>DevChallenge</h1>
      </header>

      <div className="accueil">
        <div className="animTxt">
          <Typewriter
            options={{
              loop:true, 
              deleteSpeed:15
            }}
            onInit={(animTxt) => {
              animTxt.changeDelay(40)
              .typeString('Bienvenue <strong>Jeune <span style="color: #ffd700">Argonaute</span> ! </strong>')
              .pauseFor(500)
              .typeString('<br>Descends pour rejoindre l\'Equipage')
              .pauseFor(800)
              .deleteChars(34)
              .pauseFor(200)
              .typeString('Aides-nous à trouver la Toison d\'or !')
              .pauseFor(800)
              .deleteAll()
              .pauseFor(800)
              .start();
            }}
          />
        </div>
      </div>

      <div className="add">
        <h2>Prends part à l'Aventure !</h2>
        <label>Entres ton Nom : </label>
        <br />
        <input type="text" placeholder="Ex: Marco Paulo.." value={nom} onChange={(event) => {
          setNom(event.target.value);
        }} />
        <br /><br />
        <button className="btn" onClick={addArgo}>Rejoindre l'équipage</button>
      </div>

      <hr />

      <div className="show">
        <h2>Membres de l'équipage</h2>
        <button className="btn" onClick={getArgo}>Afficher l'équipage</button>
        <div className="showArgos">
          <Grid container spacing={6}>
            {argoList.map((val, key) => {
              return <Grid item xs={4}>
                <div className="showArgo">
                  <h4>{val.name}</h4>
                  <button className="sbtn upbtn"></button>
                  <button className="sbtn delbtn" onClick={() => {deleteArgo(val.id)}}></button>
                </div>
              </Grid>
            })}
          </Grid>
        </div>
      </div>

      <footer className="footer">
        <p>Réalisé par Jason en Anthestérion de l'an 515 avant JC en Feat avec Moi en personne</p>
      </footer>

    </div>
  );
}

export default App;
