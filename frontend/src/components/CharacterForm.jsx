import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createCharacter} from '../features/characters/characterSlice'
import {Player} from '../data/Characters/Player'
import locations from '../data/Location/Location'

function CharacterForm() {
    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const onSubmit = e => {
        var player = new Player([2,4], "", "", locations.list.imperialPrisonShipDownstairs, 
            [], [1,1,1,1,1], [0,0], [0,0], [0,0], 1, [], [], [0,100], 0, [], 
            0, [], "@");
        dispatch(createCharacter(player))
        setText('')
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">
                        Add Character
                    </button>
                </div>
            </form>
        </section>
    );
}

export default CharacterForm;