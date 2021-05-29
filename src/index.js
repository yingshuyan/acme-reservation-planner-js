// import axios from "axios";

import { createEle } from "./createEle.js"; // here if need to use createEle instead of {createEle}, the export shoud be "export default createEle" at the bottom of createEle.js. if don't want to use export default, then add export before func decla then here "import {createEle} from "./createEle" "

const userUl = document.getElementById("users-list"); //retrieve users-List node
const restaurantUl = document.getElementById("restaurants-list"); // retrieve restaurant-list node

const loadUsers = async () => {
  try {
    const response = await fetch("/api/users"); // fetch returns a response,
    const users = await response.json(); // convers the respons to JSON

    users.forEach((ele) => {
      userUl.appendChild(
        createEle("li", { id: `user-${ele.id}`, className: "users" })
      );
      const userLi = document.getElementById(`user-${ele.id}`);
      userLi.appendChild(
        createEle("a", { href: `/#user-${ele.id}` }, ele.name)
      );
    });
  } catch (er) {
    console.log("Sorry! Something went wrong!", er.message);
  }
};

const loadRestaurants = async () => {
  try {
    const response = await fetch("/api/restaurants"); // fetch returns a response,
    const restaurants = await response.json(); // convers the respons to JSON

    restaurants.forEach((ele) => {
      restaurantUl.appendChild(
        createEle("li", { id: `rest-${ele.id}` }, ele.name)
      );
      const restaurantLi = document.getElementById(`rest-${ele.id}`);

      btnReserveFunc(restaurantLi, ele.id);
    });
  } catch (er) {
    console.log("Sorry! Something went wrong!", er.message);
  }
};

const loadReservations = async (reservations) => {
  try {
    const reservationUl = document.getElementById("reservations-list");
    reservationUl.innerHTML = "";

    reservations.forEach((ele) => {
      const restaurant = createEle(
        "li",
        { id: `resv-${ele.id}` },
        ele.restaurant.name
      );
      reservationUl.appendChild(restaurant);
      const reservationLi = document.getElementById(`resv-${ele.id}`);

      btnCancelFunc(reservationLi, ele.id);
    });
  } catch (er) {
    console.log(er);
  }
};

const btnReserveFunc = async (parentNode, resvId) => {
  const reservBtn = createEle("button", { id: `/#rest-${resvId} ` }, "reserve");
  parentNode.prepend(reservBtn);

  // console.log("body id ----->", typeof resvId);
  reservBtn.addEventListener("click", async () => {
    const userId = window.location.hash.slice(6);

    const response = await fetch(`/api/users/${userId}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ restaurantId: resvId }),
    });
    const updatedResv = await response.json();
    loadReservations(updatedResv);
  });
};

const btnCancelFunc = async (parentNode, cancelId) => {
  const cancelBtn = createEle("button", { id: `/resv-${cancelId}` }, "cancel");
  parentNode.prepend(cancelBtn);

  cancelBtn.addEventListener("click", async () => {
    const userId = window.location.hash.slice(6);
    const response1 = await fetch(`/api/reservations/${cancelId}`, {
      method: "DELETE",
    });
    // await response.json();

    const response = await fetch(`/api/users/${userId}/reservations`); //url in fetch can send request to server.so the url is what it's sending.
    const updatedResv = await response.json();
    loadReservations(updatedResv);
  });
};

loadUsers();
loadRestaurants();

window.addEventListener(
  "hashchange",
  async () => {
    try {
      [...document.querySelectorAll(".users")].map(
        (ele) => (ele.style.backgroundColor = "")
      );

      const num = window.location.hash.slice(6);
      const response = await fetch(`/api/users/${num}/reservations`); //url in fetch can send request to server.so the url is what it's sending.
      const reservations = await response.json();
      // console.log(reservations);
      loadReservations(reservations);

      document.getElementById(`user-${num}`).style.backgroundColor =
        "#00ff0080";
    } catch (er) {
      console.log(er.message);
    }
  },
  false
);
