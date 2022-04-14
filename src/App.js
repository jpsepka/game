import './App.css'
import GameWindow from './components/GameWindow'
import TextWindow from './components/TextWindow'
import {useState, useEffect} from 'react'
import player from './data/Characters/Player'
import locations from './data/Location/Location'
import npcs from './data/Characters/NPC'


function App() {
  const [target, setTarget] = useState({name: "", opinion: 0});
  const [location, setLocation] = useState(player.location);
  const [text, setText] = useState([])
  const [options, setOptions] = useState([])
  const [questLog, setQuestLog] = useState([])
  const [inventory, setInventory] = useState(player.inventory);
  const [questsCompleted, setQuestsCompleted] = useState(player.questsCompleted);
  const [map, setMap] = useState(player.location.map);

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

  return (
    <>
      <GameWindow location={location} click={click} setLocation={setLocation}
      setText={setText} setOptions={setOptions} setTarget={setTarget}
      map={map} setMap={setMap}/>
      <TextWindow setOptions={setOptions} checkIfQuestComplete={checkIfQuestComplete} 
      setQuestsCompleted={setQuestsCompleted} checkQuestComplete={checkQuestComplete} 
      questLog={questLog} options={options} text={text} target={target} setText={setText} 
      setQuestLog={setQuestLog} handleQuestItems={handleQuestItems} handleQuestItemHandIn={handleQuestItemHandIn}/>
    </>
  );
}

export default App;