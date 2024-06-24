// Inputmask({ mask: "+7 (999) 999-99-99" }).mask(
//   document.getElementById("phone")
// );

// Определяем правила валидации
const constraints = {
  email: {
    presence: { allowEmpty: false, message: "Обязательное поле" },
    email: { message: "Введите действительный email" },
  },
  phone: {
    presence: { allowEmpty: false, message: "Обязательное поле" },
    format: {
      pattern: "\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}",
      message: "Введите действительный номер телефона",
    },
  },
  agreement: {
    presence: {
      allowEmpty: false,
      message: "Вы должны согласиться на обработку данных",
    },
  },
};

// Обработчик формы
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;

    const formValues = {
      email: form.elements.email.value,
      phone: form.elements.phone.value,
      agreement: form.elements.agreement.checked ? true : null,
    };

    const errors = validate(formValues, constraints, { fullMessages: false });

    // Очищаем предыдущие ошибки
    document.querySelectorAll(".input").forEach((input) => {
      input.classList.remove("error");
      if (
        input.nextElementSibling &&
        input.nextElementSibling.classList.contains("error-text")
      ) {
        input.nextElementSibling.remove();
      }
    });
    const checkbox = form.elements.agreement;
    if (
      checkbox.nextElementSibling &&
      checkbox.nextElementSibling.classList.contains("error-text")
    ) {
      checkbox.nextElementSibling.remove();
    }

    if (errors) {
      // Показываем ошибки
      Object.keys(errors).forEach((key) => {
        const input = form.elements[key];
        if (key === "agreement") {
          const errorText = document.createElement("div");
          errorText.className = "error-text";
          errorText.innerText = errors[key][0];
          input.parentNode.appendChild(errorText);
        } else {
          input.classList.add("error");
          const errorText = document.createElement("div");
          errorText.className = "error-text";
          errorText.innerText = errors[key][0];
          input.parentNode.appendChild(errorText);
        }
      });
    } else {
      // Здесь можно добавить логику для успешной отправки формы
      alert("Форма успешно отправлена!");
      // Например, отправка данных формы на сервер
    }
  });
