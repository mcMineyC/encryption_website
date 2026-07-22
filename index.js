// Declare constants

const modeSelect = document.getElementById("modeElement");
const encElmnt = document.getElementById("encrypted");
const unencElmnt = document.getElementById("unencrypted");
const textDaddy = document.getElementById("container");
const copyFlag = document.getElementById("copyAlert");
const darkToggle = document.getElementById("darkSwitch");
const extraBox = document.getElementById("bonusKeyBox");
const keyBox = document.getElementById("key");
const boxTitles = document.querySelectorAll('.fieldTitle');
const boxSelectors = document.querySelectorAll('.miniSelector');
const unencBaseSel = document.getElementById("unencSelector");
const encBaseSel = document.getElementById("encSelector");
const lower_let = 'abcdefghijklmnopqrstuvwxyz';
const upper_let = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const qwerty = `\`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?`;
const wertyu = `1234567890-=\`wertyuiop[]\\qsdfghjkl;'axcvbnm,./z!@#$%^&*()_+~WERTYUIOP{}|QSDFGHJKL:"AXCVBNM<>?Z`;
const alphabet = 'abcdefghijklmnopqrstuvwxyz' + 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
const rot13bet = 'nopqrstuvwxyzabcdefghijklm' + 'nopqrstuvwxyzabcdefghijklm'.toUpperCase();
const bases = {
    'binary': '01',
    'decimal': '0123456789',
    'hexadecimal': '0123456789abcdef',
    'base64': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    'stripped qwerty': `\`1234567890-=qwertyuiop[]asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP|ASDFGHJKL:"ZXCVBNM<>?`
};

const translate_in = {
    'Pi Cipher': () => pi_code(unencElmnt, encElmnt, 1),
    'Reverse':  () => myReverse(unencElmnt, encElmnt),
    'ROT13': () => substitute(unencElmnt, encElmnt, alphabet, rot13bet),
    'Keyboard Shift': () => substitute(unencElmnt, encElmnt, qwerty, wertyu),
    'Vigenère Cipher': () => vigenere(unencElmnt, encElmnt, 1),
    'Base Convert': () => convert_base_box(unencElmnt, encElmnt, bases[unencBaseSel.value], bases[encBaseSel.value]),
    'Compressor': () => base_compress()
};
const translate_out = {
    'Pi Cipher': () => pi_code(encElmnt, unencElmnt, -1),
    'Reverse':  () => myReverse(encElmnt, unencElmnt),
    'ROT13': () => substitute(encElmnt, unencElmnt, alphabet, rot13bet),
    'Keyboard Shift': () => substitute(encElmnt, unencElmnt, wertyu, qwerty),
    'Vigenère Cipher': () => vigenere(encElmnt, unencElmnt, -1),
    'Base Convert': () => convert_base_box(encElmnt, unencElmnt, bases[encBaseSel.value], bases[unencBaseSel.value]),
    'Compressor': () => base_decompress()
};

const urlModeNames = {
    'Pi Cipher': 'pi',
    'Reverse': 'reverse',
    'ROT13': 'rot13',
    'Keyboard Shift': 'keyboard',
    'Vigenère Cipher': 'vigenere',
    'Base Convert': 'baseconv',
    'Compressor': 'compress'
};

const urlParams = new URLSearchParams(window.location.search);
const currentUrl = new URL(window.location.href);
var mode = modeSelect.value;
var unencUsedLast = true;

// Code for Pi Cipher

function mod(n, m) {return ((n % m) + m) % m}; //apparently js % can return negative numbers... This fixes the issue.

