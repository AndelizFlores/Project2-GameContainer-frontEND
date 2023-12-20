import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../services/external_urls'

const GameContext = createContext()

const GameProvider = ({children}) => {

    const [games, setGames] = useState([])

    const getGames =   () => {
      
        axios.get(BACKEND_URL + '/games').then((response) => {
            
                setGames(response.data) 
                console.log("length of games array", response.data.length)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getGames()
    }, [])


    return (
        <GameContext.Provider value={{ games, getGames }}>
            {children}
        </GameContext.Provider>
    )
}

export { GameContext, GameProvider }