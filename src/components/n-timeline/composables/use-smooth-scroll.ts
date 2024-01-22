import { ref } from 'vue';
// FIXME:
declare global {
    function smoothScroll(options: any): void;
}

export function useSmoothScroll() {
    const isScrolling = ref(false);
    function scrollToElement(options: any) {
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
    return { isScrolling, scrollToElement }
}