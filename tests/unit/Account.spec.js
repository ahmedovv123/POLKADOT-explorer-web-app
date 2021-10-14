import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import Account from '@/views/Account'
import AccountBalanceTable from '@/components/AccountBalanceTable'
import AccountTransactionsTable from '@/components/AccountTransactionsTable'

describe('Account.vue', () => {
    let wrapper
    let store
    let mockToggle = jest.fn()
    let mockToggleOff = jest.fn()
    let mockRoute
    let mockRouter

    afterEach(() => {
        wrapper.vm.$destroy
    })

    it('initializes with correct components', () => {
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
        wrapper = shallowMount(Account, {
            global: {
                plugins: [store],
                mocks: {
                    $route: mockRoute,
                    $router: mockRouter
                }
            }
        })

        wrapper.setData({ accountId: '2' })
        wrapper.setData({ accountBalance: { example: 'example' } })
        wrapper.setData({ accountTxs: { example: 'example' } })

        expect(wrapper.findAll('div').length).toEqual(1)
        
        expect(wrapper.findComponent(AccountBalanceTable).exists()).toBe(true);
        expect(wrapper.findComponent(AccountTransactionsTable).exists()).toBe(true);
    })

})