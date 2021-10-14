import { shallowMount } from '@vue/test-utils'
import TheContainer from '@/components/TheContainer'

describe('TheContainer.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(TheContainer)
    })

    afterEach(() => {
        wrapper.vm.$destroy
    })

    it('initializes with correct elements', () => {
        expect(wrapper.findAll('div').length).toEqual(1)
    })
})