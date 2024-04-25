function binary_c(word) {
    let binary_result = "";

    for (let i = 0; i < word.length; i++) {
        let ascii_value = word.charCodeAt(i);

        let binary_representation = ascii_value.toString(2);

        binary_representation = binary_representation.padStart(8, '0');

        binary_result += binary_representation;
    }

    return binary_result;
}

function word_c(binary_string) {
    let binary_chunks = [];
    for (let i = 0; i < binary_string.length; i += 8) {
        binary_chunks.push(binary_string.substring(i, i + 8));
    }
    let word_result = '';
    for (let chunk of binary_chunks) {
        let decimal_value = parseInt(chunk, 2);
        let character = String.fromCharCode(decimal_value);
        word_result += character;
    }

    return word_result;
}

txt = "he sun rises.Birds chirp.Flowers bloom.Life awakens.A new day begins.Opportunities await.Embrace them.Smile often.Be kind.Spread joy.Chase dreams.Overcome fears.Learn constantly.Grow stronger.Connect with others.Build bridges.Break barriers.Love deeply.Forgive quickly.Appreciate moments.Find purpose.Be grateful.Seek happiness.Pursue passions.Explore the world.Discover yourself.Make memories.Laugh wholeheartedly.Cry when needed.Rest peacefully.Tomorrow is a new chance.Seize it.Live fully.Be you.Share stories.Listen attentively.Show empathy.Practice patience.Choose kindness.Inspire others.Foster creativity.Support dreams.Celebrate success.Learn from failure.Adapt to change.Face challenges.Stay resilient.Value time.Treasure friendships.Cherish family.Enjoy solitude.Reflect often.Choose love.Practice gratitude.Give generously.Stay humble.Work hard.Play harder.Stay curious.Cultivate mindfulness.Embrace simplicity.Prioritize well-being.Connect with nature.Live intentionally.Celebrate diversity.Be inclusive.Stand for justice.Speak up.Advocate for others.Make a difference.Leave a legacy.Follow passions.Create art.Dance freely.Sing loudly.Read voraciously.Write passionately.Explore flavors.Cook deliciously.Exercise regularly.Sleep deeply.Dream big.Set goals.Achieve them.Stay optimistic.Face challenges with courage.Never give up.Be resilient.Inspire greatness.Radiate positivity.Share love.Be compassionate.Build community.Leave a mark.Leave the world better.With every full stop, a new beginning.Embrace life's journey.Carve your path.Make every moment count.Believe in yourself.The possibilities are endless.Keep moving forward.Enjoy the adventure.Life is beautiful.Embrace uncertainty.Live authentically.Challenge yourself.Seek knowledge.Embrace diversity.Be open-minded.Express gratitude.Experience joy.Seize opportunities.Cultivate resilience.Learn from mistakes.Be present.Listen to your heart.Follow your intuition.Explore the unknown.Be adventurous.Embrace change.Live passionately.Find inner peace.Cherish love.Be compassionate.Give back.Be mindful.Stay positive.Laugh often.Create memories.Enjoy silence.Observe nature.Celebrate small victories.Appreciate simplicity.Share wisdom.Spread kindness.Inspire others.Be the light.Shine brightly.Dream endlessly.Love boundlessly."

function pwd_encode(txt, binary_num) {
    let txt_list = txt.split('.');
    let res = [];
    for (let i = 0; i < binary_num.length; i++) {
        if (binary_num[i] === "0") {
            res.push(txt_list[i] + ".");
        } else {
            res.push(txt_list[i] + ". ");
        }
    }

    let encoded_txt = res.join('');
    encoded_txt += 'z1';
    return encoded_txt;
}

function pwd_decode(txt) {
    let decoded_bin = '';

    for (let i = 0; i < txt.length; i++) {
        if (i < txt.length - 2) {
            if (txt[i] === '.' && txt[i + 1] !== ' ') {
                decoded_bin += '0';
            } else if (txt[i] === '.' && txt[i + 1] === ' ') {
                decoded_bin += '1';
            } else if (txt[i] === 'z' && txt[i + 1] === '1') {
                break;
            }
        } else {
            break;
        }
    }

    return decoded_bin;
}


// Encoder
function encoder(text, key) {
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
        let charCode = (text.charCodeAt(i) + parseInt(key)) % 256;
        encryptedText += String.fromCharCode(charCode);
    }

    let encodedText = btoa(encryptedText);

    return encodedText;
}

// Decoder
function decoder(text, key) {
    let decodedText = atob(text);
    let decryptedText = '';
    for (let i = 0; i < decodedText.length; i++) {
        let charCode = (decodedText.charCodeAt(i) - parseInt(key) + 256) % 256;
        decryptedText += String.fromCharCode(charCode);
    }

    return decryptedText;
}



