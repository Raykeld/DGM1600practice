//data.stats[0].base_stat

class Pokemon {
    constructor(id, name, stats) {
        this.id = id
        this.name = name
        this.base_stat = stats
    }
}

const Mew = new Pokemon(151, 'Mew', 100);

document.querySelector('#getHP').addEventListener('click', getHP(25))

function getHP(pokemonID) {
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
    .then(element => {
        // console.log(muddsy.stats[5].stat.name)
        const HP = element.stats.find(element => {
            return element.stat.name === 'hp'
        })
        return HP.base_stat
    })
}


document.querySelector('#pokeButton').addEventListener('click', () => {
    let pokeId = prompt("Provide the Pokemon ID you want to add:")
    let pokeIdnum = parseInt(pokeId, 10)
    if(pokeIdnum > 807) {
        alert('That pokemon ID doesnt not exist! Please enter a different ID')
        return
    } else {
    
getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
    .then(result => {
        //let newPokemon = new Pokemon(results)
    populateDOM(result)
    })
    .catch(error => console.log(error))
    }
})

async function getAPIData(url) {
    try {
        const response = await fetch(url)
    const data = await response.json()
    return data
} catch (error) {
    console.error(error)
    }
}



const theData = getAPIData('https://pokeapi.co/api/v2/pokemon/?limit=25')
.then(data  => {
    for (const pokemon of data.results) {
        getAPIData(pokemon.url).then(pokedata => {
            populateDOM(pokedata)
            // console.log(pokedata.types[0].type)
        })
    }
})

let mainHeader = document.querySelector('header')
let mainArea = document.querySelector('main')

function populateDOM(single_pokemon) {

        let pokeScene = document.createElement('div')
        let pokeCard = document.createElement('div')
        let pokeFront = document.createElement('div')
        let pokeBack = document.createElement('div')
    
        fillCardFront(pokeFront, single_pokemon)
        fillCardBack(pokeBack, single_pokemon)

        pokeScene.setAttribute('class', 'scene')
        pokeCard.setAttribute('class', 'card')
        pokeCard.appendChild(pokeFront)
        pokeCard.appendChild(pokeBack)
        pokeScene.appendChild(pokeCard)

        mainArea.appendChild(pokeScene)


        pokeCard.addEventListener( 'click', function() {
            pokeCard.classList.toggle('is-flipped');
            single_pokemon.hp = getHP(single_pokemon.id)

            pokeCard.addEventListener("mouseover", function() {
            let type = single_pokemon.types[0].type.name
    pokeCard.setAttribute("style", `border: 4px solid ${color(type)};`)
    "style",  `border: 1px solid ${color(type)}`
  })

  pokeCard.addEventListener("mouseout", function() {
    pokeCard.setAttribute("style", "border: none;")
  })
})

    }


 function fillCardFront(pokeFront, data) {
   console.log(data.types[0].type.name)


     pokeFront.setAttribute('class', 'card__face card__face--front')
     let name = document.createElement('p')
     let pic = document.createElement('img')
     pic.setAttribute('class', 'picDivs')
    let pokeNum = getPokeNumber(data.id)
    pokeFront.appendChild(name)
    name.textContent = `${data.name[0].toUpperCase()}${data.name.slice(1)}`
    pic.src = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeNum}.png`
    
   pokeFront.appendChild(pic)
   pokeFront.appendChild(name)


 }

   function fillCardBack(pokeBack, data) {
       pokeBack.setAttribute('class', 'card__face card__face--back')
       let pokeOrder = document.createElement('p')
       let pokeHP = document.createElement('p')
       let pokeType = document.createElement('p')
       let pokeAb = document.createElement('h5')
       let pokeAbilities = document.createElement('p')
       let pic = document.createElement('img')
       pokeAb.textContent = 'Abilities:'
       pic.setAttribute('class', 'picBack')
       pokeOrder.textContent = `#${data.id} ${data.name[0].toUpperCase()}${data.name.slice(1)}`
       pokeHP.textContent = 'HP: ' + getHP(data.id)
       pokeType.textContent = `Type: ${data.types.map(t => t.type.name)}`;
       pokeAbilities.innerHTML = data.abilities
       .map(a => a.ability.name)
       .reduce(
         (accumulator, currentValue) =>
           (accumulator += `<li class="pokeability">${currentValue}</li>`),
         '',
       )
       pokeBack.appendChild(pokeOrder)
       pokeBack.appendChild(pokeHP)
       pokeBack.appendChild(pokeType)
       pokeBack.appendChild(pic)
       pokeBack.appendChild(pokeAb)
       pokeBack.appendChild(pokeAbilities)
    //    pic.src = `http://www.rigelatin.net/copycat/media/cards/back/ancientmewback.jpg`
    
   }
 

function getPokeNumber(id) {
    if(id < 10) return `00${id}`
    if(id > 9 && id < 100) {
        return `0${id}`
    } else return id 
} 

