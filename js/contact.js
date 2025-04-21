// 联系表单交互
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  // 输入框的实时响应
  [firstNameInput, lastNameInput, emailInput, messageInput].forEach((input) => {
    input.addEventListener("input", function () {
      if (this.value.trim() !== "") {
        this.style.borderColor = "var(--primary-color)";
      } else {
        this.style.borderColor = "var(--border-color)";
      }
    });
  });

  // 表单提交处理
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // 验证表单
    if (!validateForm()) {
      return;
    }

    // 模拟表单提交
    alert("感谢您的留言！我们会尽快回复您。");
    contactForm.reset();
  });

  // 表单验证
  function validateForm() {
    let isValid = true;

    // 验证邮箱格式
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value)) {
      isValid = false;
      emailInput.style.borderColor = "red";
      alert("请输入有效的邮箱地址！");
    }

    // 验证其他字段是否为空
    [firstNameInput, lastNameInput, messageInput].forEach((input) => {
      if (input.value.trim() === "") {
        isValid = false;
        input.style.borderColor = "red";
      }
    });

    return isValid;
  }
});
