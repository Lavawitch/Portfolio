//poker图像查看器
document.addEventListener("DOMContentLoaded", function () {
  const pokerCards = document.querySelectorAll(".poker");
  const pokerViewer = document.createElement("div");
  pokerViewer.className = "poker-viewer";
  const closeBtn = document.createElement("span");
  closeBtn.className = "close-btn";
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", function () {
    pokerViewer.style.display = "none";
  });
  pokerViewer.appendChild(closeBtn);
  document.body.appendChild(pokerViewer);

  // 点击卡片查看大图
  pokerCards.forEach((card) => {
    card.addEventListener("click", function () {
      const imgSrc = this.querySelector("img").src;
      const img = document.createElement("img");
      img.src = imgSrc;
      pokerViewer.innerHTML = "";
      pokerViewer.appendChild(closeBtn);
      pokerViewer.appendChild(img);
      pokerViewer.style.display = "flex";
    });
  });

  // 添加关闭按钮功能
  closeBtn.addEventListener("click", function () {
    pokerViewer.style.display = "none";
  });
  // 点击背景关闭查看模式
  pokerViewer.addEventListener("click", function (e) {
    if (e.target === pokerViewer) {
      pokerViewer.style.display = "none";
    }
  });
});
//  视差滚动效果
document.addEventListener("DOMContentLoaded", function () {
  // 获取所有带有 'ball' 类的 SVG 图像
  const balls = document.querySelectorAll(".ball");

  // 鼠标移动事件监听
  document.addEventListener("mousemove", function (e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // 计算鼠标位置与 SVG 中心的相对位置
    const svg = document.querySelector("svg");
    const svgRect = svg.getBoundingClientRect();
    const svgCenterX = svgRect.left + svgRect.width / 2;
    const svgCenterY = svgRect.top + svgRect.height / 2;

    // 计算鼠标与 SVG 中心的相对坐标
    const relX = mouseX - svgCenterX;
    const relY = mouseY - svgCenterY;

    // 计算旋转角度
    const angle = Math.atan2(relY, relX) * (180 / Math.PI);

    // 应用旋转到每个 ball 元素
    balls.forEach((ball) => {
      ball.style.transform = `rotate(${angle}deg)`;
      ball.style.transformOrigin = "center";
    });
  });
});
