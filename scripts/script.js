// Webカメラの起動
const video = document.getElementById('video');
let contentWidth;
let contentHeight;

const media = navigator.mediaDevices.getUserMedia({ audio: false, video: {width:640, height:480} })
   .then((stream) => {
      video.srcObject = stream;
      video.onloadeddata = () => {
         video.play();
         contentWidth = video.clientWidth;
         contentHeight = video.clientHeight;
         canvasUpdate();
         checkImage();
      }
   }).catch((e) => {
      console.log(e);
   });

// カメラ映像のキャンバス表示
const cvs = document.getElementById('camera-canvas');
const ctx = cvs.getContext('2d');
const canvasUpdate = () => {
   cvs.width = contentWidth;
   cvs.height = contentHeight;
   ctx.drawImage(video, 0, 0, contentWidth, contentHeight);
   requestAnimationFrame(canvasUpdate);
}

// QRコードの検出
const rectCvs = document.getElementById('rect-canvas');
const rectCtx =  rectCvs.getContext('2d');
const checkImage = () => {
   // imageDataを作る
   const imageData = ctx.getImageData(0, 0, contentWidth, contentHeight);
   // jsQRに渡す
   const code = jsQR(imageData.data, contentWidth, contentHeight);

   // 検出結果に合わせて処理を実施
   if (code) {
      console.log("QRcodeが見つかりました", code);
      drawRect(code.location);
      document.getElementById('qr-msg').textContent = `QRコード：${code.data}`;
      playPitche(code.data);
   } else {
      console.log("QRcodeが見つかりません…", code);
      rectCtx.clearRect(0, 0, contentWidth, contentHeight);
      document.getElementById('qr-msg').textContent = `QRコード: 見つかりません`;
   }
   setTimeout(()=>{ checkImage() }, 500);
}

// 四辺形の描画
const drawRect = (location) => {
   rectCvs.width = contentWidth;
   rectCvs.height = contentHeight;
   drawLine(location.topLeftCorner, location.topRightCorner);
   drawLine(location.topRightCorner, location.bottomRightCorner);
   drawLine(location.bottomRightCorner, location.bottomLeftCorner);
   drawLine(location.bottomLeftCorner, location.topLeftCorner)
}

// 線の描画
const drawLine = (begin, end) => {
   rectCtx.lineWidth = 4;
   rectCtx.strokeStyle = "#F00";
   rectCtx.beginPath();
   rectCtx.moveTo(begin.x, begin.y);
   rectCtx.lineTo(end.x, end.y);
   rectCtx.stroke();
}
// 指定周波数音を出す
let audioCtx = new AudioContext();
const playMelody = (hz) => {
    let osc = audioCtx.createOscillator();
    osc.frequency.value = hz;
    let audDes = audioCtx.destination;
    osc.connect(audDes);
    osc.start = osc.start || osc.noteOn;
    osc.start();
    setTimeout(function() { osc.stop(0);}, 200);
}

// ドレミファソラシドを鳴らす
const playPitche = (name) => {
    switch(name){
        case '1':
            playMelody(261);
            break;
        case '2':
            playMelody(294);
            break;
        case '3':
            playMelody(330);
            break;
        case '4':
            playMelody(349);
            break;
        case '5':
            playMelody(392);
            break;
        case '6':
            playMelody(440);
            break;
        case '7':
            playMelody(494);
            break;
        case '8':
            playMelody(522);
            break;
    }
}