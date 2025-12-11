<template>
  <div class="todo">
    <h1 class="todo__title">To-Do List</h1>

    <section class="card">
      <h2 class="card__title">Нова задача</h2>
      <div class="form-row">
        <input
          v-model="newTitle"
          class="input"
          type="text"
          placeholder="Назва завдання"
        />
      </div>
      <div class="form-row">
        <textarea
          v-model="newDescription"
          class="input input--textarea"
          placeholder="Опис"
          rows="2"
        ></textarea>
      </div>
      <div class="form-row form-row--inline">
        <select v-model="newPriority" class="input">
          <option disabled value="">Пріоритет</option>
          <option value="low">Низький</option>
          <option value="medium">Середній</option>
          <option value="high">Високий</option>
        </select>

        <button class="btn btn--primary" @click="addTask">Додати</button>
      </div>
      <p v-if="addError" class="error">
        {{ addError }}
      </p>
    </section>

    <section class="card">
      <h2 class="card__title">Фільтри</h2>

      <div class="form-row form-row--inline">
        <input
          v-model="filterTitle"
          class="input"
          type="text"
          placeholder="Пошук за назвою"
        />
        <input
          v-model="filterDescription"
          class="input"
          type="text"
          placeholder="Пошук за описом"
        />
      </div>

      <div class="form-row form-row--inline">
        <select v-model="filterStatus" class="input">
          <option value="">Статус: усі</option>
          <option value="active">Активні</option>
          <option value="done">Виконані</option>
        </select>

        <select v-model="filterPriority" class="input">
          <option value="">Пріоритет: усі</option>
          <option value="low">Низький</option>
          <option value="medium">Середній</option>
          <option value="high">Високий</option>
        </select>
      </div>

      <div class="form-row form-row--inline">
        <label class="label">
          Дата від:
          <input v-model="filterDateFrom" class="input" type="date" />
        </label>
        <label class="label">
          Дата до:
          <input v-model="filterDateTo" class="input" type="date" />
        </label>
      </div>

      <div class="form-row form-row--inline form-row--end">
        <button class="btn btn--ghost" @click="clearFilters">
          Очистити фільтри
        </button>
      </div>
    </section>

    <section class="card card--stats">
      <p>
        Усього: <strong>{{ totalCount }}</strong>
      </p>
      <p>
        Активних: <strong>{{ activeCount }}</strong>
      </p>
      <p>
        Виконаних: <strong>{{ completedCount }}</strong>
      </p>
    </section>

    <section class="card">
      <h2 class="card__title">Задачі</h2>

      <p v-if="paginatedTasks.length === 0" class="empty">
        Немає задач для відображення.
      </p>

      <ul v-else class="task-list">
        <li
          v-for="task in paginatedTasks"
          :key="task.id"
          class="task"
          :class="{ 'task--done': task.status === 'done' }"
        >
          <div v-if="editingId === task.id" class="task__content">
            <div class="task__main">
              <input
                v-model="editTitle"
                class="input input--sm"
                type="text"
                placeholder="Назва"
              />
              <textarea
                v-model="editDescription"
                class="input input--textarea input--sm"
                rows="2"
                placeholder="Опис"
              ></textarea>
            </div>

            <div class="task__meta">
              <select v-model="editPriority" class="input input--sm">
                <option value="low">Низький пріоритет</option>
                <option value="medium">Середній пріоритет</option>
                <option value="high">Високий пріоритет</option>
              </select>
              <span class="task__date">
                Створено: {{ formatDate(task.createdAt) }}
              </span>
            </div>
          </div>

          <div v-else class="task__content">
            <div class="task__main">
              <label class="task__checkbox">
                <input
                  type="checkbox"
                  :checked="task.status === 'done'"
                  @change="toggleStatus(task.id)"
                />
                <span class="task__title">{{ task.title }}</span>
              </label>
              <p v-if="task.description" class="task__description">
                {{ task.description }}
              </p>
            </div>

            <div class="task__meta">
              <span class="badge" :class="'badge--' + task.priority">
                {{ priorityLabel(task.priority) }}
              </span>
              <span class="task__date">
                {{ formatDate(task.createdAt) }}
              </span>
            </div>
          </div>

          <div class="task__actions">
            <button
              v-if="editingId === task.id"
              class="btn btn--small btn--primary"
              @click="saveEdit(task.id)"
            >
              Зберегти
            </button>
            <button
              v-if="editingId === task.id"
              class="btn btn--small btn--ghost"
              @click="cancelEdit"
            >
              Скасувати
            </button>

            <button
              v-else
              class="btn btn--small btn--ghost"
              @click="startEdit(task)"
            >
              Редагувати
            </button>
            <button
              class="btn btn--small btn--danger"
              @click="removeTask(task.id)"
            >
              Видалити
            </button>
          </div>
        </li>
      </ul>

      <div v-if="totalPages > 1" class="pagination">
        <button
          class="btn btn--small btn--ghost"
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          ‹ Назад
        </button>

        <span class="pagination__info">
          Сторінка {{ currentPage }} з {{ totalPages }}
        </span>

        <button
          class="btn btn--small btn--ghost"
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          Вперед ›
        </button>

        <select v-model.number="pageSize" class="input input--sm">
          <option :value="5">5 на сторінці</option>
          <option :value="10">10 на сторінці</option>
          <option :value="20">20 на сторінці</option>
        </select>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const tasks = ref([]);

