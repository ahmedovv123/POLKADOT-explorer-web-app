import { shallowMount } from '@vue/test-utils'
import TheNavBar from '@/components/TheNavBar'

describe('TheNavBar.vue', () => {
    let wrapper = shallowMount(TheNavBar)

    it('renders full navbar', () => {
        expect(wrapper.exists()).toBe(true);
    })

    it('finds text in navbar', () => {
        expect(wrapper.text()).toMatch('Polkadot Explorer Blocks Accounts Transactions')
    })
})