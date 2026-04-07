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

});