const Pi = "3141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771309960518707211349999998372978049951059731732816096318595024459455346908302642522308253344685035261931188171010003137838752886587533208381420617177669147303598253490428755468731159562863882353787593751957781857780532171226806613001927876611195909216420198938095257201065485863278865936153381827968230301952035301852968995773622599413891249721775283479131515574857242454150695950829533116861727855889075098381754637464939319255060400927701671139009848824012858361603563707660104710181942955596198946767837449448255379774726847104047534646208046684259069491293313677028989152104752162056966024058038150193511253382430035587640247496473263914199272604269922796782354781636009341721641219924586315030286182974555706749838505494588586926995690927210797509302955321165344987202755960236480665499119881834797753566369807426542527862551818417574672890977772793800081647060016145249192173217214772350141441973568548161361157352552133475741849468438523323907394143334547762416862518983569485562099219222184272550254256887671790494601653466804988627232791786085784383827967976681454100953883786360950680064225125205117392984896084128488626945604241965285022210661186306744278622039194945047123713786960956364371917287467764657573962413890865832645995813390478027590099465764078951269468398352595709825822620522489407726719478268482601476990902640136394437455305068203496252451749399651431429809190659250937221696461515709858387410597885959772975498930161753928468138268683868942774155991855925245953959431049972524680845987273644695848653836736222626099124608051243884390451244136549762780797715691435997700129616089441694868555848406353422072225828488648158456028506016842739452267467678895252138522549954666727823986456596116354886230577456498035593634568174324112515076069479451096596094025228879710893145669136867228748940560101503308617928680920874760917824938589009714909675985261365549781893129784821682998948722658804857564014270477555132379641451523746234364542858444795265867821051141354735739523113427166102135969536231442952484937187110145765403590279934403742007310578539062198387447808478489683321445713868751943506430218453191048481005370614680674919278191197939952061419663428754440643745123718192179998391015919561814675142691239748940907186494231961567945208095146550225231603881930142093762137855956638937787083039069792077346722182562599661501421503068038447734549202605414665925201497442850732518666002132434088190710486331734649651453905796268561005508106658796998163574736384052571459102897064140110971206280439039759515677157700420337869936007230558763176359421873125147120532928191826186125867321579198414848829164470609575270695722091756711672291098169091528017350671274858322287183520935396572512108357915136988209144421006751033467110314126711136990865851639831501970165151168517143765761835155650884909989859982387345528331635507647918535893226185489632132933089857064204675259070915481416549859461637180270981994309924488957571282890592323326097299712084433573265489382391193259746366730583604142813883032038249037589852437441702913276561809377344403070746921120191302033038019762110110044929321516084244485963766983895228684783123552658213144957685726243344189303968642624341077322697802807318915441101044682325271620105265227211166039";
function pi_code (inputElmnt, outputElmnt, PiDir) { // Set PiDir to 1 for encryption, -1 for decryption.

    let message = inputElmnt.value;
    let output = '';
    let PiI = 0;
    let pi_digit;

    for (let char of message) {

        pi_digit = parseInt(Pi[PiI]) * PiDir;

        if (lower_let.includes(char)) {
            output += lower_let[mod(lower_let.indexOf(char)+pi_digit, 26)];
            PiI++;
        }
        else if (upper_let.includes(char)) {
            output += upper_let[mod(upper_let.indexOf(char)+pi_digit, 26)];
            PiI++;
        }
        else {
            output += char;
        };

        if (PiI >= Pi.length) {
            output = `{ERROR! Message is too long. Limit is ${Pi.length} letters.}`;
            break;
        };
    };
    outputElmnt.value = output;
};

// Code for substitution ciphers (keyboard shift and rot13)

function substitute (inputElmnt, outputElmnt, inputChars, outputChars) {
    let message = inputElmnt.value;
    let output = '';

    for (let char of message) {

        if (inputChars.includes(char)) {
            output += outputChars[inputChars.indexOf(char)];
        } else {
            output += char;
        };
    };
    outputElmnt.value = output;
};

// Code for Vigenere cipher

