import { mount, RouterLinkStub } from '@vue/test-utils';
import Navbar from '../../components/Navbar.vue';
import { describe, it, expect } from 'vitest';

describe('Navbar.vue', () => {

    const setup = () => {
        return mount(Navbar, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub
                }
            }
        });
    };

    // Test that the top level links are /register and /login
    it('renders all top-level links', () => {
        const wrapper = setup();
        const links = wrapper.findAllComponents(RouterLinkStub);
        const routes = links.map(link => link.props('to'));

        expect(routes).toEqual(['/register', '/login']);
    });

    // Dropdown menu is hidden by default
    it('dropdown is hidden by default', () => {
        const wrapper = setup();
        const menu = wrapper.find('ul.dropdown-menu');
        expect(menu.exists()).toBe(false);
    });

    // Toggle dropdown visibility when button is clicked
    it('toggles dropdown visibility when button is clicked', async () => {
        const wrapper = setup();
        const button = wrapper.find('button.dropdown-button');

        // Initially hidden
        expect(wrapper.find('ul.dropdown-menu').exists()).toBe(false);

        // Click to show
        await button.trigger('click');
        expect(wrapper.find('ul.dropdown-menu').exists()).toBe(true);

        // Click to hide again
        await button.trigger('click');
        expect(wrapper.find('ul.dropdown-menu').exists()).toBe(false);
    });

    // Dropdown menu contains correct links
    it('renders all dropdown menu links', async () => {
        const wrapper = setup();
        const button = wrapper.find('button.dropdown-button');

        // Show dropdown
        await button.trigger('click');

        const menuLinks = wrapper.findAll('ul.dropdown-menu li a');
        const hrefs = menuLinks.map(link => link.attributes('href'));

        expect(hrefs).toEqual([
            '#about',
            '#attend',
            '#schedule',
            '#faq',
            '#prizes',
            '#sponsors'
        ]);
    });

});