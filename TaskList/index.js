document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        agregarTarea(taskInput.value.trim());
    });

    function agregarTarea(texto) {
        if (texto === "") return;

        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = texto;
        span.onclick = () => editarTarea(span);

        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.onclick = () => editarTarea(span);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = () => eliminarTarea(li);

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        taskInput.value = "";
    }

    function eliminarTarea(elemento) {
        elemento.remove();
    }

    function editarTarea(elemento) {
        const texto = elemento.textContent;
        const input = document.createElement("input");
        input.type = "text";
        input.value = texto;

        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                elemento.textContent = input.value;
                input.replaceWith(elemento);
            }
        });

        elemento.replaceWith(input);
        input.focus(); // Para que el usuario pueda escribir de inmediato
    }
});
