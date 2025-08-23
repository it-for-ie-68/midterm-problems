const characters = {
  hero: {
    yondu: "blue_demon1.jpg",
    Starlord: "starlord-dance.gif",
    grooth: "groot.jpg",
    dracks: "drax.jpg",
    Rocket: "Rocket.jpg",
  },
  alien: {
    AdamWarlock: "adam.jpg",
    Mantis: "mantis.jpg",
    Gamora: "gamora.jpg",
  },
  villain: {
    Thanos: "thanos.jpg",
  },
};

document.getElementById("role-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const color = document.getElementById("color").value.trim();
  const personality = document.getElementById("personality").value.trim();
  const food = document.getElementById("food").value.trim();
  const movie = document.getElementById("movie-title").value;
  const category = document.getElementById("category").value;

  const roles = Object.keys(characters[category]);
  const role = roles[Math.floor(Math.random() * roles.length)];
  const imagePath = `/assets/img/${characters[category][role]}`;

  let resultHTML =
    `คุณจะได้รับบท: <b>${role}</b>` +
    ` มีสีโปรดคือสี <b>${color}</b> ชอบกิน <b>${food}</b> และนิสัย <b>${personality}</b>`;

  resultHTML += `<br><img src="${imagePath}" alt="${role}" style="max-width:100%;border-radius:10px;margin-top:12px;">`;

  document.getElementById("result").innerHTML = resultHTML;
});
