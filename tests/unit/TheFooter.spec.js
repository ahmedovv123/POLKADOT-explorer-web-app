import { shallowMount } from '@vue/test-utils'
import TheFooter from '@/components/TheFooter'

describe('TheFooter.vue', () => {
    let wrapper = shallowMount(TheFooter)

    it('renders full footer', () => {
        expect(wrapper.exists()).toBe(true);
    })

    it('finds text in text', () => {
        expect(wrapper.text()).toMatch('GitHub')
    })
})