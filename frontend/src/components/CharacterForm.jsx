import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createCharacter} from '../features/characters/characterSlice'
import npcs from '../data/Characters/NPC'
import dialogue from '../data/Dialogue/Dialogue';
import items from '../data/Items';
import locations from '../data/Location/Location';
import questList from '../data/Quest/Quest';
import {player} from '../data/Characters/Player'
import races from '../data/Race/Race'
import classes from '../data/Classes/Classes';
import skills from '../data/Skills/Skill';

function CharacterForm() {
    const dispatch = useDispatch()

    const onSubmit = e => {
        dispatch(createCharacter({player: player, 
                                  npcs: npcs, 
                                  dialogue: dialogue, 
                                  items: items, 
                                  locations: locations, 
                                  questList: questList,
                                  races: races,
                                  classes: classes,
                                  skills: skills}))
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