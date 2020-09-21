const secuence = 'ABCDEFGHIJ1234567890';
let lettersString = '';
let numbersString = '';

const letters = document.getElementById('letters');
const numbers = document.getElementById('numbers');
const keys = document.getElementsByClassName('key');

for(let i = 0; i < keys.length; i++){
    const key = keys[i];
    key.addEventListener('click', ()=>{
        if(key.id == ''){

        }
        else if(key.id == 'reset'){
            lettersString = '';
            numbersString = '';
            letters.value = lettersString;
            numbers.value = numbersString;
        }
        else{
            
            const onInputs =  lettersString + numbersString;
            if(onInputs == secuence){
                //alert('No se pueden agregar más caracteres');
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No se pueden agregar más caracteres'
                  })
            }
            else{
                let letter = key.id[0].toUpperCase();
                let number = key.id[2];
    
                let intent = onInputs + letter;
                if(intentIsValid(intent)){
                    lettersString += letter;
                    letters.value = lettersString;
                }
                else{
                    intent = onInputs + number;
                    if(intentIsValid(intent)){
                        numbersString += number;
                        numbers.value = numbersString;
                    }
                    else{
                        findMissingLetters(letter, number);
                    }
                }
            }
        }

    });
}

const intentIsValid = (intent)=>{
    const index = intent.length - 1;
    if(intent[index] == secuence[index])
        return true;
    return false;
};

const findMissingLetters = (letter, number)=>{
    const onInputs = lettersString + numbersString;
    let missingLetters = '';

    if(secuence.indexOf(letter) <= (onInputs.length - 1)){
        if(secuence.indexOf(number) <= (onInputs.length - 1)){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No puedes ingresar este caracter'
              })
        }
        else{
            for(let i = onInputs.length; i < secuence.indexOf(number); i++){
                missingLetters += secuence[i] + ', ';
            }
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Faltan los caracteres ' + missingLetters + 'para poder ingresar este número'
              })
        }       
    }
    else{
        for(let i = onInputs.length; i < secuence.indexOf(letter); i++){
            missingLetters += secuence[i] + ', ';
        }
        //alert('Faltan los caracteres ' + missingLetters + 'para poder ingresar esta letra');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Faltan los caracteres ' + missingLetters + 'para poder ingresar esta letra'
          })
    }
};