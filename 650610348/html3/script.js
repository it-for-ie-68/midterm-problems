// script.js — updated to show order summary with QR and order ID
(function () {
  const menuItems = [
    {
      id: "m1",
      name: "ชีสเค้กหน้าไหม้",
      price: 150,
      img: "https://images.pexels.com/photos/31824008/pexels-photo-31824008.jpeg",
    },
    {
      id: "m2",
      name: "โดนัทเค้กช็อกโกแลต",
      price: 80,
      img: "https://images.pexels.com/photos/32013948/pexels-photo-32013948.jpeg",
    },
    {
      id: "m3",
      name: "เค้กเรดเวลเวต",
      price: 120,
      img: "https://images.pexels.com/photos/6133311/pexels-photo-6133311.jpeg",
    },
    {
      id: "m4",
      name: "เค้กช็อกโกแลต",
      price: 110,
      img: "https://images.pexels.com/photos/29538434/pexels-photo-29538434.jpeg",
    },
    {
      id: "m5",
      name: "ครัวซองต์เนยสด",
      price: 70,
      img: "https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg",
    },
    {
      id: "m6",
      name: "คุกกี้โฮมเมด",
      price: 50,
      img: "https://images.pexels.com/photos/7243524/pexels-photo-7243524.jpeg",
    },
    {
      id: "m7",
      name: "ชาไทย",
      price: 40,
      img: "https://images.pexels.com/photos/32791416/pexels-photo-32791416.jpeg ",
    },
    {
      id: "m8",
      name: "ลาเต้",
      price: 45,
      img: "https://images.pexels.com/photos/25409636/pexels-photo-25409636.jpeg",
    },
    {
      id: "m9",
      name: "มัทฉะ",
      price: 55,
      img: "https://images.pexels.com/photos/31199965/pexels-photo-31199965.jpeg",
    },
  ];

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  const CART_KEY = "borcelle_cart_v1";
  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }
  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  if ($("#menuList")) {
    const menuList = $("#menuList");
    const cartList = $("#cartList");
    const cartTotal = $("#cartTotal");
    const clearCartBtn = $("#clearCart");
    let cart = loadCart();

    function renderMenu() {
      menuList.innerHTML = "";
      menuItems.forEach((item) => {
        const el = document.createElement("article");
        el.className = "menu-item";
        el.innerHTML = `
          <img src="${item.img}" alt="${item.name}">
          <h3>${item.name}</h3>
          <p>ราคา ${item.price} บาท</p>
          <div style="display:flex;gap:8px;justify-content:center;margin-top:8px">
            <button class="btn add" data-id="${item.id}">เพิ่มลงตะกร้า</button>
            <button class="btn ghost" data-id="${item.id}--info">ดูรายละเอียด</button>
          </div>
        `;
        menuList.appendChild(el);
      });
    }

    function renderCart() {
      cartList.innerHTML = "";
      let total = 0;
      cart.forEach((c, idx) => {
        total += c.price;
        const li = document.createElement("li");
        li.innerHTML = `${c.name} - ${c.price} บาท <button class="btn ghost small" data-idx="${idx}">ลบ</button>`;
        cartList.appendChild(li);
      });
      cartTotal.textContent = total;
      saveCart(cart);
    }

    renderMenu();
    renderCart();

    menuList.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const id = btn.dataset.id;
      if (!id) return;
      if (id.endsWith("--info")) {
        const realId = id.replace("--info", "");
        const mi = menuItems.find((m) => m.id === realId);
        alert(`${mi.name}\nราคา ${mi.price} บาท`);
        return;
      }
      const item = menuItems.find((m) => m.id === id);
      if (item) {
        cart.push({ id: item.id, name: item.name, price: item.price });
        renderCart();
      }
    });

    cartList.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      const idx = parseInt(btn.dataset.idx);
      if (!isNaN(idx)) {
        cart.splice(idx, 1);
        renderCart();
      }
    });

    clearCartBtn.addEventListener("click", () => {
      cart = [];
      renderCart();
    });
  }

  if ($("#checkoutForm")) {
    const form = $("#checkoutForm");
    const paymentSection = $("#paymentSection");
    const summaryList = $("#summaryList");
    const summaryTotal = $("#summaryTotal");
    let cart = loadCart();

    function renderSummary() {
      summaryList.innerHTML = "";
      let total = 0;
      if (cart.length === 0) {
        summaryList.innerHTML = "<li>(ยังไม่มีสินค้าในตะกร้า)</li>";
      }
      cart.forEach((c) => {
        total += c.price;
        const li = document.createElement("li");
        li.textContent = `${c.name} - ${c.price} บาท`;
        summaryList.appendChild(li);
      });
      summaryTotal.textContent = total;
    }

    renderSummary();

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (cart.length === 0) {
        alert("ตะกร้าว่าง — กรุณาเพิ่มสินค้าในเมนูก่อนชำระเงิน");
        return;
      }
      paymentSection.classList.remove("hidden");

      const name = $("#custName").value.trim();
      const phone = $("#custPhone").value.trim();
      const addr = $("#custAddress").value.trim();

      // Generate unique order ID
      const orderId = "ORD" + Date.now();

      // Show order info
      const note = `หมายเลขคำสั่งซื้อ: ${orderId}\nชื่อ: ${name}\nโทร: ${phone}\nที่อยู่: ${addr}`;
      $("#paymentNote").textContent = note;

      // Render order items with total
      summaryList.innerHTML = "";
      let total = 0;
      cart.forEach((c) => {
        total += c.price;
        const li = document.createElement("li");
        li.textContent = `${c.name} - ${c.price} บาท`;
        summaryList.appendChild(li);
      });
      summaryTotal.textContent = total;

      // Save order ID for status page
      localStorage.setItem("lastOrderId", orderId);

      // Clear cart after showing summary
      localStorage.removeItem(CART_KEY);
      cart = [];
    });
  }

  if ($("#checkStatusBtn")) {
    const lastId = localStorage.getItem("lastOrderId");
    if (lastId) {
      $("#orderId").value = lastId;
    }
    $("#checkStatusBtn").addEventListener("click", () => {
      const orderId = $("#orderId").value.trim();
      const statusResult = $("#statusResult");
      const statusText = $("#statusText");
      if (!orderId) {
        alert("กรุณากรอกหมายเลขคำสั่งซื้อ");
        return;
      }
      const statuses = ["กำลังจัดเตรียม", "กำลังจัดส่ง", "จัดส่งสำเร็จแล้ว"];
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];
      statusText.textContent = `หมายเลข ${orderId}: ${randomStatus}`;
      statusResult.classList.remove("hidden");
    });
  }
})();
