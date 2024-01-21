<script setup lang="ts">
import { VNodeRef, computed, nextTick, ref } from "vue";
import { useCustomScroll } from "./composables/use-custom-scroll";

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
const props = defineProps<{
  transitionTimeMs?: number;

  items: Item[];
}>();

const itemsRef = ref(new Map<Item, VNodeRef | any>());

const currentItem = ref<Item | undefined>(undefined);
const currentItemIndex = ref<number>(0);

const transitionTimeMs = computed(() => props.transitionTimeMs ?? 200);
const labelsTranslateY = computed(
  () => `${-148 + -65.166 * currentItemIndex.value}px`
);

/**
 * TODO:
 * - observe currently watch element and save it
 * - onScroll should choose next or previous element to scrollBY to with reference of html element based on currently observed element
 * - upon normal scrolling it should decide what element it should scrollTo (which one is closed then this is the one which should be choosen)
 *
 * - labels should use transform as a base for showing centered element
 */

// FIXME:
function getItemToScrollTo(direction: "UP" | "DOWN") {
  const prevIndex = props.items.findIndex((x) => x === currentItem.value);
  const nextIndex = (currentItemIndex.value =
    (prevIndex + (direction === "UP" ? -1 : 1)) % props.items.length);

  const nextItem = (currentItem.value = props.items.at(nextIndex));
  const element = itemsRef.value.get(nextItem!);
  return element;
}

function scrollToElementSmoothly(options: any) {
  return new Promise((resolve) => {
    smoothScroll({
      ...options,
      complete: () => resolve(true),
    });
  });
}

useCustomScroll({
  async onScroll(direction) {
    console.log("🚀 ~ onScroll ~ direction:", direction);

    const element = getItemToScrollTo(direction);
    if (element == null) return;

    await scrollToElementSmoothly({
      toElement: element,
      duration: transitionTimeMs.value,
    });
    console.timeEnd("onScroll");
  },
});
</script>

<template>
  <div class="timeline">
    <div class="timeline__labels">
      <ul>
        <li
          :class="{ 'label--active': i === currentItemIndex }"
          v-for="(item, i) in items"
          :key="`label-${i}`"
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
  top: 50vh;
  /* left: 0;
  right: 0; */
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;

  transform: translateY(v-bind(labelsTranslateY));
}

div.timeline__labels > ul > li {
  margin: 24px 0;
}

.label--active {
  font-size: 320px;
}
</style>
