import {useDispatch} from 'react-redux';
import {deleteCharacter} from '../features/characters/characterSlice'

function CharacterItem({setCharacterChoice, character}) {
    const dispatch = useDispatch();
    return (
        <div className="character">
            <div>
                {new Date(character.createdAt).toLocaleString('en-US')}
            </div>
            <h2>
                {character.character.player.name == undefined
                ? ""
                : character.character.player.name}
            </h2>
            <h3>Level {character.character.player.level} 
            {character.character.player.race == ""
            ? ""
            : ` ${character.character.player.race.name}`}
            {character.character.player.class == undefined
            ? ""
            : ` ${character.character.player.class.name}`}</h3>
            <button onClick={() => setCharacterChoice(character)}>Play</button>
            <button onClick={() => dispatch(deleteCharacter(character._id))} className="close">X</button>
        </div>
    );
}

export default CharacterItem;