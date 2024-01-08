const btnSearch = document.querySelector('#send-btn')
const tryAgain = document.querySelector('.try-again')

btnSearch.addEventListener('click', () => {
    if(!validation()) return
    showLoanding()
    catchJson()      
})

tryAgain.addEventListener('click', () => {
    const divResult = document.querySelector('.result')
    const perfilInfos = document.querySelector('.perfil-infos')

    divResult.style.display = 'none'
    perfilInfos.style.display = 'block'
})

const showLoanding = () => {
    const perfilScreen = document.querySelector('.perfil')
    const loadingSreen = document.querySelector('.c-loader')
    const divResult = document.querySelector('.result')
    const perfilInfos = document.querySelector('.perfil-infos')
    
    perfilScreen.style.display = 'none'
    loadingSreen.style.display = 'block'

    setTimeout(() => {
        perfilScreen.style.display = 'block'
        perfilInfos.style.display = 'none'
        divResult.style.display = 'block'
        loadingSreen.style.display = 'none'
    }, 2000)
}

// O usuário escolhe as opções e o software busca no Json se tem algum dado que o atende.

const catchJson = () => {
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default' 
    }

    fetch('arquivoJson/pessoas.json', options)
    .then(response => response.json()) 
    .then(peoples => {        
        searchWorker(peoples)
    })
    .catch(e => console.error(e.message))
}
   
const returnData = () => {
    const selectExp = document.querySelector('#exp')
    let exp = ''
    const selectPay = document.querySelector('#payment')
    let payment = ''
    const selectAge = document.querySelector('#age')
    let age = ''
    const selectGender = document.querySelector('#gender')
    let gender = ''

    switch (selectExp.selectedIndex) {
        case 1: 
            exp = 'jr'
            break 
        case 2:
            exp = 'pl'
            break 
        case 3: 
            exp = 'sr'
            break 
        default: 
            exp = false
            break
    }

    switch (selectPay.selectedIndex) {
        case 1: 
            payment = 'até 5k'
            break 
        case 2:
            payment = '5k à 8k'
            break 
        case 3: 
            payment = 'maisde8k'
            break 
        default: 
            payment = false
            break
    }

    switch (selectAge.selectedIndex) {
        case 1: 
            age = 'até 25'
            break 
        case 2:
            age = 'até 35'
            break 
        case 3: 
            age = '36mais'
            break 
        default: 
            age = false
            break
    }

    switch (selectGender.selectedIndex) {
        case 1: 
            gender = 'M'
            break 
        case 2:
            gender = 'F'
            break
        default: 
            gender = false
            break
    }

    let workersData = [exp, payment, age, gender]
    
    return workersData
}
    
const searchWorker = (json) => {
    let valid = true
    let checkValid = []
    let foundWorker 
    const workersData = returnData()
    const exp = workersData[0]
    const payment = workersData[1]
    const age = workersData[2]
    const gender = workersData[3]
    let genderChoose = []

    for (let i = 0; i < 3; i++) {
        const altExp = ['jr', 'pl', 'sr']
        const altPayment = ['até 5k', '5k à 8k', 'maisde8k']
       
        if(exp === altExp[i] && payment === altPayment[i] && age === 'até 25' && gender === 'M') {
            if (i === 0) {
                genderChoose = jr25(json).filter(pessoas => pessoas.sexo === 'M')
                foundWorker = randomChoose(0, genderChoose.length - 1, genderChoose)    
            } else if (i === 1) {
                genderChoose = pl25(json).filter(pessoas => pessoas.sexo === 'M')
                foundWorker = randomChoose(0, genderChoose.length - 1, genderChoose)
            } else {
                genderChoose = sr25(json).filter(pessoas => pessoas.sexo === 'M')
                foundWorker = randomChoose(0, genderChoose.length - 1, genderChoose)
            }                
        } else if (exp === altExp[i] && payment === altPayment[i] && age ===   'até 25' && gender === 'F') {
            if (i === 0) {
                genderChoose = jr25(json).filter(pessoas => pessoas.sexo === 'F')
                foundWorker = randomChoose(0, genderChoose.length - 1, genderChoose)    
            } else if (i === 1) {
                genderChoose = pl25(json).filter(pessoas => pessoas.sexo === 'F')
                foundWorker = randomChoose(0, genderChoose.length - 1, genderChoose)
            } else {
                genderChoose = sr25(json).filter(pessoas => pessoas.sexo === 'F')
                foundWorker = randomChoose(0, genderChoose.length - 1, genderChoose)
            }        
        } else if(exp === altExp[i] && payment === altPayment[i] && age === 'até 35' && gender === 'M') {
            if (i === 0) {
                genderChoose = jr35(json).filter(pessoas => pessoas.sexo === 'M')
                foundWorker = randomChoose(0, genderChoose.length - 1, genderChoose)    
            } else if (i === 1) {
                genderChoose = pl35(json).filter(pessoas => pessoas.sexo === 'M')
                foundWorker = randomChoose(0, genderChoose.length - 1, genderChoose)
            } else {
                genderChoose = sr35(json).filter(pessoas => pessoas.sexo === 'M')
                foundWorker = randomChoose(0, genderChoose.length - 1, genderChoose)
            }        
        } else if(exp === altExp[i] && payment === altPayment[i] && age === 'até 35' && gender === 'F') {
            if (i === 0) {
                genderChoose = jr35(json).filter(pessoas => pessoas.sexo === 'F')
                foundWorker = randomChoose(0, genderChoose.length - 1, genderChoose)    
            } else if (i === 1) {
                genderChoose = pl35(json).filter(pessoas => pessoas.sexo === 'F')
                foundWorker = randomChoose(0, genderChoose.length - 1, genderChoose)
            } else {
                genderChoose = sr35(json).filter(pessoas => pessoas.sexo === 'F')
                foundWorker = randomChoose(0, genderChoose.length - 1, genderChoose)
            }        
        } else if(exp === altExp[i] && payment === altPayment[i] && age === '36mais' && gender === 'M') {
            if (i === 0) {
                genderChoose = jr36more(json).filter(pessoas => pessoas.sexo === 'M')
                foundWorker = randomChoose(0, genderChoose.length - 1, genderChoose)    
            } else if (i === 1) {
                genderChoose = pl36more(json).filter(pessoas => pessoas.sexo === 'M')
                foundWorker = randomChoose(0, genderChoose.length - 1, genderChoose)
            } else {
                genderChoose = sr36more(json).filter(pessoas => pessoas.sexo === 'M')
                foundWorker = randomChoose(0, genderChoose.length - 1, genderChoose)
            }        
        } else if(exp === altExp[i] && payment === altPayment[i] && age === '36mais' && gender === 'F') {
            if (i === 0) {
                genderChoose = jr36more(json).filter(pessoas => pessoas.sexo === 'F')
                foundWorker = randomChoose(0, genderChoose.length - 1, genderChoose)    
            } else if (i === 1) {
                genderChoose = pl36more(json).filter(pessoas => pessoas.sexo === 'F')
                foundWorker = randomChoose(0, genderChoose.length - 1, genderChoose)
            } else {
                genderChoose = sr36more(json).filter(pessoas => pessoas.sexo === 'F')
                foundWorker = randomChoose(0, genderChoose.length - 1, genderChoose)
            }       
        } else {
            checkValid.push('false')
            if(checkValid.length > 2) valid = false
        }
    }

    showResult(foundWorker, valid)

}