function vigenere (inputElmnt, outputElmnt, keyDir) { // Set keyDir to 1 for encryption, -1 for decryption.

    let message = inputElmnt.value;
    let output = '';

    let key = '';
    // only use letters in key
    for (let char of keyBox.value) {
        if (alphabet.includes(char)) {
            key += char;
        };
    };
    key = key.toLowerCase();
    if (key === '') {
        key = 'a';
    };

    let keyI = 0;
    let key_digit;

    for (let char of message) {

        key_digit = lower_let.indexOf(key[keyI]) * keyDir; // This is the value that the message is shifted by

        if (lower_let.includes(char)) {
            output += lower_let[mod(lower_let.indexOf(char)+key_digit, 26)];
            keyI++;
        }
        else if (upper_let.includes(char)) {
            output += upper_let[mod(upper_let.indexOf(char)+key_digit, 26)];
            keyI++;
        }
        else {
            output += char;
        };

        if (keyI >= key.length) {
            keyI = 0;
        };
    };

    outputElmnt.value = output;
};

function myReverse(inputElmnt, outputElmnt) {
    outputElmnt.value = [...inputElmnt.value].reverse().join('')
};

// Code for base converter

function convert_base (message, inputBase, outputBase) {
    // Case insensitivity for hexadecimal:
    if (inputBase === bases['hexadecimal']) {message = message.toLowerCase()};

    // Convert to decimal value
    let dec = 0n;
    let power = BigInt(message.length);
    const inBN = BigInt(inputBase.length);
    const outBN = BigInt(outputBase.length);
    for (let i = 0; i < message.length; i++) {
        power--;
        dec += BigInt(inputBase.indexOf(message[i])) * inBN ** power;
    };

    if (dec == 0) { // Return 0 if value is zero/null.
        return outputBase[0];
    } else {

        // Convert to desired base
        let output = '';
        while (dec > 0) {
            output = outputBase[mod(dec, outBN)] + output;
            dec = dec / outBN; // floored quotient?
        };
        return output;
    };
};

function convert_base_box (inputElmnt, outputElmnt, inputBaseBox, outputBaseBox) {
    outputElmnt.value = convert_base(inputElmnt.value, inputBaseBox, outputBaseBox);
};

// Code for base compressor

function base_compress () {
    let message = unencElmnt.value;

    // Assign numeric values to the chars of the message to create a new base.

    let newBase = [];

    let i = 1;
    // Set next char value to 1, then 0.
    while (message[i] === message[0] && message[i] !== undefined) {
        i++;
    };

    newBase[1] = message[i];
    i++;
    while (newBase.includes(message[i]) && message[i] !== undefined) {
        i++;
    };
    newBase[0] = message[i];

    // Set remaining chars to 2, 3, 4, etc.
    let b = 2
    for (i = 1; i < message.length; i++) {
        if (message[i] !== message[0] && !newBase.includes(message[i])) {
            newBase[b] = message[i];
            b++;
        };
    };
    // Set the 1st char's value to be the greatest.
    newBase[b] = message[0];
    // Make base string.
    let baseStr = newBase.join('');

    // Get base64 value.
    numba64 = convert_base(message.slice(1), baseStr, bases['stripped qwerty']);

    // Escape newline, tab, and curly-brace characters.
    baseStr = baseStr
        .replace(/\n/g, '\\n')
        .replace(/\t/g, '\\t')
        .replace(/{/g, '\\{')
        .replace(/}/g, '\\}');
    
    // Generate output string.
    encElmnt.value = '#{' + baseStr + '}' + numba64;
};

function base_decompress () {

};

// New code for Google Translate version

function resize () {
    // Reset height so it can shrink if text is deleted
    encElmnt.style.height = 'auto';
    unencElmnt.style.height = 'auto';
    // Set new height based on the scrollable content area
    if (window.getComputedStyle(textDaddy).flexDirection == 'row') { // Set text boxes to same height if they lie side-by-side
        let newHeight = Math.max(encElmnt.scrollHeight, unencElmnt.scrollHeight) + 'px';
        encElmnt.style.height = newHeight;
        unencElmnt.style.height = newHeight;
    } else {
        encElmnt.style.height = encElmnt.scrollHeight + 'px';
        unencElmnt.style.height = unencElmnt.scrollHeight + 'px';
    };
};

