// VARIAVEIS GLOBAIS
const inputItem = document.getElementById("input-name");
const addBtn = document.querySelector("#add-btn");
const list = document.querySelector(".item-list");

// - MOLDE DO ELEMENTO A SER CRIADO
function addItem(name) {
	const li = document.createElement("li");
	li.className = "item flex fade-in";

	li.innerHTML = ` 
<label class="flex">
	<input type="checkbox" />
	<span class="checkmark"></span>
	<span class="item-name">${name}</span>
</label>
<button
	class="delete-btn flex"
	aria-label="delete item"
>
	<img
		src="./assets/trash.svg"
		alt="Ícone de lixeira"
	/>
</button>
    `;
	list.appendChild(li);

	li.classList.add("fade-in");

	li.addEventListener(
		"animationend",
		() => {
			li.classList.remove("fade-in");
		},
		{ once: true }
	);
}

// ADICIONA ITEM COM CLICK
addBtn.addEventListener("click", () => {
	const name = inputItem.value.trim();
	if (name !== "") {
		addItem(name);
		inputItem.value = "";
	}
});

// ADICIONA ITEM COM ENTER
inputItem.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		// Chamando a função que ativa com o clique do botão
		addBtn.click();
	}
});

// REMOVE ITEM
list.addEventListener("click", (e) => {
	const isTrashBtn = e.target.closest(".delete-btn");

	if (isTrashBtn) {
		let deleted = false;

		document.querySelectorAll(".item").forEach((li) => {
			const checkbox = li.querySelector('input[type="checkbox"]');
			if (checkbox && checkbox.checked) {
				deleted = true;
				li.classList.add("fade-out");

				setTimeout(() => {
					li.remove();
				}, 600);
			}
		});

		if (deleted) {
			showToast("Itens excluídos com sucesso");
		}
	}
});

// SHOW TOAST!
function showToast(message) {
	const toast = document.querySelector("#toast");
	toast.textContent = message;
	toast.classList.add("show");

	setTimeout(() => {
		toast.classList.remove("show");
	}, 5000);
}