function randomChoose(min = 0, max, genderChoose) {
    const randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
    return genderChoose[randomIndex]
}

function jr25 (json) {
    const jr25 = json.filter(pessoas => {
        return pessoas.salario < 5000
        && pessoas.idade <= 25
    })

    return jr25
}

function jr35 (json) {
    const jr35 = json.filter(pessoas => {
        return pessoas.salario < 5000
        && pessoas.idade <= 35
    })

    return jr35
}

function jr36more (json) {
    const jr36more = json.filter(pessoas => {
        return pessoas.salario < 5000
        && pessoas.idade > 35
    })

    return jr36more
}

function pl25 (json) {
    const pl25 = json.filter(pessoas => {
        return pessoas.salario > 5000
        && pessoas.salario <= 8000
        && pessoas.idade <= 25
    })

    return pl25
}

function pl35 (json) {
    const pl35 = json.filter(pessoas => {
        return pessoas.salario > 5000
        && pessoas.salario <= 8000
        && pessoas.idade <= 35
    })

    return pl35
}

function pl36more (json) {
    const pl36more = json.filter(pessoas => {
        return pessoas.salario > 5000
        && pessoas.salario <= 8000
        && pessoas.idade > 35
    })

    return pl36more
}

function sr25 (json) {
    const sr25 = json.filter(pessoas => {
        return pessoas.salario > 8000
        && pessoas.idade <= 25
    })

    return sr25
}

function sr35 (json) {
    const sr35 = json.filter(pessoas => {
        return pessoas.salario > 8000
        && pessoas.idade <= 35
    })

    return sr35
}

function sr36more (json) {
    const sr36more = json.filter(pessoas => {
        return pessoas.salario > 8000
        && pessoas.idade > 35
    })

    return sr36more
}

function changePhoto() {
    const perfilPhoto = document.querySelector('.perfil-photo')
    const workersData = returnData()

    if(workersData[3] === 'M') {
        perfilPhoto.classList.remove('photo-women')
        perfilPhoto.classList.add('photo-men')

    } else if (workersData[3] === 'F') {
        perfilPhoto.classList.remove('photo-men')
        perfilPhoto.classList.add('photo-women')
    }

    return workersData
}

function validation() {
    const workersData = changePhoto()
    for(let msgError of document.querySelectorAll('.invalidation-msg')) {
        msgError.remove()
    }

    if( workersData[0] === false 
        || workersData[1] === false
        || workersData[2] === false
        || workersData[3] === false) {
            const div = document.createElement('div')
            div.innerHTML = '*Selecione todos os campos para continuar*'
            div.setAttribute('class', 'invalidation-msg')
            btnSearch.insertAdjacentElement('beforebegin', div)

            return false            
        } 

    return true
}

function showResult(tracked, valid) {
    const divResult = document.querySelector('.result')
    const senioridade = document.querySelector('#senioridade')
    let experience 
    console.log(valid)
    for(property in tracked) {
        if(valid) {
            if(divResult.querySelector('#'+ property)){            
                if(tracked.salario <= 5000) experience = 'Junior'
                if(tracked.salario > 5000 && tracked.salario <= 8000)
                experience = 'pleno'
                if(tracked.salario > 8000) experience = 'Senior'
        
                divResult.querySelector('#'+ property).innerHTML += tracked[property]

            } else {
                divResult.innerHTML = 'aaaaaaaaaaaaaaaaaaaaaa'
            }           
        }
    } 
    senioridade.innerHTML += experience    
}