/** Top Button */
let topButton = document.getElementById("topBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

/** Tabs */
const tabLinks = document.getElementsByClassName("tab-links");
const tabContents = document.getElementsByClassName("tab-contents");

const sideMenu = document.getElementById("side-menu");

function opentab(tabName) {
  for (tabLink of tabLinks) {
    tabLink.classList.remove("active-link");
  }

  for (tabContent of tabContents) {
    tabContent.classList.remove("active-tab");
  }

  event.currentTarget.classList.add("active-link");
  document.getElementById(tabName).classList.add("active-tab");
}

function openMenu() {
  sideMenu.style.right = "0";
}

function closeMenu() {
  sideMenu.style.right = "-200px";
}

/** See more */
let showAll = false;
const seeMoreBtn = document.getElementById("seeMoreBtn");
const workLists = document.querySelectorAll(".work-list");

for (let i = 1; i < workLists.length; i++) {
  workLists[i].style.display = "none";
}

seeMoreBtn.addEventListener("click", function () {
  showAll = !showAll;

  if (showAll) {
    // If showAll is true, show all works
    for (let i = 1; i < workLists.length; i++) {
      workLists[i].style.display = "grid";
    }
    seeMoreBtn.textContent = "Hide";
  } else {
    // If showAll is false, hide extra works
    for (let i = 1; i < workLists.length; i++) {
      workLists[i].style.display = "none";
    }
    seeMoreBtn.textContent = "See More";
  }
});

/** Toast */
const toastBox = document.getElementById("toastBox");
const successMsg =
  '<i class="fa-solid fa-circle-check"></i>Successfully submitted';
const errorMsg = '<i class="fa-solid fa-circle-xmark"></i>Please fix the error';

function showToast(message) {
  let toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML = message;
  toastBox.appendChild(toast);

  if (message.includes("error")) {
    toast.classList.add("error");
  }

  setTimeout(() => {
    toast.remove();
  }, 6000);
}

/** Form submit to google sheet */
const scriptURL =
  "https://script.google.com/macros/s/AKfycbww23SIeSXfi9PxRVUujluQOfPLsDplqsnZ0r6qAOFuCb0y-HUPDp2UOGGZu000IRix_w/exec";

const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      // msg.innerHTML = "Message sent successfully";
      // setTimeout(function () {
      //   msg.innerHTML = "";
      // }, 5000);

      try {
        showToast(successMsg);
        form.reset();
      } catch (error) {
        console.log(error);
      }
    })
    .catch((error) => {
      showToast(errorMsg);
      console.log(error);
    });
});
