import { shallowMount } from '@vue/test-utils'
import AccountBalanceTable from '@/components/AccountBalanceTable'

describe('AccountBalanceTable.vue', () => {
    let wrapper = null

    beforeEach(() => {
        wrapper = shallowMount(AccountBalanceTable, {
            props: {
                accountBalance: null,
                accountId: ''
            }
        })
    })

    afterEach(() => {
        wrapper.vm.$destroy
    })

    it('initializes with correct elements', () => {
        expect(wrapper.findAll('h2').length).toEqual(1)
        expect(wrapper.findAll('h2').at(0).text()).toMatch('')

        expect(wrapper.findAll('h3').length).toEqual(4)
        expect(wrapper.findAll('h3').at(0).text()).toMatch('Fee frozen:')
        expect(wrapper.findAll('h3').at(1).text()).toMatch('Free:')
        expect(wrapper.findAll('h3').at(2).text()).toMatch('Misc frozen:')
        expect(wrapper.findAll('h3').at(3).text()).toMatch('Reserved:')
    })

    it('check elements with props data', async() => {
        await wrapper.setProps({
            accountBalance: {
                data: {
                    feeFrozen: 0,
                    free: '933.7516 kDOT',
                    miscFrozen: 0,
                    reserved: 0
                }
            },
            accountId: '14AMy7J61P7BfyRMdCh1L9Wp31GLCcqrWaeidqLZTheeuNSp'
        })

        expect(wrapper.findAll('h2').length).toEqual(1)
        expect(wrapper.findAll('h2').at(0).text()).toMatch('14AMy7J61P7BfyRMdCh1L9Wp31GLCcqrWaeidqLZTheeuNSp')

        expect(wrapper.findAll('h3').length).toEqual(8)
        expect(wrapper.findAll('h3').at(0).text()).toMatch('Fee frozen:')
        expect(wrapper.findAll('h3').at(1).text()).toMatch('Free:')
        expect(wrapper.findAll('h3').at(2).text()).toMatch('Misc frozen:')
        expect(wrapper.findAll('h3').at(3).text()).toMatch('Reserved:')
        expect(wrapper.findAll('h3').at(4).text()).toMatch('0')
        expect(wrapper.findAll('h3').at(5).text()).toMatch('933.7516 kDOT')
        expect(wrapper.findAll('h3').at(6).text()).toMatch('0')
        expect(wrapper.findAll('h3').at(7).text()).toMatch('0')
    })
})