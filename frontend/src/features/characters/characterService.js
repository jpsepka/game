import axios from 'axios'

const API_URL = '/api/characters/'

// Create new character
const createCharacter = async (characterData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, characterData, config)
  
  return response.data
}

// Get user character
const getCharacters = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user character
const deleteCharacter = async (characterId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  
  const response = await axios.delete(API_URL + characterId, config)

  return response.data
}

const updateCharacter = async (character, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const response = await axios.put(API_URL + character[0], character[1], config);

  return response.data;
};


const characterService = {
  createCharacter,
  getCharacters,
  deleteCharacter,
  updateCharacter
}

export default characterService