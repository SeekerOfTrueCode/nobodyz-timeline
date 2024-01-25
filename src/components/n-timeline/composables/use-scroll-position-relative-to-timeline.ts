import { Ref, onMounted, onUnmounted, ref, computed } from "vue";

export function useScrollPositionRelativeToTimeline(timelineRef: Ref<HTMLElement | null>) {
    const isOutsideTop = ref(false)
    const isOutsideBottom = ref(false)
    const isOutsideOfView = computed(() => isOutsideTop.value || isOutsideBottom.value)

    function timelineTopAndBottomAbsolute() {
        if (timelineRef.value == null) return { top: 0, bottom: 0 };
        const { top, bottom } = timelineRef.value?.getBoundingClientRect();
        const scrollTop = window.scrollY ?? document.documentElement.scrollTop;

        return {
            top: top + scrollTop,
            bottom: bottom + scrollTop
        };
    }

    function scrollListener() {
        if (timelineRef.value == null) return;
        const { top: timelineTop, bottom: timelineBottom } = timelineTopAndBottomAbsolute();

        const scrollTop = window.scrollY ?? document.documentElement.scrollTop;
        const scrollBottom = scrollTop + screen.height;

        isOutsideTop.value = timelineTop > scrollTop;
        isOutsideBottom.value = timelineBottom < scrollBottom;
    }

    onMounted(() => {
        window.addEventListener('scroll', scrollListener)
    });
    onUnmounted(() => {
        window.removeEventListener('scroll', scrollListener);
    });

    return { isOutsideOfView, isOutsideTop, isOutsideBottom }
}