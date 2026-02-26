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
        // Create the store for this test
        store = createStore({
            state: { user: { email: 'admin@example.com' }, loggedIn: true },
            getters: { isLoggedIn: (state) => state.loggedIn },
            actions: { logout: vi.fn() },
        });

        // Create the spy on specific store instance
        logoutSpy = vi.spyOn(store, 'dispatch');

        mockRouter = { push: vi.fn() };

        wrapper = mount(NewNavBar, {
            global: {
                plugins: [store],
                mocks: { $router: mockRouter },
                stubs: { 'router-link': true },
            },
        });
    });

    // All 6 of the links exist when logged in
    it('renders top-level links when logged in', () => {
        //check for anchors and router-link stubs
        const anchors = wrapper.findAll('a');
        const routerLinks = wrapper.findAll('router-link-stub')

        //check that all links exist
        const totalLinks = anchors.length + routerLinks.length;
        expect(totalLinks).toBe(6);
    });

    // Dropdown should be hidden by default
    it('dropdown menu is hidden by default', () => {
        expect(wrapper.find('ul.user-menu').exists()).toBe(false);
    });

    // Toggle dropdown menu visibility
    it('toggles dropdown menu visibility when button is clicked', async () => {
        const button = wrapper.find('.user-dropdown .dropdown-button');
        await button.trigger('click');
        expect(wrapper.vm.menuDropdownVisible).toBe(true);
        await button.trigger('click');
        expect(wrapper.vm.menuDropdownVisible).toBe(false);
    });


    //Check that the profile and logout links are rendered in the menu
    it('renders dropdown menu links correctly', async () => {
        wrapper.vm.menuDropdownVisible = true;
        await wrapper.vm.$nextTick();

        const buttons = wrapper.findAll('button');
        // Check that drop down menu renders
        expect(buttons.length).toBe(2);
    });

    // Test logout and that it navigates to /login after the button is clicked
    it('calls logout and navigates to /login when logout button is clicked', async () => {
        // Ensure menu is open
        wrapper.vm.menuDropdownVisible = true;
        await wrapper.vm.$nextTick();

        // Spy directly on the store instance attached to the component
        // Note: Spy is being used as a stand in for real functions to prevent actual execution
        const dispatchSpy = vi.spyOn(wrapper.vm.$store, 'dispatch');

        // Find and click the button
        const logoutBtn = wrapper.find('ul.user-menu li button');
        await logoutBtn.trigger('click');

        // Check the spy and the router
        expect(dispatchSpy).toHaveBeenCalledWith('logout');
        expect(mockRouter.push).toHaveBeenCalledWith('/login');
    });
});