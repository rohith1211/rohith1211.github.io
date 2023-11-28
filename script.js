const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");

yesBtn.addEventListener("click", () => {
  question.innerHTML = "Yeyyy, Twaralo malli kaludham! Google lo Poyi Goodness ani Kottundri";
  gif.src =
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftenor.com%2Fview%2Fanudeep-kv-nag-ashwin-naveen-polishetty-jathi-ratnalu-telugu-gif-21128115&psig=AOvVaw25UsKgkjtvcNHj_4TX0yv8&ust=1701288221572000&source=images&cd=vfe&opi=89978449&ved=0CA8QjRxqFwoTCLj06ta-54IDFQAAAAAdAAAAABAD";
});

noBtn.addEventListener("mouseover", () => {
  const noBtnRect = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - noBtnRect.width;
  const maxY = window.innerHeight - noBtnRect.height;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
});