//password generator
function generatePassword(length, minUppercase = 1, minLowercase = 1, minDigits = 1, minSymbols = 1) {
    const totalRequirements = minUppercase + minLowercase + minDigits + minSymbols;
    if (length < totalRequirements) {
        throw new Error("Password length must be greater than or equal to the total number of requirements.");
    }

    const uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz";
    const digitCharacters = "0123456789";
    const symbolCharacters = "!@#$%^&*()-_=+";

    let password = '';
    password += getRandomCharacters(uppercaseCharacters, minUppercase);
    password += getRandomCharacters(lowercaseCharacters, minLowercase);
    password += getRandomCharacters(digitCharacters, minDigits);
    password += getRandomCharacters(symbolCharacters, minSymbols);

    const remainingLength = length - totalRequirements;
    const allCharacters = uppercaseCharacters + lowercaseCharacters + digitCharacters + symbolCharacters;
    password += getRandomCharacters(allCharacters, remainingLength);

    return shuffleString(password);
}

function getRandomCharacters(characters, count) {
    let result = '';
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

function shuffleString(string) {
    const characters = string.split('');
    for (let i = characters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]];
    }
    return characters.join('');
}

//strength checking function
function strength_checker(pwd) {
    let special_symbol = 0, numbers = 0, lowercase = 0, uppercase = 0;
    if (pwd.length < 8) {
        return 'very weak';
    } else {
        for (let i = 0; i < pwd.length; i++) {
            if (pwd[i] >= 'A' && pwd[i] <= 'Z') {
                uppercase = 1;
                continue;
            } else if (pwd[i] >= 'a' && pwd[i] <= 'z') {
                lowercase = 1;
                continue;
            } else if (!isNaN(pwd[i])) {
                numbers = 1;
                continue;
            } else if ("!@#$%^&*()-_=+".includes(pwd[i])) {
                special_symbol = 1;
            }
        }
        let summation = uppercase + lowercase + numbers + special_symbol;
        let length = pwd.length;
        let strength = length + summation;
        if (strength === 8) {
            return 'very weak';
        } else if (strength === 9) {
            return 'weak';
        } else if (strength === 10) {
            return 'normal';
        } else if (strength === 11) {
            return 'strong';
        } else if (strength >= 12) {
            return 'very strong';
        }
    }
}

//password disguiser

function disguisePassword() {
    var password = document.getElementById("password").value;
    var disguisedPassword = disguisePasswordAlgorithm(password);
    document.getElementById("output").innerHTML = disguisedPassword;
}

function disguisePasswordAlgorithm(password) {
    let binary_equv = binary_c(password)
    return pwd_encode(txt, binary_equv);
}

document.getElementById("copy-btn").addEventListener("click", function() {
    var content = document.getElementById("output").textContent;
    var textarea = document.createElement("textarea");
    textarea.value = content;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand("copy");
        alert("Text copied to clipboard!");
    } catch (err) {
        console.error("Failed to copy text:", err);
    } finally {
        document.body.removeChild(textarea);
    }
});




//password exposer
function exposePassword() {
    var disguisedText = document.getElementById("disguisedText").value;
    var decodedPassword = exposerPasswordAlgorithm(disguisedText);
    document.getElementById("output").innerHTML = decodedPassword;
}

function exposerPasswordAlgorithm(disguisedText) {
    var og_bin = pwd_decode(disguisedText);
    return word_c(og_bin);
}


//encoder
function encodedpassword(){
    let password_en = document.getElementById("originalPassword").value;
    let encoding_key = document.getElementById("encodingKey").value;
    let encodedpaswword = encoder(password_en, encoding_key);
    document.getElementById("output").innerHTML = encodedpaswword;
}

// decoder
function decodedpassword(){
    let encoded_text = document.getElementById("encodedText").value;
    let decoding_key = document.getElementById("decodingKey").value;
    let decoded_password = decoder(encoded_text,decoding_key)
    document.getElementById("output").innerHTML = decoded_password;
}



function generatepassword() {
    let length = document.getElementById("length").value;
    if (!isNaN(length)) {
        let length_int = parseInt(length);
        if (length_int >= 8) {
            let password1 = generatePassword(length_int);
            document.getElementById("output").innerHTML = password1;
        } else {
            alert("Password length must be at least 8 characters.");
        }
    } else {
        alert("Please enter a valid number for password length.");
    }
}

function strengthchecker(){
    let strength = document.getElementById("Strength").value;
    let checker = strength_checker(strength)
    document.getElementById("output").innerHTML = "<strong>Password:</strong><br>" + checker;
}



// share button
function openShareMenu() {
    const textToShare = 'Check out this password disguiser tool!';
    
    if (navigator.share) {
        navigator.share({
            title: 'Password Disguiser Tool',
            text: textToShare,
        })
        .then(() => console.log('Shared successfully'))
        .catch(error => console.error('Error sharing:', error));
    } else {
        alert('Sharing is not supported on this browser.');
    }
}

document.getElementById('shareButton').addEventListener('click', openShareMenu);
