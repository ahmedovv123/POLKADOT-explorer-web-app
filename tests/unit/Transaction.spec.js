import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import Transaction from '@/views/Transaction'

describe('Transaction.vue', () => {
    let wrapper
    let store
    let mockToggle = jest.fn()
    let mockToggleOff = jest.fn()
    let mockRoute
    let mockRouter
    let mockTx = {
        id: '1',
        hash: '0x11',
        issigned: 'signed',
        amount: '10',
        method: 'method',
        nonce: '5',
        sender: 'sender',
        recipient: 'recipient',
        block_hash: '0x222'
    }
    
    beforeEach(() => {
        store = createStore({
            state() {
                return {
                    isLoading: false
                }
            },
            actions: {
                toggleOnLoading: mockToggle,
                toggleOffLoading: mockToggleOff
            }
        })
        mockRoute = {
            params: {
                id: 2
            }
        }
        mockRouter = {
            push: jest.fn()
        }
        wrapper = shallowMount(Transaction, {
            global: {
                plugins: [store],
                mocks: {
                    $route: mockRoute,
                    $router: mockRouter
                }
            }
        })
    })

    afterEach(() => {
        wrapper.vm.$destroy
    })

    it('initializes with correct elements without setting data', () => {
        expect(wrapper.findAll('h2').length).toEqual(1)
        expect(wrapper.findAll('h2').at(0).text()).toMatch('Transaction')
    })

    it('initializes with correct elements after setting data', async () => {
        await wrapper.setData({ tx: mockTx })

        expect(wrapper.findAll('h2').length).toEqual(1)
        expect(wrapper.findAll('h2').at(0).text()).toMatch('Transaction')

        expect(wrapper.findAll('h3').length).toEqual(18)

        expect(wrapper.findAll('h3').at(0).text()).toMatch('Id')
        expect(wrapper.findAll('h3').at(1).text()).toMatch('Hash')
        expect(wrapper.findAll('h3').at(2).text()).toMatch('Signed')
        expect(wrapper.findAll('h3').at(3).text()).toMatch('Amount')
        expect(wrapper.findAll('h3').at(4).text()).toMatch('Method')
        expect(wrapper.findAll('h3').at(5).text()).toMatch('Nonce')
        expect(wrapper.findAll('h3').at(6).text()).toMatch('Sender')
        expect(wrapper.findAll('h3').at(7).text()).toMatch('Recipient')
        expect(wrapper.findAll('h3').at(8).text()).toMatch('In block')
        expect(wrapper.findAll('h3').at(9).text()).toMatch('1')
        expect(wrapper.findAll('h3').at(10).text()).toMatch('0x11')
        expect(wrapper.findAll('h3').at(11).text()).toMatch('signed')
        expect(wrapper.findAll('h3').at(12).text()).toMatch('1e-9 DOT')
        expect(wrapper.findAll('h3').at(13).text()).toMatch('method')
        expect(wrapper.findAll('h3').at(14).text()).toMatch('5')
        expect(wrapper.findAll('h3').at(15).text()).toMatch('sender')
        expect(wrapper.findAll('h3').at(16).text()).toMatch('recipient')
        expect(wrapper.findAll('h3').at(17).text()).toMatch('0x222')
    })

    it('when sender or recipient button is clicked', async() => {
        await wrapper.setData({ tx: mockTx })
        
        const button = wrapper.find('.tx-link')
        await button.trigger('click')

        expect(mockToggle).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledTimes(1)
    })
})