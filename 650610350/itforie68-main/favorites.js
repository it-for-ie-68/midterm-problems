document.addEventListener("DOMContentLoaded", () => {
  // โหลด favorites จาก localStorage (array ของ object)
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  // ====== 1. จัดการปุ่ม Favorite ======
  const favButtons = document.querySelectorAll(
    ".luxury-fav-btn, .favorite-btn"
  );
  favButtons.forEach((btn) => {
    const card = btn.closest(".card, .card2");
    const carId = card?.dataset?.carId;
    const carBrand = card?.dataset?.brand;

    // ตั้งสถานะปุ่มถ้าเคยกดแล้ว
    if (
      favorites.some((item) => item.model === carId && item.brand === carBrand)
    ) {
      btn.classList.add("active");
    }

    // กดปุ่ม
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");

      if (btn.classList.contains("active")) {
        if (
          !favorites.some(
            (item) => item.model === carId && item.brand === carBrand
          )
        ) {
          favorites.push({ brand: carBrand, model: carId });
        }
      } else {
        favorites = favorites.filter(
          (item) => !(item.model === carId && item.brand === carBrand)
        );
      }
      saveFavorites();
    });
  });

  // ====== 2. แสดงรายการ Favorite ======
  const favContainer = document.getElementById("favorites-list");
  if (favContainer) {
    if (favorites.length === 0) {
      favContainer.innerHTML = "<p>ยังไม่มีรถที่คุณกด ❤</p>";
    } else {
      favContainer.innerHTML = "";
      favorites.forEach((car) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
                    <h3>${car.brand} - ${car.model}</h3>
                `;
        favContainer.appendChild(card);
      });
    }
  }
});
