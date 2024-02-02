<script setup lang="ts">
import TemplateCard from "./TemplateCard.vue";
import {
  computed,
  defineEmits,
  defineProps,
  inject,
  reactive,
  ref
} from "vue";
import {Templates, Variant, Size} from "@/utils/types/global.types";
import {createNewProject} from "@/utils/services/projects.service";
import ButtonComponent from "@/components/ButtonComponent.vue";

const emit = defineEmits(["closeDialog", "projectCreated"]);
const props = defineProps<{
  show: Boolean
}>();

const actionText = computed<string>(() => step.value === 1 ? "Выбрать шаблон" :
  "Создать проект");
const templates = inject<Templates | null>("templates");
const isMobile = inject<Boolean>("isMobile");
const visibility = reactive([
  {
    title: 'Приватный',
    value: false,
    props: { subtitle:
        'Доступ могут иметь только доверенные пользователи, а также участники команды' },
  },
  {
    title: 'Открытый',
    value: true,
    props: { subtitle:
        'Все пользователи могут просматривать ваш проект' },
  },
]);
const loading = ref<Boolean>(false);
const newProject = reactive({
  userId: 1,
  name: "",
  public: false,
  defaultTemplate: null,
  userTemplate: null,
});
const selectedTemplate = computed(() => {
  return newProject.defaultTemplate || newProject.userTemplate;
});
const items = [
  'Выбор шаблона',
  'Настройка проекта',
];
const step = ref(1);

function stepAction() {
  if (step.value === 1) {
    step.value += 1;
  } else if (step.value === 2) {
    submitForm();
  }
}

async function submitForm() {
  loading.value = true;
  await createNewProject(newProject);
  emit("projectCreated");

  closeForm();
}

function closeForm() {
  loading.value = false;
  newProject.name = "";
  newProject.public = false;
  newProject.userTemplate = null;
  newProject.defaultTemplate = null;
  emit("closeDialog");
  step.value = 1;
}

function selectTemplate(template, type) {
  if (type === 'default') {
    if (newProject.defaultTemplate?.id === template.id) {
      newProject.defaultTemplate = null;
    } else {
      newProject.defaultTemplate = template;
      newProject.userTemplate = null;
    }
  } else {
    if (newProject.userTemplate?.id === template.id) {
      newProject.userTemplate = null;
    } else {
      newProject.userTemplate = template;
      newProject.defaultTemplate = null;
    }
  }
}
</script>

<template>
  <v-dialog
    v-model="props.show"
    width="1024"
    persistent
  >
    <v-card>
      <v-card-title>
        <div class="modal-title">
          <div v-show="step === 1"></div>
          <img v-show="step > 1" src="@/assets/images/arrow_left.svg"
               @click="step--">
          <span>Создание проекта</span>
          <img src="@/assets/images/exit.svg" @click="closeForm">
        </div>
      </v-card-title>
      <v-card-text>
        <v-stepper
          v-model="step"
          :items="items"
          :border="false"
          :mobile="isMobile"
          hide-actions
        >
          <template v-slot:item.1>
            <div class="templates">
              <template v-if="templates.defaultTemplates.length !== 0">
                <TemplateCard v-for="template in templates.defaultTemplates.value"
                              @click="() => selectTemplate(template, 'default')"
                              :title="template.name" :key="template.id"
                              :class="{template_active: newProject.defaultTemplate?.id
                            === template.id}"
                              type="Встроенный" />
              </template>
              <template v-if="templates.userTemplates.length !== 0">
                <TemplateCard v-for="template in templates.userTemplates.value"
                              @click="() => selectTemplate(template, 'user')"
                              :title="template.name || template.codeName"
                              :key="template.id"
                              :class="{template_active: newProject.userTemplate?.id
                            === template.id}"
                              type="Пользовательский" />
              </template>
            </div>
          </template>

          <template v-slot:item.2>
            <div class="modal-body">
              <div class="project-template">
                <TemplateCard :title="selectedTemplate?.name"
                              :key="selectedTemplate?.id"
                              :type="newProject.userTemplate ?
                              'Пользовательский' : 'Встроенный'" />
              </div>
              <div class="project-info">
                <h2>Информация о проекте</h2>
                <v-text-field
                  v-model="newProject.name"
                  label="Название проекта (необязательно)"></v-text-field>
                <v-select
                  label="Доступ"
                  v-model="newProject.public"
                  :items="visibility"
                ></v-select>
              </div>
            </div>
          </template>
        </v-stepper>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div class="modal-actions">
          <ButtonComponent
            v-show="step === 2"
            color="blue-darken-1"
            :variant="Variant.Outlined"
            :size="Size.Medium"
            :disabled="loading"
            @click="closeForm"
          >
            Отменить
          </ButtonComponent>
          <ButtonComponent
            color="blue-darken-1"
            :variant="Variant.Primary"
            :size="Size.Medium"
            :disabled="loading || (newProject.userTemplate === null &&
            newProject.defaultTemplate === null)"
            @click="stepAction"
          >
            {{actionText}}
          </ButtonComponent>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
