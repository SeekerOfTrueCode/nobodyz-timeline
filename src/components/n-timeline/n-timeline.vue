<script setup lang="ts">
import { VNodeRef, computed, withDefaults, ref, onMounted } from "vue";
import { getAnchor, keepInRange, round } from "./utils";
import type { Item } from "./types/item";

import { useScrollDirection } from "./composables/use-scroll-direction";
import { useScrollPositionRelativeToTimeline } from "./composables/use-scroll-position-relative-to-timeline";
import { useSmoothScroll } from "./composables/use-smooth-scroll";

defineSlots<{
  label(props: Item): any;
  item(props: Item): any;
}>();

const emit = defineEmits<{
  "scrolled-to": [Item];
}>();

const props = withDefaults(
  defineProps<{
    transitionTimeMs?: number;

    items: Item[];

    enableAnchors?: boolean;
    hideLabels?: boolean;
  }>(),
  {
    transitionTimeMs: 200,

    enableAnchors: true,
    hideLabels: false,
  }
);

const timelineRef = ref(null);
const itemsRef = ref(new Map<Item, VNodeRef | any>());

const currentItem = ref<Item | undefined>(undefined);
const currentItemIndex = ref<number>(0);

/**
 * TODO:
 * - observe currently watch element and save it
 * - upon normal scrolling it should decide what element it should scrollTo (which one is closed then this is the one which should be choosen)
 */

function getItemToScrollTo(direction: "UP" | "DOWN"): Item | undefined {
  const prevIndex = props.items.findIndex((x) => x === currentItem.value);
  const index = keepInRange(
    prevIndex + (direction === "UP" ? -1 : 1),
    0,
    props.items.length - 1
  );
  const item = props.items.at(index);

  return item;
}

const { isScrolling, scrollToElement } = useSmoothScroll();
const { isOutsideOfView, isOutsideBottom } = useScrollPositionRelativeToTimeline(timelineRef);

async function scrollToItem(item?: Item) {
  if (isScrolling.value) return;
  if (item == null) return;
  if (currentItem.value === item) return;
  const element = itemsRef.value.get(item!);

  currentItemIndex.value = props.items.findIndex((x) => x === item);
  currentItem.value = item;

  await scrollToElement({
    toElement: element,
    duration: props.transitionTimeMs,
  });
  emit("scrolled-to", item);
}

useScrollDirection({
  async onScroll(direction) {
    if (isOutsideOfView.value) return;

    const item = getItemToScrollTo(direction);
    await scrollToItem(item);
  },
});

async function scrollToAnchor() {
  if (!props.enableAnchors) return;
  const anchor = getAnchor();
  if (anchor == null) return;
  const element = document.getElementById(anchor!);
  if (element == null) return;

  const [item] =
    [...itemsRef.value.entries()].find(([, value]) => element === value) ?? [];

  await scrollToItem(item);
}

onMounted(scrollToAnchor);

defineExpose({
  scrollToItem,
});

const cssLabelsTranslateY = computed(
  () => `calc(50vh - 117px - ${68 * currentItemIndex.value}px)`
);
const cssLabelsTransitionTimeS = computed(
  () => `${round(props.transitionTimeMs / 1000, 1)}s`
);
function htmlAnchor(item: Item): string | undefined {
  if (!props.enableAnchors) return;
  return item.title.toLocaleLowerCase().replace(/\s+/g, "-");
}
</script>

<template>
  <div ref="timelineRef" class="timeline">
    <div v-if="!hideLabels" class="timeline__labels">
      <ul
        :class="{
          'labels-sticky': !isOutsideBottom,
          'labels-absolute': isOutsideBottom,
        }"
      >
        <li
          v-for="(item, i) in items"
          :key="`label-${i}`"
          :class="{ 'label--active': i === currentItemIndex }"
          @click="scrollToItem(item)"
        >
          <slot name="label" v-bind="item">{{ item.label }}</slot>
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
          :id="htmlAnchor(item)"
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
  overflow-y: clip;
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
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
div.timeline__labels > ul.labels-sticky {
  position: sticky;
  top: 0px;
  height: 0px;
  transform: translateY(v-bind(cssLabelsTranslateY));
  /* probably should introduce transition after 0.2ms or something */
  transition: transform v-bind(cssLabelsTransitionTimeS)
    cubic-bezier(0.475, -0.02, 0.01, 1.005);
}
div.timeline__labels > ul.labels-absolute {
  position: absolute;
  bottom: calc(50vh - 117px);
  width: 100%;
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
  cursor: default;
}
</style>
