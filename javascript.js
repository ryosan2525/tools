function testText(text, length) {
    var outputText = "";
    var lines = text.split('\n');

    for (var j = 0; j < lines.length; j++) {
        var line = lines[j];
        for (var i = 0; i < line.length; i += length) {
            outputText += line.substring(i, i + length) + "\n";
        }
    }

    return outputText;
}


function buttonClick(){
    // 入力TextAreaからテキストを取得
    var inputText = document.getElementById('before_textarea').value;
    // 区切る文字数を取得
    // var splitLength = parseInt(document.getElementById('splitLength').value, 10);
    var splitLength = parseInt(document.getElementById("number").value,10);
    // testText関数を呼び出して結果を取得
    var result = testText(inputText, splitLength);

    // 出力TextAreaに結果を表示
    document.getElementById('after_textarea').value = result;
}

function reset(){
    document.getElementById('before_textarea').value = "";
    document.getElementById('after_textarea').value = "";
}

function copy(text){
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text).then(function () {
        })
      }
}

function splitpage(value){
    var outputText = ""
    var inputText = document.getElementById('after_textarea').value
    if (inputText != null){
        var lines = inputText.split('\n');
        for (var j = value*30-30; j < value*30; j++){
            if (lines[j] != null){
                outputText += lines[j]
                if (j != 30*value-1){
                    outputText += "\n"
                }
            }
        }
        copy(outputText)
    }
}