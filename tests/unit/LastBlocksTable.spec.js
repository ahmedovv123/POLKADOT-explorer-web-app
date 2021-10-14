import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import LastBlocksTable from '@/components/LastBlocksTable'

describe('LastBlocksTable.vue', () => {
    let wrapper
    let store
    let mockToggle = jest.fn()
    let mockFetchBlock = jest.fn()
    let mockGetBlock = jest.fn()
    let mockRoute
    let mockRouter
    
    beforeEach(() => {
        store = createStore({
            state() {
                return {
                    isLoading: false,
                    blocks: []
                }
            },
            getters: {
                getBlock: mockGetBlock
            },
            actions: {
                toggleOnLoading: mockToggle,
                fetchBlock: mockFetchBlock
            }
        })
        mockRoute = {
            params: {
                num: 1000
            }
        }
        mockRouter = {
            push: jest.fn()
        }
        wrapper = shallowMount(LastBlocksTable, {
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
        expect(wrapper.findAll('h2').at(0).text()).toMatch('Last Blocks')

        expect(wrapper.findAll('table').length).toEqual(1)
        expect(wrapper.findAll('th').length).toEqual(3)

        expect(wrapper.findAll('th').at(0).text()).toMatch('Number')
        expect(wrapper.findAll('th').at(1).text()).toMatch('Date')
        expect(wrapper.findAll('th').at(2).text()).toMatch('Transactions')
    })
})