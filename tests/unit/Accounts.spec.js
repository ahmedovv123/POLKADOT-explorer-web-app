import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import Accounts from '@/views/Accounts'
import BaseButton from '@/components/BaseButton'

describe('Accounts.vue', () => {
    let wrapper
    let store
    let mockToggle = jest.fn()
    let mockToggleOff = jest.fn()
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
        wrapper = shallowMount(Accounts, {
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

    it('initializes with correct components before setting data', () => {
        expect(wrapper.findAll('h2').length).toEqual(1)
        expect(wrapper.findAll('h2').at(0).text()).toMatch('Accounts')

        expect(wrapper.findAll('table').length).toEqual(1)
        expect(wrapper.findAll('th').length).toEqual(4)

        expect(wrapper.findAll('th').at(0).text()).toMatch('Address')
        expect(wrapper.findAll('th').at(1).text()).toMatch('Transactions')
        expect(wrapper.findAll('th').at(2).text()).toMatch('Total Balance')
        expect(wrapper.findAll('th').at(3).text()).toMatch('Details')
    })

})