function key_resize () {
    // Minimize box
    keyBox.style.width = '200px'; // matches default CSS
    keyBox.style.height = '55px'; // matches default CSS
    // Adjust width
    keyBox.style.setProperty("white-space", "pre");
    keyBox.style.width = keyBox.scrollWidth  + "px";
    // Adjust height
    if (keyBox.offsetWidth >= extraBox.offsetWidth) { // If width is maxed out
        keyBox.style.setProperty("white-space", "normal");
        keyBox.style.height = keyBox.scrollHeight + "px";
    };
};

function editFlash(edEl) {
    edEl.classList.remove("flash-red"); // remove old animation
    void edEl.offsetWidth;              // force reflow
    edEl.classList.add("flash-red");    // restart animation
};

function clearBoxes () {
    editFlash(unencElmnt);
    editFlash(encElmnt);
    unencElmnt.value = '';
    encElmnt.value = '';
};

async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text);
        // Show banner upon success. Cred editFlash function for code.
        copyFlag.classList.remove("pop-up");
        void copyFlag.offsetWidth;
        copyFlag.classList.add("pop-up");
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
};

function showhideBonuses () {
    // Show necessary bonus info

    if (mode == 'Vigenère Cipher') {
        extraBox.style.display = 'block';
    } else {
        extraBox.style.display = 'none';
    };

    if (mode == 'Base Convert') {
        boxTitles.forEach(item => {
            item.style.display = 'none';
        });
        boxSelectors.forEach(item => {
            item.style.display = 'inline-block';
        });
    } else {
        boxTitles.forEach(item => {
            item.style.display = 'inline-block';
        });
        boxSelectors.forEach(item => {
            item.style.display = 'none';
        });
    };

    if (mode == 'Compressor') {
        encElmnt.style.wordBreak = 'break-all';
    } else {
        encElmnt.style.wordBreak = 'normal';
    }
};

function autoTranslate () {
    // Translate from last edited box
    if (unencUsedLast) {
        editFlash(encElmnt);
        translate_in[mode]();
    } else {
        editFlash(unencElmnt);
        translate_out[mode]();
    };
    resize();
};

// Execute onload:

// Switch mode if necessary
if (urlParams.has('mode')) {
    modeSelect.value = Object.keys(urlModeNames).find(k => urlModeNames[k] === urlParams.get('mode'));
    // urlModeNames[urlParams.get('mode')];
    mode = modeSelect.value;
    //translate
    translate_in[mode]();
    // Adjust height of textarea to fit text
    resize();
    showhideBonuses();
};

// Event listeners

unencElmnt.addEventListener('input', () => {
    unencUsedLast = true;
    // Flash other box red
    editFlash(encElmnt);
    //translate
    translate_in[mode]();
    // Adjust height of textarea to fit text
    resize();
});
encElmnt.addEventListener('input', () => {
    unencUsedLast = false;
    // Flash other box red
    editFlash(unencElmnt);
    //translate
    translate_out[mode]();
    // Adjust height of textarea to fit text
    resize();
});

modeSelect.addEventListener('change', () => {
    mode = modeSelect.value;
    showhideBonuses();
    autoTranslate();
    // update query string
    currentUrl.searchParams.set('mode', urlModeNames[mode]);
    window.history.replaceState({}, '', currentUrl);
});

keyBox.addEventListener('input', () => {
    autoTranslate();
});

unencBaseSel.addEventListener('change', () => {
    autoTranslate();
});
encBaseSel.addEventListener('change', () => {
    autoTranslate();
});

darkToggle.addEventListener('change', (event) => {
    alert("Whoops! Sorry, but dark mode doesn't work yet.");
});