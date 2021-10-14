import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import AccountTransactionsTable from '@/components/AccountTransactionsTable'
import BaseButton from '@/components/BaseButton'

describe('AccountTransactionsTable.vue', () => {
    let wrapper = null
    let store
    let mockToggle = jest.fn()
    let mockRoute
    let mockRouter

    beforeEach(() => {
        store = createStore({
            state() {
                return {
                    isLoading: false
                }
            },
            actions: {
                toggleOnLoading: mockToggle
            }
        })
        mockRoute = {
            params: {
                txhash: '0xaabc8bbbe2763e277df7883f0da6729ecffc6591a0a2f68adca041b9aa5de428'
            }
        }
        mockRouter = {
            push: jest.fn()
        }
        wrapper = shallowMount(AccountTransactionsTable, {
            global: {
                plugins: [store],
                mocks: {
                    $route: mockRoute,
                    $router: mockRouter
                }
            },
            props: {
                accountTxs: {
                    example: 'example'
                },
                accountId: '',
                txPage: ''
            }
        })
    })

    afterEach(() => {
        wrapper.vm.$destroy
    })

    it('initializes with correct elements', () => {
        expect(wrapper.findAll('table').length).toEqual(1)
        expect(wrapper.findAll('th').length).toEqual(5)

        expect(wrapper.findAll('th').at(0).text()).toMatch('ID')
        expect(wrapper.findAll('th').at(1).text()).toMatch('From')
        expect(wrapper.findAll('th').at(2).text()).toMatch('To')
        expect(wrapper.findAll('th').at(3).text()).toMatch('Amount')
        expect(wrapper.findAll('th').at(4).text()).toMatch('Details')
    })

    it('Is BaseButton component mounted', () => {
        expect(wrapper.findComponent(BaseButton).exists()).toBe(true);
    })

    it('Check Details button click call', async() => {
        const button = wrapper.findComponent(BaseButton)
        await button.trigger('click')

        expect(mockToggle).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledTimes(1)
    })
})