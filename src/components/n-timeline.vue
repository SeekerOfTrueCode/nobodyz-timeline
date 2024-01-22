<script setup lang="ts">
import {
  VNodeRef,
  computed,
  withDefaults,
  ref,
  onMounted,
  // nextTick,
} from "vue";
import { useCustomScroll } from "./composables/use-custom-scroll";

function getAnchor() {
  return document.URL.split("#").length > 1 ? document.URL.split("#")[1] : null;
}

function round(value: number, precision: number) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

function keepInRange(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

// FIXME:
declare global {
  function smoothScroll(options: any): void;
}

type Item = {
  label: string;
  [key: string]: any;
};
defineSlots<{
  item(props: Item): any;
}>();
const emit = defineEmits<{
  "scrolled-to": [Item];
}>();
const props = withDefaults(
  defineProps<{
    transitionTimeMs?: number;

    items: Item[];
  }>(),
  {
    transitionTimeMs: 200,
  }
);

const itemsRef = ref(new Map<Item, VNodeRef | any>());

const currentItem = ref<Item | undefined>(undefined);
const currentItemIndex = ref<number>(0);

const transitionTimeMs = computed(() => props.transitionTimeMs);

const cssLabelsTranslateY = computed(
  () => `calc(50vh - 117px - ${66.2 * currentItemIndex.value}px)`
);
const cssLabelsTransitionTimeS = computed(
  () => `${round(props.transitionTimeMs / 1000, 1)}s`
);

/**
 * TODO:
 * - observe currently watch element and save it
 * - upon normal scrolling it should decide what element it should scrollTo (which one is closed then this is the one which should be choosen)
 */

// FIXME:
function getItemToScrollTo(direction: "UP" | "DOWN") {
  const prevIndex = props.items.findIndex((x) => x === currentItem.value);
  const nextIndex = keepInRange(
    prevIndex + (direction === "UP" ? -1 : 1),
    0,
    props.items.length - 1
  );
  currentItemIndex.value = nextIndex;

  const item = (currentItem.value = props.items.at(nextIndex));
  const element = itemsRef.value.get(item!);
  return [element, item];
}

function scrollToElementSmoothly(options: any) {
  isScrolling.value = true;
  return new Promise((resolve) => {
    smoothScroll({
      ...options,
      complete: () => {
        isScrolling.value = false;
        resolve(true);
      },
    });
  });
}

const isScrolling = ref(false);

useCustomScroll({
  async onScroll(direction) {
    if (isScrolling.value) return;

    const [element, item] = getItemToScrollTo(direction);
    if (element == null) return;

    await scrollToElementSmoothly({
      toElement: element,
      duration: transitionTimeMs.value,
    });
    emit("scrolled-to", item);
  },
});

onMounted(async () => {
  const anchor = getAnchor();
  if (anchor == null) return;
  const element = document.getElementById(anchor!);
  if (element == null) return;
  const [item] =
    [...itemsRef.value.entries()].find(([, value]) => element === value) ?? [];

  currentItemIndex.value = props.items.findIndex((x) => x === item);
  currentItem.value = item;

  await scrollToElementSmoothly({
    toElement: element,
    duration: transitionTimeMs.value,
  });
  emit("scrolled-to", item!);
});

async function onClickLabel(item: Item) {
  if (isScrolling.value) return;
  if (currentItem.value === item) return;

  const element = itemsRef.value.get(item!);
  currentItemIndex.value = props.items.findIndex((x) => x === item);

  await scrollToElementSmoothly({
    toElement: element,
    duration: transitionTimeMs.value,
  });
  emit("scrolled-to", item);
}

function prepareId(item: Item) {
  return item.title.toLocaleLowerCase().replace(/\s+/g, "-");
}
</script>

<template>
  <div class="timeline">
    <div class="timeline__labels">
      <ul>
        <li
          :class="{ 'label--active': i === currentItemIndex }"
          v-for="(item, i) in items"
          :key="`label-${i}`"
          @click="onClickLabel(item)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="timeline__items">
      <ul>
        <li
          v-for="(item, i) in items"
          :ref="(el) => itemsRef.set(item, el)"
          :key="`item-${i}`"
          :class="{ 'item--active': i === currentItemIndex }"
          :id="prepareId(item)"
        >
          <slot name="item" v-bind="item"></slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.timeline {
  display: flex;
  justify-content: center;

  gap: 4rem;
}

.timeline__labels {
  position: relative;
  z-index: 1;

  min-width: 200px;
}
.timeline__items {
  position: relative;
}

ul,
ul li {
  list-style: none;
  list-style-type: none;

  margin: 0;
  padding: 0;

  box-sizing: border-box;
}

div.timeline__items > ul {
  position: relative;
  transition: filter 0.5s;
}

div.timeline__items > ul > li {
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

div.timeline__items > ul > li > :deep(*) {
  width: 100%;
}

div.timeline__labels > ul {
  position: sticky;
  top: 0px;
  height: 0px;
  /* top: 50vh; */

  margin: 0 auto;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  text-align: center;

  transform: translateY(v-bind(cssLabelsTranslateY));
  transition: transform v-bind(cssLabelsTransitionTimeS)
    cubic-bezier(0.475, -0.02, 0.01, 1.005);
}

div.timeline__labels > ul > li {
  margin: 24px 0;
  /* line-height: 16px; */
  transition: margin v-bind(cssLabelsTransitionTimeS)
      cubic-bezier(0.475, -0.02, 0.01, 1.005),
    font-size v-bind(cssLabelsTransitionTimeS)
      cubic-bezier(0.475, -0.02, 0.01, 1.005),
    line-height v-bind(cssLabelsTransitionTimeS)
      cubic-bezier(0.475, -0.02, 0.01, 1.005);
}

div.timeline__labels > ul > li:not(.label--active) {
  cursor: pointer;
}

.label--active {
  font-size: 197px;
}
</style>
