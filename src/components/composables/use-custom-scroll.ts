import { onMounted, onUnmounted } from "vue";

const DIRECTION = {
    UP: 'UP',
    DOWN: 'DOWN'
} as const

type Options = {
    /**
     * Callback called whenever scrolling by user happens 
     */
    onScroll?(direction: (keyof typeof DIRECTION)): (Promise<void> | void)

    /**
     * Callback called whenever during the scrolling there is change in direction (from up to down or down to up inlcuding first scroll event)
     */
    onScrollChange?(direction: (keyof typeof DIRECTION)): (Promise<void> | void)
}


export function useCustomScroll(options: Options) {
    const onScroll = options.onScroll;
    const onScrollChange = options.onScrollChange;

    let lastScrollTop = window.scrollY ?? document.documentElement.scrollTop;
    let lastDirection: keyof typeof DIRECTION | undefined = undefined;
    let isExecuting = false;

    function getDirection() {
        const scrollTop = window.scrollY ?? document.documentElement.scrollTop;

        let direction
        try {
            if (scrollTop > lastScrollTop) direction = DIRECTION.DOWN;
            else if (scrollTop < lastScrollTop) direction = DIRECTION.UP;
            console.log(direction,scrollTop, lastScrollTop)
            return {
                direction,
                lastDirection,
                scrollTop,
                lastScrollTop
            }
        } finally {
            lastDirection = direction;
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }
    }

    async function scrollListener() {
        const { direction, lastDirection } = getDirection()
        if (direction == null) return
        if (isExecuting) return;

        try {
            isExecuting = true;
            await Promise.all([onScroll?.(direction), lastDirection !== direction ? onScrollChange?.(direction) : undefined])
            await new Promise((resolve) => setTimeout(() => resolve(true), 15));
        } finally {
            isExecuting = false;
        }
    }


    onMounted(() => {
        window.addEventListener('scroll', scrollListener)
    });
    onUnmounted(() => {
        window.removeEventListener('scroll', scrollListener);
    });
}