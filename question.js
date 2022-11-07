//question page html

let Koreandict = {
    'ㅂ': 'q', 'ㅃ': 'Q', 'ㅈ': 'w', 'ㅉ': 'W', 'ㄷ': 'e', 'ㄸ': 'E', 'ㄱ': 'r', 'ㄲ': 'R', 'ㅅ': 't', 'ㅆ': 'T',
    'ㅛ': 'y', 'ㅕ': 'u', 'ㅑ': 'i', 'ㅐ': 'o', 'ㅒ': 'O', 'ㅔ': 'p', 'ㅖ': 'P',
    'ㅁ': 'a', 'ㄴ': 's', 'ㅇ': 'd', 'ㄹ': 'f', 'ㅎ': 'g', 'ㅗ': 'h', 'ㅓ': 'j', 'ㅏ': 'k', 'ㅣ': 'l',
    'ㅋ': 'z', 'ㅌ': 'x', 'ㅊ': 'c', 'ㅍ': 'v', 'ㅠ': 'b', 'ㅜ': 'n', 'ㅡ': 'm',
    'ㅘ': 'hk', 'ㅙ': 'ho', 'ㅚ': 'hl', 'ㅝ': 'nj', 'ㅞ': 'np', 'ㅟ': 'nl', 'ㅢ': 'ml',
    'ㄳ': 'rt', 'ㄵ': 'sw', 'ㄶ': 'sg', 'ㄺ': 'fr', 'ㄻ': 'fa', 'ㄼ': 'fq', 'ㄽ': 'ft', 'ㄾ': 'fx',
    'ㄿ': 'fv', 'ㅀ': 'fg', 'ㅄ': 'qt'
}

function reset_input() {
    $('.answer_input').val('');
    answer = "";
}

$(function show_question() {
    let text = $('#question').text().trim();
    text = text.replaceAll('&gt;', '>');
    text = text.replaceAll('&lt;', '<');
    $('#question').empty();
    $('#question').append(`${text}`);
});

function change(obj) {
    let text = $('.answer_input').val();

    if (text == "") {
        $('.answer_input').css('font-family', 'neodgm');
        $('.answer_input').css('color', '#888888')
    }

    if (text != "") {
        $('.answer_input').css('font-family', 'Pi-Cell');
        $('.answer_input').css('color', 'white');
    }

    resizeHeight(obj);
    main_container_fill();
}

function resizeHeight(obj) {
    obj.style.height = 'auto';
    obj.style.height = obj.scrollHeight + 'px';
}


letter_changed_num = 0
after_letter_length = 1
before_letter_length = 0
start = 1

before_text = "";
i = 1;
shift = 0; //shift key 인식 (쌍자음을 위한 조치)

//input 입력 받을 때마다

$('#input').on('keyup', {key: this.key}, _.debounce(input_sync, 3));