const newTitle = ref("");
const newDescription = ref("");
const newPriority = ref("");
const addError = ref("");

const filterTitle = ref("");
const filterDescription = ref("");
const filterStatus = ref("");
const filterPriority = ref("");
const filterDateFrom = ref("");
const filterDateTo = ref("");

const currentPage = ref(1);
const pageSize = ref(5);

const editingId = ref(null);
const editTitle = ref("");
const editDescription = ref("");
const editPriority = ref("");

const stored = localStorage.getItem("tasks");
if (stored) {
  try {
    tasks.value = JSON.parse(stored);
  } catch (e) {
    tasks.value = [];
  }
}

function addTask() {
  addError.value = "";

  if (!newTitle.value.trim()) {
    addError.value = "Назва обовʼязкова";
    return;
  }
  if (!newPriority.value) {
    addError.value = "Оберіть пріоритет";
    return;
  }

  tasks.value.push({
    id: Date.now(),
    title: newTitle.value.trim(),
    description: newDescription.value.trim(),
    status: "active",
    createdAt: new Date().toISOString(),
    priority: newPriority.value,
  });

  newTitle.value = "";
  newDescription.value = "";
  newPriority.value = "";
}

function toggleStatus(id) {
  const task = tasks.value.find((t) => t.id === id);
  if (!task) return;
  task.status = task.status === "active" ? "done" : "active";
}

function removeTask(id) {
  tasks.value = tasks.value.filter((t) => t.id !== id);
}

function clearFilters() {
  filterTitle.value = "";
  filterDescription.value = "";
  filterStatus.value = "";
  filterPriority.value = "";
  filterDateFrom.value = "";
  filterDateTo.value = "";
  currentPage.value = 1;
}

function startEdit(task) {
  editingId.value = task.id;
  editTitle.value = task.title;
  editDescription.value = task.description;
  editPriority.value = task.priority;
}

function saveEdit(id) {
  if (!editTitle.value.trim()) return;

  const task = tasks.value.find((t) => t.id === id);
  if (!task) return;

  task.title = editTitle.value.trim();
  task.description = editDescription.value.trim();
  task.priority = editPriority.value;

  editingId.value = null;
}

function cancelEdit() {
  editingId.value = null;
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
}

