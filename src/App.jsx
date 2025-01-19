import { useState, useEffect } from 'react'
import '../src/assets/styles/App.css'
import { use } from 'react'

const Button = ({className = "none", handleClick, displayImage = "none", content = "click me"}) => {
    return(
        <button className={className} onClick={handleClick}>
            <img src={displayImage} alt="" />
            {content}
        </button>
    )
}

const getPokemon = async(setPokeList, setPokeListLength) => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000000&offset=0")

    const data = await response.json()

    const numberSet = new Set()

    for (let i = 0; i < 3; i++){
        let randomInt = generateRandomNumber()
        numberSet.add(randomInt)

        while (numberSet.size < (i + 1)){
            randomInt = generateRandomNumber()
            numberSet.add(randomInt)
        }
        
        const url = data['results'][randomInt]['url']
        const randomID = crypto.randomUUID();

        setPokeList((prevList) => {
            const newList = [...prevList]
            newList.push({'url': url, id: randomID})
            newList.push({'url': url, id: randomID})
            return newList
        })
        setPokeListLength((prev) => {
            return prev + 2
        })
    }
   

}

const generateRandomNumber = () => {
    const max = 1303
    const randomInt = Math.floor(Math.random()*max)
    return randomInt.toString()
}

const startGame = (setGameFlag, setPokeList, setPokeListLength) => {

    setGameFlag((prev) => !prev)
    getPokemon(setPokeList, setPokeListLength)
}




const shufflePokeList = (setPokeList) => {
    setPokeList((prevList) => {
        const newList = [...prevList];
        newList.sort(() => Math.random() - 0.5);  // Randomize order by sorting with random comparator
        return newList;
    });
}



function App() {
    const [gameFlag, setGameFlag] = useState(true)
    const [pokeList, setPokeList] = useState(new Array())
    const [pokeListLenght, setPokeListLength] = useState(0)

    useEffect(() => {
        if (pokeListLenght === 6){
            shufflePokeList(setPokeList)
            shufflePokeList(setPokeList)
        }
    }, [pokeListLenght])
    useEffect(() => {
        //console.log(pokeList)
    }, [pokeList])
    return(
        <>
        { gameFlag && (
            <Button content='Start Game' handleClick={() => startGame(setGameFlag, setPokeList, setPokeListLength)}/>
        )}
        { !gameFlag && (
            <Button content='Shuffle' handleClick={() => shufflePokeList(setPokeList)}/>
        )}
        </>
    )
}

export default App
