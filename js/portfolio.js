// 返回顶部按钮功能
document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.querySelector(".fo_back_to_top");
  // 点击按钮平滑滚动到顶部
  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// 视频控制逻辑
document.querySelectorAll(".video-container").forEach((container) => {
  const cover = container.querySelector(".glitch-cover");
  const video = container.querySelector("video");

  // 点击事件
  cover.addEventListener("click", function () {
    container.classList.add("active");
    video.play().catch(() => {
      container.classList.remove("active");
    });

    // 自动隐藏封面
    video.addEventListener("play", () => {
      cover.style.opacity = "0";
    });
  });

  // 视频结束重置
  video.addEventListener("ended", () => {
    container.classList.remove("active");
    cover.style.opacity = "1";
    video.currentTime = 0;
  });

  // 键盘控制
  cover.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      cover.click();
    }
  });
});

// 手动调试面板
document.addEventListener("keypress", (e) => {
  if (e.key === "t") {
    // 按T键模拟触顶
    window.scrollTo(0, 0);
    document.documentElement.style.transform = "translateY(100px)";
    document.documentElement.style.transition = "transform 0.6s";
    setTimeout(() => {
      document.documentElement.style.transform = "translateY(0)";
    }, 100);
  }
  if (e.key === "b") {
    // 按B键模拟触底
    window.scrollTo(0, document.body.scrollHeight);
    document.documentElement.style.transform = "translateY(-100px)";
    document.documentElement.style.transition = "transform 0.6s";
    setTimeout(() => {
      document.documentElement.style.transform = "translateY(0)";
    }, 100);
  }
});

//滚动监听器
let lastScroll = 0;
const cards = Array.from(document.querySelectorAll(".portfolio-card"));
const threshold = 100; // 滚动阈值

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const isActive =
      rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;

    if (isActive) {
      card.classList.add("active");
      card.classList.remove("next", "prev");

      // 控制相邻卡片
      if (cards[index + 1]) {
        cards[index + 1].classList.add("next");
        cards[index + 1].classList.remove("active", "prev");
      }
      if (cards[index - 1]) {
        cards[index - 1].classList.add("prev");
        cards[index - 1].classList.remove("active", "next");
      }
    }
  });

  lastScroll = currentScroll;
});

// 初始化第一个卡片
cards[0].classList.add("active");
if (cards[1]) cards[1].classList.add("next");

// 作品集动画
document.querySelectorAll(".portfolio-item").forEach((item) => {
  observer.observe(item); //observer是一个IntersectionObserver实例，用于观察元素的可见性变化，在主js文件中定义
});

// 添加展开/收起功能
// function toggleDetails(header) {
//   const item = header.closest(".portfolio-item");
//   const details = item.querySelector(".portfolio-details");
//   const isActive = details.classList.contains("active");

//   // 关闭所有其他详情
//   document.querySelectorAll(".portfolio-details.active").forEach((d) => {
//     if (d !== details) d.classList.remove("active");
//   });

//   details.classList.toggle("active", !isActive);
// }

// 修改筛选功能中的tags获取方式
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const filter = this.dataset.filter;

    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");

    document.querySelectorAll(".portfolio-item").forEach((item) => {
      // 添加安全检测
      const tags = item.dataset.tags?.split(" ") || [];
      const match = filter === "all" || tags.includes(filter);
      item.style.display = match ? "block" : "none";

      if (match) observer.observe(item);
    });
  });
});

// 视图切换功能
document.querySelectorAll(".view-btn").forEach((btn) => {
  document.querySelector(".portfolio-gallery").style.display = "block";
  document.querySelector(".portfolio-time-gallery").style.display = "none";
  btn.addEventListener("click", function () {
    const view = this.dataset.view;

    // 更新按钮状态
    document
      .querySelectorAll(".view-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");

    // 切换视图
    if (view === "grid") {
      document.querySelector(".portfolio-gallery").style.display = "block";
      document.querySelector(".portfolio-time-gallery").style.display = "none";
    } else if (view === "timeline") {
      document.querySelector(".portfolio-gallery").style.display = "none";
      document.querySelector(".portfolio-time-gallery").style.display = "block";
    }
  });
});

// 图片预加载优化
function preloadImages() {
  document.querySelectorAll(".detail-image img").forEach((img) => {
    const loader = new Image();
    loader.src = img.src;
    loader.onload = () => {
      img.style.opacity = 1;
      img.parentElement.style.background = "none";
    };
  });
}
