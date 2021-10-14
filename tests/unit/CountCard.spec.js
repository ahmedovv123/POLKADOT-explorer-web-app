import { shallowMount } from '@vue/test-utils'
import CountCard from '@/components/CountCard'
import CountCardSpinner from '@/components/CountCardSpinner'

describe('CountCard.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(CountCard, {
            props: {
                title: '',
                count: 0,
                route: '',
                isLoading: false
            }
        })
    })

    afterEach(() => {
        wrapper.vm.$destroy
    })

    it('initializes with correct elements', () => {
        expect(wrapper.findAll('div').length).toEqual(3)
    })

    it('check elements with props data', async() => {
        await wrapper.setProps({
            title: 'Test',
            count: 10
        })

        expect(wrapper.findAll('div').length).toEqual(3)
        expect(wrapper.findAll('div').at(1).text()).toMatch('Test')
        expect(wrapper.findAll('div').at(2).text()).toMatch('10')
    })

    it('Is CountCardSpinner component mounted', () => {
        expect(wrapper.findComponent(CountCardSpinner).exists()).toBe(true);
    })
})