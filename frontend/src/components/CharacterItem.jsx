import {useDispatch} from 'react-redux';
import {deleteCharacter} from '../features/characters/characterSlice'

function CharacterItem({character, setCharacterChoice}) {
    const dispatch = useDispatch();
    console.log("character:")
    console.log(character._id);
    return (
        <div className="character">
            <div>
                {new Date(character.createdAt).toLocaleString('en-US')}
            </div>
            <h2>{character.character.name}</h2>
            <h3>Level: {character.character.level}</h3>
            <button onClick={() => setCharacterChoice(character)}>Play</button>
            <button onClick={() => dispatch(deleteCharacter(character._id))} className="close">X</button>
        </div>
    );
}

export default CharacterItem;