const secuence = 'ABCDEFGHIJ1234567890';
let lettersString = '';
let numbersString = '';

const lettersInput = document.getElementById('lettersInput');
const numbersInput = document.getElementById('numbersInput');
const keys = document.getElementsByClassName('key');

for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    key.addEventListener('click', () => {
        if (key.id == '') {

        }
        else if (key.id == 'reset') {
            lettersString = '';
            numbersString = '';
            lettersInput.value = lettersString;
            numbersInput.value = numbersString;
        }
        else {
            const inputsString = lettersString + numbersString;
            if (inputsString == secuence)
                showAlertSwal('error', 'Oops! Ya terminaste!', 'No se pueden agregar más caracteres');
            else {
                let letter = key.id[0].toUpperCase();
                let number = key.id[2];

                let intent = inputsString + letter;
                if (intentIsValid(intent)) {
                    lettersString += letter;
                    lettersInput.value = lettersString;
                }
                else {
                    intent = inputsString + number;
                    if (intentIsValid(intent)) {
                        numbersString += number;
                        numbersInput.value = numbersString;
                        if ((lettersString + numbersString) == secuence)
                            showAlertSwal('success', 'Has terminado!', '');
                    }
                    else
                        findMissingLetters(letter, number);
                }
            }
        }

    });
}

const intentIsValid = (intent) => {
    const index = intent.length - 1;
    if (intent[index] == secuence[index])
        return true;
    return false;
};

const findMissingLetters = (letter, number) => {
    const inputsString = lettersString + numbersString;
    let missingLetters = '';

    let indexOfChar = secuence.indexOf(letter);

    if (inputsString.length < indexOfChar) {
        for (let i = inputsString.length; i < indexOfChar; i++) {
            missingLetters += secuence[i] + ', ';
        }
        showAlertSwal('error', 'Oops...', 'Faltan los caracteres ' + missingLetters + 'para poder ingresar esta letra');
    }
    else {
        indexOfChar = secuence.indexOf(number);
        if (inputsString.length < indexOfChar) {
            for (let i = inputsString.length; i < indexOfChar; i++) {
                missingLetters += secuence[i] + ', ';
            }
            showAlertSwal('error', 'Oops...', 'Faltan los caracteres ' + missingLetters + 'para poder ingresar este número');
        }
        else {
            showAlertSwal('error', 'Oops...', 'No puedes ingresar este caracter');
        }
    }
};

const showAlertSwal = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text
    });
};