function input_sync(key) {
    console.log(key)

    console.log('code: ', key.code);

    let text = $('#input').val();
    let new_key = '';
    //code는 key_의 형태로 가져옴
    console.log('text: ', text + '.');
    console.log('before_text: ', before_text);

    if (key.code.slice(0, 3) == 'Key' && key.ctrlKey == false && start == 1) {
        start = 0;
        if (key.shiftKey == true || shift == 1) { //key.shiftKey == true ||
            new_key = key.code[3].toUpperCase();
            console.log('new_key: ', new_key);
            shift = 0;
        } else {
            new_key = key.code[3].toLowerCase();
            console.log('new_key: ', new_key);
        }
        $('#input').val(before_text + new_key);
        console.log('최종 반영: ', before_text + new_key);
        before_text = $('#input').val();
        start = 1;
    } else if (key.keyCode == 16) { //shift를 입력했을 시
        shift = 1; //shiftkey 인식
    } else if (key.keyCode == 32 ||  key.code == 'Space') { //space
        console.log('space 들어왔습니다!');
        $('#input').val(before_text + ' ');
        before_text = $('#input').val();
    } else if (key.keyCode == 8) { //지우기
        before_text = text;
    } else if ((key.key == '.' && key.shiftKey == false) || key.key == '!' || key.key == ';' || key.key == '&' ||
        key.key == '/' || key.key == "'" || key.key =='"' || key.key =='~' || key.key =='@' || key.key =='#' || key.key =='(' || key.key ==')' ||
                key.key =='[' || key.key ==']' || key.key =='^' || key.key =='*' || key.key =='-' || key.key =='_' || key.code =='Digit0' ||
        key.key =='+' || key.key =='=' || (key.key ==',' && key.shiftKey == false) || key.code =='Digit1') { //특수문자
        console.log('특수문자 들어왔습니다!');
        let special_case = key.key;
        if (key.key == '/') {
            if (shift == 1) {
                special_case = '?';
                shift = 0;
            } else {
                special_case = '/';
            }
        } else if (key.key == '.'){
            if (shift == 1) {
                special_case = '>';
                shift = 0;
            } else {
                special_case = '.';
            }
        } else if (key.key == ',') {
            if (shift == 1) {
                special_case = ',';
                shift = 0;
            } else {
                special_case = '<';
            }
        } else if (key.code == 'Digit1') {
            if (shift == 1 || key.shiftKey == true){
                special_case = '!';
                shift = 0;
            } else {
                special_case = '1';
                shift = 0;
            }
        } else if (key.code == 'Digit0') {
            if (shift == 1 || key.shiftKey == true){
                special_case = ')';
                shift = 0;
            } else {
                special_case = '0';
                shift = 0;
            }
        }
        $('#input').val(before_text + special_case);
        before_text = $('#input').val();
    } else if (key.ctrlKey == true || key.keyCode == 17) { //ctrl이나 shift가 눌린 거라면
        console.log('ctrl, shift 들어왔습니다!');
        return;
    } else if (key.keyCode == 13) {
        $('#input').val(before_text);
        let question = "";
        question = $('#question').text().trim();
        console.log('\nquestion', question);
        text = $('#input').val().trim();
        console.log('text', text);
        console.log('text', inko.en2ko(text));
        let height = $('#input').css('height');
        return show_result(text, height, question);
    } else {
        console.log('예외에 들어왔습니다!');
        shift = 0;
        // $('#input').val(before_text);
        // before_text = text;
    }
    // console.log('\n');
}



function getConstantVowel(str) {
    const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
               'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
               'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const s = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
               'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
               'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
    const t = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
               'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
               'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
               'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

    const ga = 44032;
    let uni = str.charCodeAt(0);

    uni = uni - ga;

    let fn = parseInt(uni / 588);
    let sn = parseInt((uni - (fn * 588)) / 28);
    let tn = parseInt(uni % 28);
    let result = '';

    let f_letter = '';
    let s_letter = '';
    let t_letter = '';

    if (fn >= 0 && fn < f.length){
        f_letter = f[fn];
    }
    if (sn >= 0 && sn < s.length){
        s_letter = s[sn];
    }
    if (tn >= 0 && tn <t.length){
        t_letter = t[tn];
    }
    result = f_letter + s_letter + t_letter;

    return result;
}


function show_result(text, height, question) {
    $('#question').css('display', 'none');
    $('textarea').remove();
    let temp_html = `<div id="show-input" style="height: ${height}">${text}</div>`;
    $('#show-box').prepend(temp_html);
    $.ajax({
        type: "POST",
        url: "/question/save",
        data: {question_give: question, text_give: text},
        success: function (response) {
            // if (response["msg"] = "success") {
            //     setTimeout(function () {
            //         window.location.href = './show';
            //     }, 2000);
            // }
        }
    })
}

function main_container_fill() {
    let rem = Number($('body').css('font-size').slice(0, -2));
    let viewport_height = window.innerHeight;
    let contain_height = Number($('#box').css('height').slice(0, -2));
    if (contain_height > viewport_height) {
        contain_height += 30 * rem;
        new_viewportheight = `${contain_height}px`;
        $('#all').css('height', new_viewportheight);
    }
}
