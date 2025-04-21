// start here
// end here
// 处理按钮点击内容切换
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".smooth-switch-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Offset for navbar height
          behavior: "smooth",
        });
      }
      // 更新URL历史记录
      history.pushState({}, "", `#${targetId}`);

      // 切换内容
      switchContent(targetId);
    });
  });
});
// 统一处理所有锚点跳转
function handleNavigation() {
  // 监听所有导航链接
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);

      // 检查目标元素是否存在
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      // 更新URL历史记录
      history.pushState({}, "", `#${targetId}`);

      // 执行滚动定位
      scrollToSection(targetId);

      // 更新导航激活状态
      updateActiveNav(targetId);
    });
  });

  // 处理浏览器前进/后退
  window.addEventListener("popstate", () => {
    const targetId = window.location.hash.substring(1) || "home";
    scrollToSection(targetId);
    updateActiveNav(targetId);
  });
}

// 滚动定位函数
function scrollToSection(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const headerHeight = document.querySelector(".navbar").offsetHeight;
  const targetPosition = target.offsetTop - headerHeight;

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
}

// 更新导航栏激活状态
function updateActiveNav(targetId) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${targetId}`) {
      link.classList.add("active");
    }
  });
}

// 初始化导航系统
handleNavigation();

// 页面加载处理
window.addEventListener("load", () => {
  // 强制重置滚动位置
  window.scrollTo(0, 0);

  // 处理直接通过锚点访问的情况
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    setTimeout(() => {
      scrollToSection(targetId);
      updateActiveNav(targetId);
    }, 100);
  }
});

// 返回顶部功能
const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  // 显示/隐藏按钮
  const scrollBottom =
    document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
  const showThreshold = 100; // 距离底部100px时显示

  if (scrollBottom < showThreshold) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }

  //惯性滚动检测;
  // let isScrolling;
  // window.clearTimeout(isScrolling);

  // isScrolling = setTimeout(() => {
  //   if (scrollBottom < 1) {
  //     window.scrollTo({
  //       top: 0,
  //       behavior: "smooth",
  //     });
  //   }
  // }, 100); // 停止滚动100ms后触发
});
backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// 前端路由逻辑（页面及主题切换）
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  // 处理导航链接点击
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // 获取目标URL
      const targetUrl = this.getAttribute("href");
      if (targetUrl === "#") {
        targetUrl = "#home";
      }

      // 更新URL
      history.pushState({ path: targetUrl }, "", targetUrl);

      // 切换内容
      switchContent(targetUrl.substring(1));
    });
  });

  // 处理浏览器前进/后退按钮
  window.addEventListener("popstate", function (e) {
    const path = e.state ? e.state.path : window.location.pathname;
    switchContent(path.substring(1));
  });

  //滚动粘连效果
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 主题切换功能
  const themeSwitch = document.getElementById("theme-switch");

  // 检查本地存储中的主题设置
  function checkThemePreference() {
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
      document.body.classList.add("dark-theme");
      themeSwitch.checked = true;
    } else if (currentTheme === "light") {
      document.body.classList.remove("dark-theme");
      themeSwitch.checked = false;
    } else if (prefersDarkScheme) {
      document.body.classList.add("dark-theme");
      themeSwitch.checked = true;
    }
  }

  // 切换主题:下次加载时保持设置
  themeSwitch.addEventListener("change", () => {
    if (themeSwitch.checked) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  });

  // 页面加载时检查主题设置
  window.addEventListener("DOMContentLoaded", checkThemePreference);
});

// 切换内容函数
function switchContent(pageId) {
  const targetSection = document.getElementById(pageId);
  if (!targetSection) return;

  // 移除所有导航链接的活动状态
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  // 添加当前导航链接的活动状态
  const activeLink = document.querySelector(`.nav-link[href="#${pageId}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }

  // 隐藏所有内容
  document.querySelectorAll(".page-content").forEach((content) => {
    content.classList.remove("active");
  });

  // 显示目标内容
  targetSection.classList.add("active");

  // 平滑滚动到目标区块
  setTimeout(() => {
    // 等待内容渲染完成
    const targetPosition = targetSection.offsetTop - 110; // 减去导航栏高度
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }, 50);
}

// 添加页面加载时的滚动重置
window.addEventListener("load", () => {
  // 强制滚动到顶部
  window.scrollTo(0, 0);

  // 处理直接访问锚点链接的情况
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    setTimeout(() => switchContent(targetId), 100);
  }
});

// 图片渐显动画
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "0px",
  }
);

document.querySelectorAll(".showcase-item").forEach((item) => {
  observer.observe(item);
});

// 移动端菜单
const menuToggle = document.querySelector(".menu-toggle");
menuToggle.addEventListener("click", function () {
  const navLinks = document.querySelector(".nav-links");
  this.classList.toggle("active"); // 切换按钮的active状态
  navLinks.classList.toggle("active");

  // 当点击外部区域自动关闭导航栏
  if (navLinks.classList.contains("active")) {
    document.body.addEventListener("click", closeMenuOnClickOutside, true);
  } else {
    document.body.removeEventListener("click", closeMenuOnClickOutside, true);
  }
});

function closeMenuOnClickOutside(e) {
  if (!e.target.closest(".nav-links") && !e.target.closest(".menu-toggle")) {
    document.querySelector(".nav-links").classList.remove("active");
    menuToggle.classList.remove("active");
    document.body.classList.remove("menu-icon");
    document.body.removeEventListener("click", closeMenuOnClickOutside, true);
  }
}

// 添加点击动画反馈
document.querySelectorAll(".marquee-item").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));

    link.style.transform = "scale(0.95)";
    setTimeout(() => (link.style.transform = ""), 200);

    // 执行实际跳转
    setTimeout(() => {
      window.location = link.href;
    }, 300);
  });
});