const filteredTasks = computed(() => {
  const fromDate = filterDateFrom.value ? new Date(filterDateFrom.value) : null;
  const toDate = filterDateTo.value ? new Date(filterDateTo.value) : null;

  return tasks.value.filter((task) => {
    const titleOk =
      !filterTitle.value ||
      task.title.toLowerCase().includes(filterTitle.value.toLowerCase());

    const descriptionOk =
      !filterDescription.value ||
      (task.description || "")
        .toLowerCase()
        .includes(filterDescription.value.toLowerCase());

    const statusOk = !filterStatus.value || task.status === filterStatus.value;

    const priorityOk =
      !filterPriority.value || task.priority === filterPriority.value;

    const created = new Date(task.createdAt);

    const fromOk = !fromDate || created >= fromDate;
    const toOk = !toDate || created <= toDate;

    return titleOk && descriptionOk && statusOk && priorityOk && fromOk && toOk;
  });
});

const totalCount = computed(() => tasks.value.length);
const activeCount = computed(
  () => tasks.value.filter((t) => t.status === "active").length
);
const completedCount = computed(
  () => tasks.value.filter((t) => t.status === "done").length
);

const totalPages = computed(() =>
  filteredTasks.value.length === 0
    ? 1
    : Math.ceil(filteredTasks.value.length / pageSize.value)
);

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredTasks.value.slice(start, end);
});

watch(
  tasks,
  (newVal) => {
    localStorage.setItem("tasks", JSON.stringify(newVal));
  },
  { deep: true }
);

watch(
  [
    filterTitle,
    filterDescription,
    filterStatus,
    filterPriority,
    filterDateFrom,
    filterDateTo,
  ],
  () => {
    currentPage.value = 1;
  }
);

function formatDate(isoString) {
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function priorityLabel(p) {
  if (p === "low") return "Низький";
  if (p === "medium") return "Середній";
  if (p === "high") return "Високий";
  return p;
}
</script>

<style scoped>
.todo {
  max-width: 800px;
  margin: 24px auto;
  padding: 0 16px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.todo__title {
  text-align: center;
  margin-bottom: 4px;
}

.card {
  background: #ffffff;
  border-radius: 8px;
  padding: 12px 16px 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.card__title {
  margin: 0 0 8px;
  font-size: 16px;
}

.card--stats {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  font-size: 14px;
}

.form-row {
  margin-bottom: 8px;
}

.form-row--inline {
  display: flex;
  gap: 8px;
}

.form-row--end {
  justify-content: flex-end;
}

.label {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input {
  flex: 1;
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid #d0d7de;
  font-size: 14px;
}

.input--textarea {
  resize: vertical;
}

.input--sm {
  font-size: 12px;
  padding: 4px 6px;
}

.btn {
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
}

.btn--primary {
  background: #2563eb;
  color: #ffffff;
}

.btn--ghost {
  background: #f3f4f6;
  color: #111827;
}

.btn--danger {
  background: #ef4444;
  color: #ffffff;
}

.btn--small {
  font-size: 12px;
  padding: 4px 8px;
}

.error {
  color: #dc2626;
  font-size: 12px;
  margin: 4px 0 0;
}

.empty {
  font-size: 14px;
  color: #6b7280;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-bottom: 1px solid #e5e7eb;
  padding: 8px 0;
}

.task:last-child {
  border-bottom: none;
}

.task--done .task__title {
  text-decoration: line-through;
  color: #6b7280;
}

.task__content {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.task__main {
  flex: 2;
}

.task__meta {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  font-size: 12px;
}

.task__checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
}

.task__title {
  font-weight: 600;
}

.task__description {
  margin: 2px 0 0;
  font-size: 13px;
  color: #4b5563;
}

.task__date {
  color: #6b7280;
}

.task__actions {
  display: flex;
  gap: 6px;
  justify-content: flex-end;
}

.badge {
  padding: 2px 6px;
  border-radius: 9999px;
  font-size: 11px;
}

.badge--low {
  background: #dcfce7;
  color: #166534;
}

.badge--medium {
  background: #fef3c7;
  color: #92400e;
}

.badge--high {
  background: #fee2e2;
  color: #b91c1c;
}

.pagination {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
}

.pagination__info {
  font-size: 13px;
  color: #4b5563;
}

@media (max-width: 640px) {
  .task__content {
    flex-direction: column;
    align-items: flex-start;
  }

  .task__meta {
    align-items: flex-start;
  }

  .card--stats {
    flex-direction: column;
  }
}
</style>
