import { onMounted, onUnmounted } from "vue";
import { useThrottle } from "./use-throttle";

const DIRECTION = {
    UP: 'UP',
    DOWN: 'DOWN'
} as const

type Options = {
    onScroll(direction: (keyof typeof DIRECTION)): void
}

export function useCustomScroll(options: Options) {
    const throttle = useThrottle()
    const onScrollThrottled = throttle(options.onScroll, 330)

    let lastScrollTop = window.scrollY || document.documentElement.scrollTop;

    function scrollListener() {
        const scrollTopPosition =
            window.scrollY || document.documentElement.scrollTop;

        if (scrollTopPosition > lastScrollTop) {
            onScrollThrottled(DIRECTION.DOWN)
        } else if (scrollTopPosition < lastScrollTop) {
            onScrollThrottled(DIRECTION.UP)
        }
        lastScrollTop = scrollTopPosition <= 0 ? 0 : scrollTopPosition;
    }

    onMounted(() => {
        window.addEventListener('scroll', scrollListener)
    });
    onUnmounted(() => {
        window.removeEventListener('scroll', scrollListener);
    });
}