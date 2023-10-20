function createRandomCode(codeCanvas) {
  const canvas_width = codeCanvas.width();
  const canvas_height = codeCanvas.height();
  const canvas = codeCanvas[0];
  const context = canvas.getContext("2d");
  canvas.width = canvas_width;
  canvas.height = canvas_height;
  const sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
  const aCode = sCode.split(",");
  const aLength = aCode.length;
  let value = [];
  for (let i = 0; i <= 3; i++) {
    const j = Math.floor(Math.random() * aLength);
    const deg = Math.random() * 30 * Math.PI / 180;
    const txt = aCode[j];
    value[i] = txt.toLowerCase();
    let x = 10 + i * 20;
    let y = 20 + Math.random() * 8;
    context.font = "bold 23px 微软雅黑";
    context.translate(x, y);
    context.rotate(deg);
    context.fillStyle = code_randomColor();
    context.fillText(txt, 0, 0);
    context.rotate(-deg);
    context.translate(-x, -y);
  }
  value = value.join("");
  codeCanvas.attr('data-code', value);
  for (let i = 0; i <= 5; i++) {
    context.strokeStyle = code_randomColor();
    context.beginPath();
    context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
    context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
    context.stroke();
  }
  for (let i = 0; i <= 30; i++) {
    context.strokeStyle = code_randomColor();
    context.beginPath();
    let x = Math.random() * canvas_width;
    let y = Math.random() * canvas_height;
    context.moveTo(x, y);
    context.lineTo(x + 1, y + 1);
    context.stroke();
  }
}

function code_randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return "rgb(" + r + "," + g + "," + b + ")";
}