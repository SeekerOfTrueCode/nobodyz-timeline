import { Ref, onMounted, onUnmounted, ref } from "vue";

export function useScrollPositionRelativeToTimeline(timelineRef: Ref<HTMLElement | null>) {
    const isOutsideOfView = ref(true)

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

        const outsideTop = timelineTop > scrollTop;
        const outsideBottom = timelineBottom < scrollBottom;

        isOutsideOfView.value = outsideTop || outsideBottom;
        // console.log(`[scrollTop ${scrollTop} | scrollBottom ${scrollBottom}]`)
        // console.log(`[timelineTop ${timelineTop} | timelineBottom ${timelineBottom}] isOutsideOfView ${isOutsideOfView.value}`)
    }

    onMounted(() => {
        window.addEventListener('scroll', scrollListener)
    });
    onUnmounted(() => {
        window.removeEventListener('scroll', scrollListener);
    });

    return { isOutsideOfView }
}