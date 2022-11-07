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
    $('#input').val('');
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
    let text = $('#input').val();

    if (text == "") {
        $('#input').css('font-family', 'neodgm');
        $('#input').css('color', '#888888')
    }

    if (text != "") {
        $('#input').css('font-family', 'PiCell');
        $('#input').css('color', '#00FF00');
    }

    resizeHeight(obj);
    main_container_fill();
}

function resizeHeight(obj) {

    obj.style.height = 'auto';
    let new_height = String(obj.scrollHeight)
    obj.style.height = `${new_height}` + 'px';
}

start = 1
before_text = "";
shift = 0; //shift key 인식 (쌍자음을 위한 조치)

//input 입력 받을 때마다 (debounce 처리를 해줌)
$('#input').on('keyup', {key: this.key}, _.debounce(input_sync, 3));


// $('#input').keyup(function () {
//     let inputVal = $(this).val();
//     $(this).val((inputVal.replace(/[ㄱ-힣]/g, '')));
//     if (inputVal == ''){
//         $('#input').css('font-family', 'neodgm');
//         $('#input').css('color', '#888888')
//     }
// });

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
                special_case = '<';
                shift = 0;
            } else {
                special_case = ',';
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
        console.log('special_case: ', special_case);
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
        let kor_text = inko.en2ko(text);
        console.log('text', kor_text);
        let height = $('#input').css('height');
        return show_result(text, kor_text, height, question);
    } else {
        console.log('예외에 들어왔습니다!');
        shift = 0;
    }
    // console.log('\n');
}

function show_result(text, kor_text, height, question) {
    $('#question').css('display', 'none');
    $('textarea').remove();
    let temp_html = `<div id="show-input" style="height: ${height}">${text}</div>`;
    $('#show-box').prepend(temp_html);
    $.ajax({
        type: "POST",
        url: "/question/save",
        data: {question_give: question, text_give1: text, text_give2: kor_text},
        success: function (response) {
            if (response["msg"] = "success") {
                setTimeout(function () {
                    window.location.href = './show';
                }, 2500);
            }
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
