import { shallowMount } from '@vue/test-utils'
import AccountBalanceTable from '@/components/AccountBalanceTable'

describe('AccountBalanceTable.vue', () => {
  it('renders props.msg when passed', () => {
    const accountId = 'some account id'
    const wrapper = shallowMount(AccountBalanceTable, {
      props: { accountId }
    })
    expect(wrapper.text()).toMatch(accountId)
  })
})
