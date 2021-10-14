import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import LastTransactionsTable from '@/components/LastTransactionsTable'

describe('LastTransactionsTable.vue', () => {
    let wrapper
    let store
    let mockToggle = jest.fn()
    let mockFetchTx = jest.fn()
    let mockClearTx = jest.fn()
    let mockRoute
    let mockRouter
    let mockComputedTxs = [{
        signer: {
            Id: 'TxSender'
        },
        method: {
            args: [{Id: 'TxRecipient'}, '1000']
        }
    }]
    
    beforeEach(() => {
        store = createStore({
            state() {
                return {
                    isLoading: false,
                    transactions: []
                }
            },
            actions: {
                toggleOnLoading: mockToggle,
                fetchTx: mockFetchTx,
                clearTx: mockClearTx
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
        wrapper = shallowMount(LastTransactionsTable, {
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

    it('initializes with correct elements', () => {
        expect(wrapper.findAll('h2').length).toEqual(1)
        expect(wrapper.findAll('h2').at(0).text()).toMatch('Last Transactions')

        expect(wrapper.findAll('table').length).toEqual(1)
        expect(wrapper.findAll('th').length).toEqual(3)

        expect(wrapper.findAll('th').at(0).text()).toMatch('From')
        expect(wrapper.findAll('th').at(1).text()).toMatch('To')
        expect(wrapper.findAll('th').at(2).text()).toMatch('Amount')
    })

    it('when computed txs set', () => {
        store = createStore({
            state() {
                return {
                    isLoading: false,
                    transactions: mockComputedTxs
                }
            },
            actions: {
                toggleOnLoading: mockToggle,
                fetchTx: mockFetchTx,
                clearTx: mockClearTx
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
        wrapper = shallowMount(LastTransactionsTable, {
            computed: {
                txs: {
                    get() {
                        return this.store.state.transactions
                    }
                }
            },
            global: {
                plugins: [store],
                mocks: {
                    $route: mockRoute,
                    $router: mockRouter
                }
            }
        })

        expect(wrapper.findAll('td').length).toEqual(3)
        expect(wrapper.findAll('td').at(0).text()).toMatch('TxSender')
        expect(wrapper.findAll('td').at(1).text()).toMatch('TxRecipient')
        expect(wrapper.findAll('td').at(2).text()).toMatch('1000')
    })

    it('when button is clicked', async() => {
        store = createStore({
            state() {
                return {
                    isLoading: false,
                    transactions: mockComputedTxs
                }
            },
            actions: {
                toggleOnLoading: mockToggle,
                fetchTx: mockFetchTx,
                clearTx: mockClearTx
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
        wrapper = shallowMount(LastTransactionsTable, {
            computed: {
                txs: {
                    get() {
                        return this.store.state.transactions
                    }
                }
            },
            global: {
                plugins: [store],
                mocks: {
                    $route: mockRoute,
                    $router: mockRouter
                }
            }
        })

        const button = wrapper.find('.tx-from')
        await button.trigger('click')

        expect(mockToggle).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledTimes(1)
    })
})