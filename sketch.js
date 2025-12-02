let spriteSheet;
let leftSprite; // 來自資料夾 (5/0.png )的精靈表
let spaceSprite; // 來自資料夾 1/all.png（空白鍵使用） <-- 必須在 preload 中載入
let bgImage; // 背景圖片（背景/1.jpg）

// 資料夾 5 的單一幀尺寸：35 x 44
const FRAME_W = 35;
const FRAME_H = 44;
const TOTAL_FRAMES = 1;

// 空白鍵（資料夾 1/all.png）參數：每格 51x47，共 5 幀 (總寬度 255 / 5 幀 = 51)
const SPACE_FRAME_W = 51; // <-- 【修改】配合 255x47 / 5 幀
const SPACE_FRAME_H = 47; // <-- 【確認】配合 255x47
const SPACE_TOTAL_FRAMES = 5; // <-- 【確認】總幀數

// 左向精靈（2/all.png）參數：每格 40x45，共 3 幀
const LEFT_FRAME_W = 40;
const LEFT_FRAME_H = 45;
const LEFT_TOTAL_FRAMES = 3;

// 角色座標與速度
let playerX;
let playerY;
const MOVE_SPEED = 4;

const FRAME_DELAY = 7; // 切換間隔（以 draw() 的 frame 計數為單位）

function preload() {
  spriteSheet = loadImage('5/0.png');
  // 載入位於資料夾 2 的 all.png（按左鍵時使用）
  leftSprite = loadImage('2/all.png');
  
  // 【新增】載入空白鍵攻擊精靈表 (1/all.png)
  spaceSprite = loadImage('1/all.png');
  
  // 載入背景圖片（背景/1.jpg）
  bgImage = loadImage('背景/1.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  // 初始位置置中（水平），下方（垂直）
  playerX = width / 2;
  playerY = height * 0.7;
}

function draw() {
  // 背景圖片：背景/1.jpg
  background(bgImage);  // 選擇要顯示的精靈表與參數：預設使用 spriteSheet (5/0.png)
  let img = spriteSheet;
  let fw = FRAME_W;
  let fh = FRAME_H;
  let tf = TOTAL_FRAMES;
  let flipH = false; // 是否水平反轉

  // 按住空白鍵時使用資料夾 1 的精靈表（攻擊動畫）
  if (keyIsDown(32) && spaceSprite) { // 這裡會切換到 1/all.png 的參數
    img = spaceSprite;
    fw = SPACE_FRAME_W;
    fh = SPACE_FRAME_H;
    tf = SPACE_TOTAL_FRAMES;
    flipH = false;
  }

  if (keyIsDown(LEFT_ARROW) && leftSprite) {
    img = leftSprite;
    fw = LEFT_FRAME_W;
    fh = LEFT_FRAME_H;
    tf = LEFT_TOTAL_FRAMES;
  }

  if (keyIsDown(RIGHT_ARROW) && leftSprite) {
    img = leftSprite;
    fw = LEFT_FRAME_W;
    fh = LEFT_FRAME_H;
    tf = LEFT_TOTAL_FRAMES;
    flipH = true;
  }

  // 計算目前幀
  const idx = floor(frameCount / FRAME_DELAY) % tf;
  const sx = idx * fw;
  const sy = 0;

  // 放大四倍
  const SCALE = 4;
  const drawW = fw * SCALE;
  const drawH = fh * SCALE;

  // 按住左鍵時移動
  if (keyIsDown(LEFT_ARROW)) {
    playerX -= MOVE_SPEED;
  }

  // 按住右鍵時移動
  if (keyIsDown(RIGHT_ARROW)) {
    playerX += MOVE_SPEED;
  }

  // 邊界限制（確保不會移出畫面）
  playerX = constrain(playerX, drawW / 2, width - drawW / 2);

  // 繪製在 playerX/playerY（靠左下對齊改為置中）
  push();
  translate(playerX, playerY);
  if (flipH) {
    scale(-1, 1);
  }
  // 使用 image(img, dx, dy, dWidth, dHeight, sx, sy, sWidth, sHeight)
  image(img, -drawW / 2, -drawH / 2, drawW, drawH, sx, sy, fw, fh);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}