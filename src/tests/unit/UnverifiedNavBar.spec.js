import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import NewNavBar from '@/components/NewNavBar.vue';
import { createStore } from 'vuex';

describe('NewNavBar.vue (unit test only)', () => {
    let store;
    let wrapper;
    let logoutSpy;
    let mockRouter;


    beforeEach(() => {
        window.dispatchEvent(new Event('resize'))
        // Create the store for this test
        store = createStore({
            state: {user: {email: 'admin@example.com'}, loggedIn: true},
            getters: {isLoggedIn: (state) => state.loggedIn},
            actions: {logout: vi.fn()},
        });

        // Create the spy on specific store instance
        logoutSpy = vi.spyOn(store, 'dispatch');

        mockRouter = {push: vi.fn()};

        wrapper = mount(NewNavBar, {
            global: {
                plugins: [store],
                mocks: {$router: mockRouter},
                stubs: {'router-link': true},
            },
        });
    });

//Makes sure the hamburger menu works on the newnavbar
    it('toggles mobile menu when hamburger is clicked', async () => {
        wrapper.vm.menuDropdownVisible = true;
        await wrapper.vm.$nextTick();

        const hamburger = wrapper.find('#hamburger')
        expect(hamburger.exists()).toBe(true)

        // Initially menu is hidden
        let mobileMenu = wrapper.find('.mobile-nav .nav-down')
        expect(mobileMenu.exists()).toBe(false)

        // Click hamburger
        await hamburger.trigger('click')
        await wrapper.vm.$nextTick();

        // Menu should now exist
        mobileMenu = wrapper.find('.mobile-nav .nav-down')
        expect(mobileMenu.exists()).toBe(true)

        // Click again to close
        await hamburger.trigger('click')
        await wrapper.vm.$nextTick();

        mobileMenu = wrapper.find('.mobile-nav .nav-down')
        expect(mobileMenu.exists()).toBe(false)
    });

//makes sure that the hamburger menu is loaded
    it('renders hamburger menu', () => {
        wrapper.vm.menuDropdownVisible = true;
        const hamburger = wrapper.find('#hamburger')
        expect(hamburger.exists()).toBe(true)
    });
});
