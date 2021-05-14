
import { ref, readonly, UnwrapRef } from 'vue';

export function useState<T>(initial: T) {
    const state = ref(initial);
    const setState = (value: T) => {
        state.value = value as UnwrapRef<T>;
    }
    return [readonly(state), setState] as const;
}