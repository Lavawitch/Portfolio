//设计服务交互
document.addEventListener("DOMContentLoaded", function () {
  const pageItems = document.querySelectorAll(".page-item");
  pageItems.forEach((item) => {
    item.addEventListener("click", function () {
      pageItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Search functionality
  const searchInput = document.querySelector(".search-input");
  const searchButton = document.querySelector(".search-button");

  searchButton.addEventListener("click", function () {
    alert("Search for: " + searchInput.value);
  });

  // Subscribe functionality
  const subscribeButton = document.querySelector(".subscribe-button");
  const subscribeInput = document.querySelector(".subscribe-input");

  subscribeButton.addEventListener("click", function () {
    if (subscribeInput.value) {
      alert("Subscribed with: " + subscribeInput.value);
      subscribeInput.value = "";
    } else {
      alert("Please enter your email");
    }
  });

  // Newsletter subscription
  const newsletterForm = document.querySelector(".newsletter-form");
  const newsletterInput = document.querySelector(".newsletter-input");
  const newsletterButton = document.querySelector(".newsletter-button");

  newsletterButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (newsletterInput.value) {
      alert("Subscribed to newsletter with: " + newsletterInput.value);
      newsletterInput.value = "";
    } else {
      alert("Please enter your email");
    }
  });
});

// 设计服务侧边栏交互
document.addEventListener("DOMContentLoaded", function () {
  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  const serviceParts = document.querySelectorAll(".service-part");

  // 点击侧边栏链接
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // 更新激活状态
      sidebarLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      // 滚动到对应内容
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // 点击激活时的滚动状态
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });

  // 滚动时更新激活状态
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;

    serviceParts.forEach((part, index) => {
      const partTop = part.offsetTop - 400;
      const partBottom = partTop + part.offsetHeight;

      if (scrollPosition >= partTop && scrollPosition < partBottom) {
        sidebarLinks.forEach((link) => link.classList.remove("active"));
        sidebarLinks[index].classList.add("active");
      }
    });
  });
});
