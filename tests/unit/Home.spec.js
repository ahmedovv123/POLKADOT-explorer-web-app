import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home'
import TheSearchBar from '@/components/TheSearchBar.vue'
import TheDetailsCard from '@/components/TheDetailsCard.vue'
import LastBlocksTable from '@/components/LastBlocksTable.vue'
import LastTransactionsTable from '@/components/LastTransactionsTable.vue'

describe('Home.vue', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(Home)
    })

    afterEach(() => {
        wrapper.vm.$destroy
    })

    it('initializes with correct elements', () => {
        expect(wrapper.findAll('div').length).toEqual(4)
    })

    it('Is components mounted', () => {
        expect(wrapper.findComponent(TheSearchBar).exists()).toBe(true);
        expect(wrapper.findComponent(TheDetailsCard).exists()).toBe(true);
        expect(wrapper.findComponent(LastBlocksTable).exists()).toBe(true);
        expect(wrapper.findComponent(LastTransactionsTable).exists()).toBe(true);
    })
})