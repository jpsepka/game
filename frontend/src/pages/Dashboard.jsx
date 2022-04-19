import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import CharacterForm from '../components/CharacterForm';
import Spinner from '../components/Spinner'
import CharacterItem from '../components/CharacterItem'
import { getCharacters, reset } from '../features/characters/characterSlice';
import GameWindow from '../components/GameWindow';
import TextWindow from '../components/TextWindow'
import player from '../data/Characters/Player'

function Dashboard() {
  const [target, setTarget] = useState({name: "", opinion: 0});
  const [location, setLocation] = useState(player.location);
  const [text, setText] = useState([])
  const [options, setOptions] = useState([])
  const [questLog, setQuestLog] = useState([])
  const [inventory, setInventory] = useState(player.inventory);
  const [questsCompleted, setQuestsCompleted] = useState(player.questsCompleted);
  const [map, setMap] = useState(player.location.map);
  const [characterChoice, setCharacterChoice] = useState(false);

  function click(person) {
    setOptions([])
    setTarget(person);
    setText([person.greeting]);
    person.sortDialogue();
    var test = [];
    for (var i = 0; i < person.dialogue.length; i++) {
      test[i] = person.dialogue[i].option;
    }
    setOptions(test);
  }

  function checkQuestComplete(quest) {
    var output = false;
    switch(quest.type) {
        case "Gather":
          for (var i = 0; i < inventory.length; i++) {
            if (quest.criteria[0] == inventory[i][0]) {
              if (quest.criteria[1] <= inventory[i][1]) {
                output = true
                handleQuestItemHandIn(quest)
              }
            }
          }
          break;
        default:
          console.log("default switch case");
    }
    return output
  }

  function handleQuestItems(quest) {
    setInventory(old => [...old, [quest.items, 1]])
  }

  function handleQuestItemHandIn(quest) {
    var inventoryLocation;
    for (var i = 0; i < inventory.length; i++) {
      if (quest.criteria[0] == inventory[i][0]) {
        inventoryLocation = i;
      }
    }
    var newAmount = inventory[inventoryLocation][1] - quest.criteria[1]
    var newInventory = inventory.filter((item) => item !== inventory[inventoryLocation])

    if (newAmount == 0) {
      setInventory([...newInventory])
    } else {
      var newItem = inventory[inventoryLocation]
      newItem[1] = newAmount
      setInventory([...newInventory, newItem])
    }
  }

  function checkIfQuestComplete(quest) {
    var output = false;
    for (var i = 0; i < questsCompleted.length; i++) {
      if (questsCompleted[i] == quest) {
        output = true;
      }
    }
    return output
  }

    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user } = useSelector((state) => state.auth)
    const { characters, isLoading, isError, message } = useSelector(
      (state) => state.characters
    )
  
    useEffect(() => {
      if (isError) {
        console.log(message)
      }
  
      if (!user) {
        navigate('/login')
      }
  
      dispatch(getCharacters())
  
      return () => {
        dispatch(reset())
      }
    }, [user, navigate, isError, message, dispatch])
  
    if (isLoading) {
      return <Spinner />
    }

    return (
      <>
      {characterChoice ? 
      (<>
        <GameWindow location={location} click={click} setLocation={setLocation}
          setText={setText} setOptions={setOptions} setTarget={setTarget}
          map={map} setMap={setMap} setCharacterChoice={setCharacterChoice}
          characterChoice={characterChoice} player={player}/>
        <TextWindow setOptions={setOptions} checkIfQuestComplete={checkIfQuestComplete} 
          setQuestsCompleted={setQuestsCompleted} checkQuestComplete={checkQuestComplete} 
          questLog={questLog} options={options} text={text} target={target} setText={setText} 
          setQuestLog={setQuestLog} handleQuestItems={handleQuestItems} 
          characterChoice={characterChoice}/>
      </>) : (<>
        <section className='heading'>
          <h1>Welcome {user && user.name}</h1>
          <p>Characters Dashboard</p>
        </section>

        <CharacterForm />

        <section className='content'>
          {characters.length > 0 ? (
            <div className='characters'>
            {characters.map((character) => (
              <CharacterItem key={character._id} 
                setCharacterChoice={setCharacterChoice} character={character} />
              ))}
            </div>
          ) : (
            <h3>You have not set any characters</h3>
          )}
        </section>
      </>)}
    </>
    );
}

export default Dashboard;