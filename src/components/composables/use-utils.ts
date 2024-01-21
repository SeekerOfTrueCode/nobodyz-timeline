export function useUtils() {
    function throttle(this: any, mainFunction: Function, delay: number) {
        let timerFlag: NodeJS.Timeout | null = null; // Variable to keep track of the timer

        // Returning a throttled version 
        return (...args: any[]) => {
            if (timerFlag === null) { // If there is no timer currently running
                mainFunction.apply(this, args);
                timerFlag = setTimeout(() => { // Set a timer to clear the timerFlag after the specified delay
                    timerFlag = null; // Clear the timerFlag to allow the main function to be executed again
                }, delay);
            }
        };
    }

    function debounce(this: any, mainFunction: Function, timeout: number) {
        let timerFlag: NodeJS.Timeout | null = null; // Variable to keep track of the timer

        return (...args: any[]) => {
            clearTimeout(timerFlag!);
            timerFlag = setTimeout(() => { mainFunction.apply(this, args); }, timeout);
        };
    }

    function debounceLeading(this: any, mainFunction: Function, timeout = 300) {
        let timerFlag: NodeJS.Timeout | null = null; // Variable to keep track of the timer

        return (...args: any[]) => {
            if (!timerFlag) {
                mainFunction.apply(this, args);
            }
            clearTimeout(timerFlag!);
            timerFlag = setTimeout(() => {
                timerFlag = null;
            }, timeout);
        };
    }

    return { throttle, debounce, debounceLeading }
}