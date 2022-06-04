export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) =>
      console.log(`400 - некорректно заполнено одно из полей ${err}`)
    );
};

export const autorisation = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      console.log(response)
      return response.json();
    })
    .then((data) => {
      // console.log(data)
      if (data) {
        localStorage.setItem("jwt", data);
        return data;
      } else {
        return;
      }
    })
    .catch((err) =>
      console.log(`400 - не передано одно из полей 
      401 - пользователь с email не найден  ${err}`)
    );
};

export const token = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) =>
      console.log(`# Если токен не передан или передан без Bearer
      400 — Токен не передан или передан не в том формате
      
      # Если передан некорректный токен
      401 — Переданный токен некорректен  ${err}`)
    );
};
