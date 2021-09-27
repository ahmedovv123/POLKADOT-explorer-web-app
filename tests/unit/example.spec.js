import { shallowMount } from '@vue/test-utils'

import TheSearchBar from '@/components/TheSearchBar.vue'

describe('TheSearchBar.vue', () => {
  it('test search', async() => {
    
    const wrapper = shallowMount(TheSearchBar, {
     
    })

    const text  = wrapper.get("#search")
    await text.setValue('65164687')
    expect(wrapper.find("#search").element.value).toMatch("65164687")
   
  })
})
